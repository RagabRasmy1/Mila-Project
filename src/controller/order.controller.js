require("dotenv").config();
const axios = require("axios");
const handlerAsync = require("../middleware/handlerAsync");
const orderModel = require("../model/order.model");
const cartModel = require("../model/cart.model");

const BASE_URL = "https://accept.paymob.com/api";

// Helper: حذف السلة
const removeAuthCart = async (cartId) => {
  await cartModel.findByIdAndDelete(cartId);
};

// Main Checkout Logic with Paymob
exports.payWithPaymob = handlerAsync(async (req, res, next) => {
  const user = req.user;
  const cart = req.myCart;

  // ✅ تعريف المبلغ قبل استخدامه
  const amount = cart.totalAfterDiscount || cart.totalPrice;
  if (!amount || amount < 1) {
    return next(new Error("Invalid cart amount."));
  }

  const paymentType = req.body.paymentType || "card"; // card OR wallet

  // 1. Get Auth Token
  const { data: authData } = await axios.post(`${BASE_URL}/auth/tokens`, {
    api_key: process.env.PAYMOB_API_KEY,
  });
  const token = authData.token;

  // 2. Create Order
  const { data: orderData } = await axios.post(`${BASE_URL}/ecommerce/orders`, {
    auth_token: token,
    delivery_needed: false,
    amount_cents: amount * 100,
    currency: "EGP",
    items: [],
  });

  // 3. Generate Payment Key
  const [firstName = "User", lastName = "Last"] = (user.name || "").split(" ");
  const { data: paymentKeyData } = await axios.post(
    `${BASE_URL}/acceptance/payment_keys`,
    {
      auth_token: token,
      amount_cents: amount * 100,
      expiration: 3600,
      order_id: orderData.id,
      billing_data: {
        first_name: firstName,
        last_name: lastName,
        email: user.email || "email@example.com",
        phone_number: user.phone || "01000000000",
        apartment: "NA",
        floor: "NA",
        street: "NA",
        building: "NA",
        city: "Cairo",
        country: "EG",
        state: "Cairo",
      },
      currency: "EGP",
      integration_id:
        paymentType === "wallet"
          ? process.env.PAYMOB_WALLET_INTEGRATION_ID
          : process.env.PAYMOB_CARD_INTEGRATION_ID,
    }
  );

  const paymentToken = paymentKeyData.token;

  // 4. Prepare final URL
  const iframeUrl = `https://accept.paymob.com/api/acceptance/iframes/${process.env.PAYMOB_IFRAME_ID}?payment_token=${paymentToken}`;

  // 5. Save order with status "pending"
  const order = await orderModel.create({
    userId: user._id,
    products: cart.products,
    OrderPrice: amount,
    paymentMethod: paymentType,
    paymentStatus: "pending",
    paymobOrderId: orderData.id,
  });

  // 6. Remove Cart
  await removeAuthCart(cart._id);

  // 7. Send Payment URL
  res.status(201).json({
    message: "Redirect to payment",
    order,
    url: iframeUrl,
  });
});
