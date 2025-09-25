const handlerAsync = require("../middleware/handlerAsync");
const cartModel = require("../model/cart.model");
const productModel = require("../model/product.model");
const couponModel = require("../model/coupon.model");

// Get My Cart
exports.getMyCart = handlerAsync(async (req, res, next) => {
  const myCart = await cartModel.findOne({ userId: req.user._id }).populate("products.product");
  if (!myCart) return next(new Error("You don't have a cart yet"));
  res.json({ myCart });
});

// Add or Create Cart
exports.addCart = handlerAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;
  const product = await productModel.findById(productId);
  if (!product) return next(new Error("Product not found"));
  if (quantity > product.stock) return next(new Error("Quantity exceeds available stock"));

  let cart = await cartModel.findOne({ userId: req.user._id });

  const price = (product.finalPrice || product.priceBeforeDiscount) * quantity;

  if (!cart) {
    // Create new cart
    cart = await cartModel.create({
      userId: req.user._id,
      products: [{ product: productId, quantity }],
      totalPrice: price,
    });
  } else {
    // Update existing cart
    const existingProduct = cart.products.find(p => p.product.toString() === productId);
    if (existingProduct) {
      const newQuantity = existingProduct.quantity + quantity;
      if (newQuantity > product.stock) return next(new Error("Quantity exceeds stock"));
      existingProduct.quantity = newQuantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    cart.totalPrice += price;
    await cart.save();
  }

  res.json({
    message: "Cart updated successfully",
    cart,
  });
});

// Update Product Quantity in Cart
exports.updateCart = handlerAsync(async (req, res, next) => {
  const { productId, quantity = 1 } = req.body;

  const product = await productModel.findById(productId);
  if (!product) return next(new Error("Product not found"));

  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) return next(new Error("Cart not found"));

  const existingProduct = cart.products.find(p => p.product.toString() === productId);
  if (!existingProduct) return next(new Error("Product not in cart"));

  if (quantity > product.stock) return next(new Error("Quantity exceeds stock"));

  const oldPrice = (product.finalPrice || product.priceBeforeDiscount) * existingProduct.quantity;
  const newPrice = (product.finalPrice || product.priceBeforeDiscount) * quantity;

  existingProduct.quantity = quantity;
  cart.totalPrice = cart.totalPrice - oldPrice + newPrice;

  await cart.save();

  res.json({
    message: "Cart updated successfully",
    cart,
  });
});

// Delete Product from Cart
exports.deleteProductFromCart = handlerAsync(async (req, res, next) => {
  const { productId } = req.body;

  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) return next(new Error("Cart not found"));

  const product = await productModel.findById(productId);
  if (!product) return next(new Error("Product not found"));

  const productInCart = cart.products.find(p => p.product.toString() === productId);
  if (!productInCart) return next(new Error("Product not in cart"));

  const productTotal = (product.finalPrice || product.priceBeforeDiscount) * productInCart.quantity;

  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  cart.totalPrice -= productTotal;

  await cart.save();

  res.status(204).json({});
});

// Apply Coupon to Cart
exports.applyCouponToCart = handlerAsync(async (req, res, next) => {
  const { couponCode } = req.body;

  const coupon = await couponModel.findOne({ code: couponCode });
  if (!coupon) return next(new Error("Coupon not found"));
  if (coupon.expireIn < Date.now()) return next(new Error("Coupon expired"));

  const cart = await cartModel.findOne({ userId: req.user._id });
  if (!cart) return next(new Error("Cart not found"));

  if (cart.totalAfterDiscount) return next(new Error("Coupon already applied"));

  cart.totalAfterDiscount = cart.totalPrice - coupon.value;
  await cart.save();

  coupon.carts.push(cart._id);
  await coupon.save();

  res.status(202).json({
    message: `Coupon "${coupon.code}" applied successfully.`,
    totalAfterDiscount: cart.totalAfterDiscount,
  });
});