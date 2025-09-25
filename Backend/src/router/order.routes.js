const express = require('express');
const authController = require('../controller/auth.controller');
const orderController = require('../controller/order.controller');
const checkCartNotFound = require('../middleware/checkCartNotFound');

const orderRouter = express.Router();

// Routes تتطلب تسجيل دخول
orderRouter.use(authController.auth);

// Route الدفع (Cash on Delivery)
orderRouter.post("/pay", checkCartNotFound, orderController.payWithCash);

module.exports = orderRouter;
