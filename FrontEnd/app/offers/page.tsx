'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Gift, Sparkles, Percent } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/Button';
import { products } from '@/lib/data';

export default function OffersPage() {
  const discountedProducts = products.filter(product => product.discount);
  const bundleProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <section className="bg-rose-gradient py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-rose-600 mr-2" />
            <span className="text-rose-800 font-medium">Limited Time Offers</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Special Deals &
            <span className="text-rose-600 block">Beauty Bundles</span>
          </h1>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Don't miss out on our exclusive offers! Save big on your favorite beauty products with limited-time deals and special bundles.
          </p>

          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Ends in 3 days
            </div>
            <div className="flex items-center">
              <Gift className="h-4 w-4 mr-1" />
              Free gifts included
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Flash Sale */}
        <section className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold mb-2">⚡ Flash Sale</h2>
                  <p className="opacity-90">Up to 30% off selected items</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Ends in</div>
                  <div className="text-xl font-bold">2h 45m</div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {discountedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bundle Deals */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-rose-100 rounded-full px-4 py-2 mb-4">
              <Gift className="h-4 w-4 text-rose-600 mr-2" />
              <span className="text-rose-800 font-medium">Bundle Deals</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beauty Bundle Sets</h2>
            <p className="text-gray-600">Save more when you buy together</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Complete Skincare Set */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Complete Skincare Set</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save 25%
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {bundleProducts.filter(p => p.category === 'Skincare').map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 line-through">$125.00</div>
                    <div className="text-2xl font-bold text-rose-600">$94.00</div>
                  </div>
                  <Button>Add Bundle to Cart</Button>
                </div>
              </div>
            </div>

            {/* Makeup Essentials */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Makeup Essentials</h3>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Save 20%
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {bundleProducts.filter(p => p.category === 'Makeup').map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-600">${product.price.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500 line-through">$148.00</div>
                    <div className="text-2xl font-bold text-rose-600">$118.00</div>
                  </div>
                  <Button>Add Bundle to Cart</Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Promo Codes */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-8">
            <div className="text-center mb-8">
              <Percent className="h-12 w-12 text-rose-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Exclusive Promo Codes</h2>
              <p className="text-gray-600">Use these codes at checkout for extra savings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-rose-200">
                <div className="text-2xl font-bold text-rose-600 mb-2">BEAUTY20</div>
                <div className="text-sm text-gray-600 mb-3">20% off orders over $75</div>
                <Button variant="outline" size="sm">Copy Code</Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-rose-200">
                <div className="text-2xl font-bold text-rose-600 mb-2">FREESHIP</div>
                <div className="text-sm text-gray-600 mb-3">Free shipping on any order</div>
                <Button variant="outline" size="sm">Copy Code</Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 text-center border-2 border-dashed border-rose-200">
                <div className="text-2xl font-bold text-rose-600 mb-2">NEWBIE15</div>
                <div className="text-sm text-gray-600 mb-3">15% off for new customers</div>
                <Button variant="outline" size="sm">Copy Code</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Don't Miss Out on These Amazing Deals!
            </h2>
            <p className="text-gray-600 mb-6">
              Limited time offers that won't last long. Shop now and save big on your favorite beauty products.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/products">Shop All Products</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/register">Sign Up for More Deals</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}