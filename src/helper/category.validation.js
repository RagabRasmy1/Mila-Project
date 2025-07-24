const Joi = require('joi');
const handlerAsync = require("../middleware/handlerAsync");

/*******Add Category*******/
const addCategory = Joi.object({
    image: Joi.string().required(),
    name: Joi.string().required()
});

exports.addCategory = handlerAsync(async (req, res, next) => {
    const { error } = addCategory.validate(req.body);
    if (error) return next(new Error(error.details[0].message));
    next();
});

/*******Update Category*******/
const updateCategory = Joi.object({
    image: Joi.string(),
    name: Joi.string()
});

exports.updateCategory = handlerAsync(async (req, res, next) => {
    const { error } = updateCategory.validate(req.body);
    if (error) return next(new Error(error.details[0].message));
    next();
});
