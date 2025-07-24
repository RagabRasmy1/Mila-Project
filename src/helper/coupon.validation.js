const Joi = require('joi')
const handlerAsync = require("../middleware/handlerAsync")

/******Add Coupon Validated******/
const addCoupon = Joi.object({
    code: Joi.string().required(),
    value: Joi.number().min(1).required(),
    expireIn: Joi.date().greater('now').required()
});

exports.addCouponValidate = handlerAsync(async (req, res, next) => {
    const { error } = addCoupon.validate(req.body);
    if (error) return next(new Error(error.details[0].message));
    next();
});

/******Update Coupon Validated******/
const UpdateCoupon = Joi.object({
    code: Joi.string(),
    value: Joi.number().min(1),
    expireIn: Joi.date().greater('now')
});

exports.UpdateCouponValidate = handlerAsync(async (req, res, next) => {
    const { error } = UpdateCoupon.validate(req.body);
    if (error) return next(new Error(error.details[0].message));
    next();
});