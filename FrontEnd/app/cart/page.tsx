"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import { useUser } from "@/contexts/UserContext";
import { set } from "date-fns";
import { useMyCart } from "./useMyCart";
import { useRemoveFromCart } from "./useRemoveFromCart";
import { useUpdateQuantity } from "./useUpdateQuantity";
import { usePaymentOrder } from "./usePayment";
export default function CartPage() {
  const [showModal, setShowModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({ phone: "", address: "", name: "" });

  const validate = () => {
    const newErrors: { phone?: string; address?: string; name?: string } = {};
    if (!phone.match(/^01[0-2,5]{1}[0-9]{8}$/)) {
      newErrors.phone = "رقم الهاتف غير صالح";
    }
    if (address.trim().length < 5) {
      newErrors.address = "العنوان يجب أن يكون على الأقل 5 أحرف";
    }
    if (name.trim().length < 3) {
      newErrors.name = "العنوان يجب أن يكون على الأقل 3 أحرف";
    }
    setErrors(newErrors as any);
    return Object.keys(newErrors).length === 0;
  };

  const { state, dispatch } = useCart();
  const { user } = useUser();
  const router = require("next/navigation").useRouter();

  const { data: cart, isLoading: loadingCart, error: errorCart } = useMyCart();
  const { mutate: removeProduct, isPending } = useRemoveFromCart();
  const { mutate: mutateLupdateQuantity } = useUpdateQuantity();
  const { mutate, isPending: pendingPayment } = usePaymentOrder();

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const handleBookClick = () => setShowModal(true);

  const handleConfirm = () => {
    if (!validate()) return;

    mutate({ phone, address, name });
    setShowModal(false);
  };

  console.log("cart", cart);
  if (loadingCart) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            جاري التحميل...
          </h1>
          <p className="text-gray-600 mb-6">
            يرجى الانتظار حتى يتم تحميل البيانات.
          </p>
        </div>
      </div>
    );
  }
  if (errorCart) return <p>حدث خطأ اثناء عرض البيانات</p>;

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4 bg-white rounded-2xl shadow-xl p-8">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            يجب تسجيل الدخول أولاً
          </h1>
          <p className="text-gray-600 mb-6">
            يرجى تسجيل الدخول لعرض سلة التسوق الخاصة بك.
          </p>
          <button
            className="bg-rose-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-rose-700 transition-colors"
            onClick={() => router.push("/login")}
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (!cart?.products.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            سلة التسوق فارغة
          </h1>
          <p className="text-gray-600 mb-6">
            اكتشف منتجاتنا الرائعة وابدأ بإضافة العناصر إلى سلتك.
          </p>
          <Button asChild>
            <Link href="/products">
              ابدأ التسوق <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  const subtotal = cart.totalPrice;
  // const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping;
  console.log(cart);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          سلة التسوق ({cart.products.length} عنصر)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* عناصر السلة */}
          <div className="lg:col-span-2 space-y-4">
            {cart.products.map((item) => {
              const product = item.product;
              const discountedPrice = product.finalPrice;
              return (
                <div
                  key={item._id}
                  className="bg-white rounded-2xl p-6 shadow-md"
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="w-full sm:w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            id : {product._id}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            removeProduct(item.product._id);
                          }}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                              mutateLupdateQuantity({
                                productId: item.product._id,
                                quantity: item.quantity - 1,
                              })
                            }
                            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              mutateLupdateQuantity({
                                productId: item.product._id,
                                quantity: item.quantity + 1,
                              })
                            }
                            className="p-1 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm text-gray-500 line-through">
                            {product.priceBeforeDiscount !==
                              product.finalPrice &&
                              `جنيه ${(
                                product.priceBeforeDiscount * item.quantity
                              ).toFixed(2)}`}
                          </div>
                          <div className="font-semibold text-rose-600">
                            جنيه {(discountedPrice * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" asChild>
                <Link href="/products">متابعة التسوق</Link>
              </Button>

              {/* <button
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                حذف كل السلة
              </button> */}
            </div>
          </div>

          {/* ملخص الطلب */}
          <div className="bg-white rounded-2xl p-6 shadow-md h-fit sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4">ملخص الطلب</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">المجموع الفرعي</span>
                <span className="font-medium">جنيه {subtotal.toFixed(2)}</span>
              </div>
              {/* 
              <div className="flex justify-between">
                <span className="text-gray-600">الضريبة</span>
                <span className="font-medium">جنيه {tax.toFixed(2)}</span>
              </div> */}

              <div className="flex justify-between">
                <span className="text-gray-600">الشحن</span>
                <span className="font-medium">
                  {shipping === 0 ? "مجاني" : `جنيه ${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  شحن مجاني للطلبات التي تزيد عن 50 جنيه
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 my-4"></div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-gray-900">الإجمالي</span>
              <span className="text-xl font-bold text-rose-600">
                جنيه {total.toFixed(2)}
              </span>
            </div>

            <Button
              onClick={handleBookClick}
              disabled={pendingPayment}
              size="lg"
              className="w-full"
              asChild
            >
              <Link href="/checkout">
                {!pendingPayment && (
                  <span>
                    إتمام الشراء <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                )}
              </Link>
            </Button>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                عملية دفع آمنة بتشفير SSL 256 بت
              </p>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 text-right">
            <h2 className="text-xl font-bold text-gray-700">أدخل بياناتك</h2>

            <div>
              <label className="block text-sm text-gray-600">الاسم</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="ادخل اسمك "
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600">رقم الهاتف</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="01XXXXXXXXX"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600">العنوان</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border rounded p-2"
                placeholder="مثال: شارع التحرير، الجيزة"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                onClick={handleConfirm}
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
              >
                تأكيد
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
