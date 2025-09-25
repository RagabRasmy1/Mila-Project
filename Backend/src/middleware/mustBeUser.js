const userModel = require("../model/user.model");
const handlerAsync = require("./handlerAsync");

module.exports = handlerAsync(async (req, res, next) => {
    const userId = req.body.userId;

    if (!userId) {
        return next(new Error("User ID is required"));
    }

    const user = await userModel.findById(userId);
    
    if (!user) {
        return next(new Error("User not found"));
    }

    if (user.role === 'admin') {
        return next(new Error("Can't deactivate an admin user"));
    }

    next();
});