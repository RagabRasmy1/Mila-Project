const handlerAsync = require("../middleware/handlerAsync");
const couponModel = require("../model/coupon.model");
const productModel = require("../model/product.model");

// Create Coupon
exports.addCoupon = handlerAsync(async (req, res, next) => {
    const coupon = await couponModel.create({
        code: req.body.code,
        value: req.body.value,
        expireIn: req.body.expireIn,
        createdBy: req.user._id,
    });

    res.status(201).json({
        message: "Coupon Created",
        coupon,
    });
});

// Get All Coupons
exports.getAllCoupon = handlerAsync(async (req, res, next) => {
    const coupons = await couponModel
        .find()
        .populate("createdBy", "userName email _id")
        .populate("products", "name");

    res.json({
        data: {
            length: coupons.length,
            coupons,
        },
    });
});

// Update Coupon
exports.updateCoupon = handlerAsync(async (req, res, next) => {
    const coupon = await couponModel.findByIdAndUpdate(
        req.params.id,
        {
            code: req.body.code,
            value: req.body.value,
            expireIn: req.body.expireIn,
            updatedBy: req.user._id,
        },
        {
            runValidators: true,
            new: true,
        }
    );

    if (!coupon) return next(new Error("Coupon not found"));

    res.status(202).json({
        message: "Coupon updated",
        coupon,
    });
});

// Delete Coupon
exports.deleteCoupon = handlerAsync(async (req, res, next) => {
    const deleted = await couponModel.findByIdAndDelete(req.params.id);
    if (!deleted) return next(new Error("Coupon not found"));
    res.status(204).json({});
});

// Apply Coupon to Product
exports.applyCouponToProduct = handlerAsync(async (req, res, next) => {
    const { productId, couponCode } = req.body;

    const product = await productModel.findById(productId);
    if (!product) return next(new Error("Product not found"));

    const coupon = await couponModel.findOne({ code: couponCode });
    if (!coupon) return next(new Error("Coupon not found"));

    const isExpired = new Date(coupon.expireIn) < new Date();
    if (isExpired) return next(new Error("Coupon is expired"));

    const alreadyApplied = coupon.products.includes(productId);
    if (alreadyApplied) {
        return next(new Error("Coupon already applied to this product"));
    }

    // Update coupon with new product
    await couponModel.findByIdAndUpdate(
        coupon._id,
        { $push: { products: productId } },
        { new: true }
    );

    // Update product final price
    const finalPrice = Math.max(product.priceBeforeDiscount - coupon.value, 0); // لا تقل عن 0
    await productModel.findByIdAndUpdate(
        productId,
        { finalPrice },
        { new: true, runValidators: true }
    );

    res.json({
        message: `Coupon '${coupon.code}' applied to product '${product.name}'`,
        finalPrice,
    });
});