const cartModel = require("../model/cart.model");
const handlerAsync = require("./handlerAsync");

module.exports = handlerAsync(async (req, res, next) => {
    if (!req.user || !req.user._id) {
        return next(new Error("User not authenticated"));
    }

    const cartFound = await cartModel.findOne({ userId: req.user._id });

    if (!cartFound || !Array.isArray(cartFound.products) || cartFound.products.length === 0) {
        return next(new Error("You don't have any products in your cart"));
    }

    req.myCart = cartFound;
    next();
});