'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, CreditCard, Smartphone, Banknote, Lock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCart } from '@/contexts/CartContext';

export default function CheckoutPage() {
  const { state } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle checkout submission
    console.log('Checkout submitted:', formData);
  };

  const subtotal = state.total;
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + tax + shipping;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Button asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/cart" className="flex items-center text-gray-600 hover:text-rose-600 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <Input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <Input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                  <Input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <CreditCard className="h-5 w-5 ml-3 mr-3 text-gray-600" />
                  <span className="font-medium">Credit or Debit Card</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <Smartphone className="h-5 w-5 ml-3 mr-3 text-gray-600" />
                  <span className="font-medium">PayPal</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="apple"
                    checked={paymentMethod === 'apple'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-rose-600 focus:ring-rose-500"
                  />
                  <Banknote className="h-5 w-5 ml-3 mr-3 text-gray-600" />
                  <span className="font-medium">Apple Pay</span>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <Input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <Input
                    type="text"
                    name="nameOnCard"
                    placeholder="Name on card"
                    value={formData.nameOnCard}
                    onChange={handleInputChange}
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {state.items.map((item) => {
                  const discountedPrice = item.discount 
                    ? item.price * (1 - item.discount / 100)
                    : item.price;

                  return (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          ${(discountedPrice * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-rose-600">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Place Order */}
            <div className="bg-white rounded-2xl p-6 shadow-md">
              <Button size="lg" className="w-full mb-4" onClick={handleSubmit}>
                <Lock className="h-4 w-4 mr-2" />
                Complete Order
              </Button>
              
              <div className="text-center text-sm text-gray-600">
                <p className="mb-2">🔒 Your payment information is secure and encrypted</p>
                <p>By placing your order, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}