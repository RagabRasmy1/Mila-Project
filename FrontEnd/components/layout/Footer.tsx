import React from 'react';
import Link from 'next/link';
import { Heart, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-rose-100" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="w-8 h-8 bg-rose-gradient rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-rose-600 fill-current" />
              </div>
              <span className="text-xl font-bold text-gray-900">بيلا</span>
            </div>
            <p className="text-gray-600 text-sm">
              اكتشفي مستحضرات التجميل والعناية بالبشرة الفاخرة التي تبرز جمالك الطبيعي.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rose-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rose-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-600 hover:text-rose-600 transition-colors">جميع المنتجات</Link></li>
              <li><Link href="/offers" className="text-gray-600 hover:text-rose-600 transition-colors">العروض الخاصة</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-rose-600 transition-colors">من نحن</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">الفئات</h3>
            <ul className="space-y-2">
              <li><Link href="/products?category=makeup" className="text-gray-600 hover:text-rose-600 transition-colors">مكياج</Link></li>
              <li><Link href="/products?category=skincare" className="text-gray-600 hover:text-rose-600 transition-colors">العناية بالبشرة</Link></li>
              <li><Link href="/products?category=fragrance" className="text-gray-600 hover:text-rose-600 transition-colors">العطور</Link></li>
              <li><Link href="/products?category=hair-care" className="text-gray-600 hover:text-rose-600 transition-colors">العناية بالشعر</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">ابقي على اطلاع</h3>
            <p className="text-gray-600 text-sm mb-4">
              اشتركي للحصول على العروض الخاصة والتحديثات.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 px-3 py-2 border border-rose-200 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right"
              />
              <button className="bg-rose-500 text-white px-4 py-2 rounded-l-xl hover:bg-rose-600 transition-colors">
                <Mail className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-100 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} مستحضرات بيلا للتجميل. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}