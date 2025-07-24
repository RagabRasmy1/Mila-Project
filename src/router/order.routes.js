const express = require('express');
const authController = require('../controller/auth.controller');
const orderController = require('../controller/order.controller');
const checkCartNotFound = require('../middleware/checkCartNotFound');
const paymentController = require('../controller/payment.webhook.controller');

const orderRouter = express.Router();

// ✅ Webhook Route (بدون حماية لأن Paymob هو اللي بيطلبه)
orderRouter.post("/webhook/paymob", express.json({ type: '*/*' }), paymentController.paymobWebhook);

// ✅ Routes تتطلب تسجيل دخول
orderRouter.use(authController.auth);

// ✅ Route الدفع
orderRouter.post("/pay", checkCartNotFound, orderController.payWithPaymob);

module.exports = orderRouter;