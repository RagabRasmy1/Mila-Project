const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, "Required User"]
  },
  customerName: {
    type: String,
    required: [true, "Customer name is required"]
  },
  shippingAddress: {
    type: String,
    required: [true, "Shipping address is required"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"]
  },
  products: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1
    }
  }],
  OrderPrice: {
    type: Number,
    min: 0
  },
  currency: {
    type: String,
    default: 'EGP'
  },
  token: String,
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'cash'],
    default: 'cash'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymobOrderId: String,
}, {
  timestamps: true
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;
