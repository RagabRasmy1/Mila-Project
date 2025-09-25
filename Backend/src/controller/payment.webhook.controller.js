// const crypto = require("crypto");
// const orderModel = require("../model/order.model");

// exports.paymobWebhook = async (req, res) => {
//   try {
//     const secret = process.env.PAYMOB_HMAC;
//     const hmacHeader = req.headers.hmac;

//     const rawBody = JSON.stringify(req.body);

//     const generatedHmac = crypto
//       .createHmac("sha512", secret)
//       .update(rawBody)
//       .digest("hex");

//     if (generatedHmac !== hmacHeader) {
//       return res.status(401).json({ message: "Invalid HMAC" });
//     }

//     const event = req.body;

//     if (event.type === "TRANSACTION" && event.obj && event.obj.success) {
//       const orderId = event.obj.order.merchant_order_id; // لو بتستخدمه
//       const paymobOrderId = event.obj.order.id;

//       // ابحث عن الطلب بناءً على orderId اللي انت حفظته وقت الإنشاء
//       const order = await orderModel.findOneAndUpdate(
//         { paymobOrderId }, // لازم تكون خزنته أثناء الدفع
//         { paymentStatus: "paid" },
//         { new: true }
//       );

//       return res.status(200).json({ message: "Payment verified", order });
//     }

//     return res.status(200).json({ message: "Event received but not processed" });
//   } catch (err) {
//     return res.status(500).json({ message: "Webhook error", error: err.message });
//   }
// };