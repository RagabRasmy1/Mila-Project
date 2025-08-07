const crypto = require("crypto");
const orderModel = require("../model/order.model");

const generateHmac = (data, hmacSecret) => {
  const {
    amount_cents,
    created_at,
    currency,
    error_occured,
    has_parent_transaction,
    id,
    integration_id,
    is_3d_secure,
    is_auth,
    is_capture,
    is_refunded,
    is_standalone_payment,
    is_voided,
    order,
    owner,
    pending,
    source_data: {
      pan: source_data_pan,
      sub_type: source_data_sub_type,
      type: source_data_type,
    },
    success,
  } = data.obj;

  const stringToHash = `${amount_cents}${created_at}${currency}${error_occured}${has_parent_transaction}${id}${integration_id}${is_3d_secure}${is_auth}${is_capture}${is_refunded}${is_standalone_payment}${is_voided}${order.id}${owner}${pending}${source_data_pan}${source_data_sub_type}${source_data_type}${success}`;

  return crypto
    .createHmac("sha512", hmacSecret)
    .update(stringToHash)
    .digest("hex");
};

exports.paymobWebhook = async (req, res) => {
  try {
    const data = req.body;

    const receivedHmac = data.hmac;
    const expectedHmac = generateHmac(data, process.env.PAYMOB_HMAC_SECRET);

    if (receivedHmac !== expectedHmac) {
      return res.status(403).json({ message: "HMAC mismatch – not trusted!" });
    }

    // ✅ استخراج البيانات من Webhook
    const paymobOrderId = data.obj.order.id;
    const transactionId = data.obj.id;
    const success = data.obj.success;

    // ✅ تحديث الأوردر
    const order = await orderModel.findOneAndUpdate(
      { paymobOrderId },
      {
        paymentStatus: success ? "paid" : "failed",
        transactionId,
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({ message: "Payment status updated", order });
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).json({ message: "Webhook server error" });
  }
};
