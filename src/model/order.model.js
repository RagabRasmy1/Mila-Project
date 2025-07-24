const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: [true, "Required User"]
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
  token: {
    type: String
  },
  paymentMethod: {
    type: String,
    enum: ['card', 'wallet', 'cash'],
    default: 'card'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  paymobOrderId: {
  type: String,
  required: false, 
},
}, {
  timestamps: true
});

const orderModel = mongoose.model('order', orderSchema);
module.exports = orderModel;