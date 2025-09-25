"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  Star,
  ShoppingBag,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ui/ProductCard";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/app/services/api-products";
import { useUser } from "@/contexts/UserContext";
import { toast } from "sonner";
import { useAddToCart } from "@/app/cart/useAddToCart";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { dispatch } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { mutate: addToCart, isPending } = useAddToCart();

  // Fetch product data
  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product>({
    queryKey: ["product", params.id],
    queryFn: async () => {
      const res = await getProductById(params.id as string);
      return res.data.product[0];
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            جاري التحميل...
          </h1>
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            المنتج غير موجود
          </h1>
          <Button onClick={() => router.back()}>العودة</Button>
        </div>
      </div>
    );
  }

  const finalPrice = product.finalPrice;
  const priceBeforeDiscount = product.priceBeforeDiscount;
  const discount =
    priceBeforeDiscount > finalPrice
      ? Math.round((1 - finalPrice / priceBeforeDiscount) * 100)
      : 0;
  const { user } = useUser();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً", {
        description: "الرجاء تسجيل الدخول لإضافة المنتجات إلى السلة",
        action: {
          label: "تسجيل الدخول",
          onClick: () => router.push("/login"),
        },
      });
      return;
    }

    addToCart({ productId: product._id, quantity: 1 });

    // TODO: Add to cart logic here
    //  dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const productImages = product.images;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-rose-600 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          العودة إلى المنتجات
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-white">
              <Image
                src={productImages[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-rose-500 text-white px-3 py-1 rounded-lg font-medium">
                  -{discount}% OFF
                </div>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="flex space-x-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index
                        ? "border-rose-500"
                        : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mt-4">
                {discount > 0 && (
                  <span className="text-xl text-gray-500 line-through">
                    ${priceBeforeDiscount.toFixed(2)}
                  </span>
                )}
                <span className="text-3xl font-bold text-rose-600">
                  ${finalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                الوصف
              </h3>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">الكمية:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  disabled={isPending}
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1"
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  إضافة إلى السلة - ${(finalPrice * quantity).toFixed(2)}
                </Button>
                <Button variant="secondary" size="lg">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-gray-900">شحن مجاني</div>
                    <div className="text-sm text-gray-600">
                      للطلبات أكثر من 50$
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <RotateCcw className="h-5 w-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-gray-900">إرجاع سهل</div>
                    <div className="text-sm text-gray-600">سياسة 30 يوم</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-gray-900">منتج أصلي</div>
                    <div className="text-sm text-gray-600">أصلي 100%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
