const mongoose = require("mongoose");

const couponSchema = mongoose.Schema({
  code: {
    type: String,
    set: v => v.toUpperCase(),
    minlength: 5,
    required: [true, 'Coupon Must have Code'],
    unique: true
  },
  value: {
    type: Number,
    min: 1,
    required: [true, 'Coupon Must have a value']
  },
  expireIn: {
    type: Date,
    required: [true, 'Coupon must have ExpireIn'],
    validate: {
      validator: function (val) {
        return val > Date.now();
      },
      message: "Expire date must be in the future"
    }
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  updatedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  deletedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'product'
    }
  ],
  carts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'cart'
    }
  ]
}, {
  timestamps: true
});

const couponModel = mongoose.model('coupon', couponSchema);

module.exports = couponModel;