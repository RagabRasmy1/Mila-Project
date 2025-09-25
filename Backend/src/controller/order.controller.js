require("dotenv").config();
const handlerAsync = require("../middleware/handlerAsync");
const orderModel = require("../model/order.model");
const cartModel = require("../model/cart.model");

// حذف السلة
const removeAuthCart = async (cartId) => {
  await cartModel.findByIdAndDelete(cartId);
};

exports.payWithCash = handlerAsync(async (req, res, next) => {
  const cart = req.myCart;
  const user = req.user;

  const { customerName, shippingAddress, phone } = req.body;

  if (!customerName || !shippingAddress || !phone) {
    return next(new Error("Customer name, shipping address and phone are required"));
  }

  const amount = cart.totalAfterDiscount || cart.totalPrice;
  if (!amount || amount < 1) {
    return next(new Error("Invalid cart amount."));
  }

  const order = await orderModel.create({
    userId: user._id,
    customerName,
    shippingAddress,
    phone,
    products: cart.products,
    OrderPrice: amount,
    paymentMethod: "cash",
    paymentStatus: "pending",
  });

  await removeAuthCart(cart._id);

  res.status(201).json({
    message: "Order placed successfully. You will pay upon delivery.",
    order,
  });
});