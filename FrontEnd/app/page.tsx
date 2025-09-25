'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Sparkles, Heart, Gift, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ui/ProductCard';
import { products, testimonials } from '@/lib/data';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen" dir="rtl">
      {/* Hero Section */}
      <section className="relative bg-rose-gradient min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-rose-50/90 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  اكتشفي
                  <span className="text-rose-600 block">جمالك الطبيعي</span>
                </h1>
                <p className="text-lg text-gray-700 max-w-lg">
                  مستحضرات تجميل وعناية بالبشرة فاخرة مصنوعة بأجود المكونات لتعزيز إشراقتك الطبيعية.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" >
                  <Link href="/products">
                    تسوقي الآن <ArrowRight className="mr-2 h-5 w-5 rotate-180" />
                  </Link>
                </Button>
                <Button variant="secondary" size="lg" >
                  <Link href="/offers">
                    عرض العروض
                  </Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">+10 آلاف</div>
                  <div className="text-sm text-gray-600">عميلة سعيدة</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">+500</div>
                  <div className="text-sm text-gray-600">منتج فاخر</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[500px] w-full">
                <Image
                  src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="امرأة جميلة مع مستحضرات التجميل"
                  fill
                  className="object-cover rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">عينات مجانية</div>
                    <div className="text-sm text-gray-600">مع كل طلب</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">شحن مجاني</h3>
              <p className="text-gray-600">شحن مجاني للطلبات أكثر من 50 دولار</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">عينات مجانية</h3>
              <p className="text-gray-600">عينات مجانية مع كل عملية شراء</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">غير مختبرة على الحيوانات</h3>
              <p className="text-gray-600">جميع المنتجات مصنوعة بطريقة أخلاقية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              المنتجات المميزة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              اكتشفي منتجاتنا الأكثر حباً، المختارة بعناية لجودتها الاستثنائية ونتائجها المذهلة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Button>
              <Link href="/products">
                عرض جميع المنتجات <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ماذا تقول عميلاتنا
            </h2>
            <p className="text-lg text-gray-600">
              انضمي إلى آلاف العميلات الراضيات اللواتي يثقن في مستحضرات بيلا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-rose-50 p-6 rounded-2xl">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={40}
                    height={40}
                    className="rounded-full ml-3"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-rose-gradient">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ابقي على اطلاع
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            اشتركي في نشرتنا الإخبارية للحصول على عروض حصرية ونصائح جمالية وإطلاق المنتجات الجديدة.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="أدخلي عنوان بريدك الإلكتروني"
                className="flex-1 px-4 py-3 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right"
              />
              <Button>اشتراك</Button>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              لا رسائل مزعجة، يمكنك إلغاء الاشتراك في أي وقت.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}