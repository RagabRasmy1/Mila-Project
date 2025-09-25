"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { useMyCart } from "@/app/cart/useMyCart";
import { useCurUser } from "@/app/login/useCurUser";
import { useLogout } from "@/app/login/useLogout";

export function Navbar() {
  const { user: user, isLoading: loadingUser, error: errorUser } = useCurUser();
  const { logout } = useLogout();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = require("next/navigation").useRouter();
  const { data: cart, isLoading: loadingCart, error: errorCart } = useMyCart();
  // if (loadingCart) return <h2>Loading...</h2>;
  // if (errorCart) return <h2>error while loading cart...</h2>;
  // if (loadingUser) return <p>Loading...</p>;
  // if (errorUser) return <p>Error: {errorUser.message}</p>;

  console.log("uuuuu", user);
  const navigation = [
    { name: 'الرئيسية', href: '/' },
    { name: 'المنتجات', href: '/products' },
    // { name: 'العروض', href: '/offers' },
    // { name: 'من نحن', href: '/about' },
    // { name: 'اتصل بنا', href: '/contact' },
  ];

  console.log("my cart ", cart);
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-gradient rounded-lg flex items-center justify-center">
              <Heart className="h-5 w-5 text-rose-600 fill-current" />
            </div>
            <span className="text-xl font-bold text-gray-900">بيلا</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-rose-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث عن المنتجات..."
                className="w-full pr-10 pl-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-right"
              />
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-rose-600" />
                <span className="font-medium text-gray-700">
                  {user?.user?.userName || user?.name || user?.username || ""}
                </span>
                <button
                  className="ml-2 text-gray-700 hover:text-white bg-rose-500 hover:bg-rose-700 transition-colors font-medium px-3 py-2 rounded"
                  onClick={logout}
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <button
                className="text-gray-700 hover:text-rose-600 transition-colors font-medium px-3 py-2 rounded"
                onClick={() => router.push("/login")}
              >
                تسجيل الدخول
              </button>
            )}

            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-rose-600 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              {cart?.products?.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart?.products?.length}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-rose-600 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-rose-100">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="البحث عن المنتجات..."
                  className="w-full pl-10 pr-4 py-2 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-rose-600 hover:bg-rose-50 rounded-md font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
