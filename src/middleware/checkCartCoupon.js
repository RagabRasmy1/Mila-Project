const handlerAsync = require("./handlerAsync");
const couponModel = require("../model/coupon.model");
const cartModel = require('../model/cart.model');

module.exports = handlerAsync(async (req, res, next) => {
    const { couponCode } = req.body;

    //  التحقق من وجود الكوبون
    const coupon = await couponModel.findOne({ code: couponCode });
    if (!coupon) {
        return next(new Error("Invalid coupon code"));
    }

    // التحقق من إذا الكوبون مخصص لمنتجات فقط
    if (coupon.products.length > 0) {
        return next(new Error("This coupon is only applicable to specific products"));
    }

    //  التحقق من صلاحية الكوبون
    if (coupon.expireIn < Date.now()) {
        return next(new Error("This coupon has expired"));
    }

    //  التحقق من الكارت الخاصة بالمستخدم
    const myCart = await cartModel.findOne({ userId: req.user._id });
    if (!myCart) {
        return next(new Error("You don't have a cart"));
    }

    // التأكد من أن الكوبون لم يُستخدم مسبقًا على نفس الكارت
    const alreadyUsed = coupon.carts.includes(myCart._id);
    if (alreadyUsed) {
        return next(new Error("This coupon has already been used on your cart"));
    }

    // تمرير البيانات
    req.coupon = coupon;
    req.myCart = myCart;

    next();
});