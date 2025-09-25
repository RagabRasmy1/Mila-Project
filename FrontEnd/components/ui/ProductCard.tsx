"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "./button";
import { Product } from "@/lib/types";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAddToCart } from "@/app/cart/useAddToCart";
interface ProductCardProps {
  product: any;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const { mutate: addToCart, isPending } = useAddToCart();

  const { user } = useUser();
  const router = useRouter();

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
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative overflow-hidden">
        <Link href={`/product/${product._id}`}>
          <div className="aspect-square relative">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {product.finalPrice && (
          <div className="absolute top-3 left-3 bg-rose-500 text-white px-2 py-1 rounded-lg text-sm font-medium">
            -{product.finalPrice}%
          </div>
        )}

        <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors duration-200">
          <Heart className="h-4 w-4 text-rose-400 hover:text-rose-600" />
        </button>
      </div>

      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="font-semibold text-gray-900 mb-1 hover:text-rose-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.finalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {product.priceBeforeDiscount.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-rose-600">
              {product.finalPrice}
            </span>
          </div>

          <Button
            disabled={isPending}
            size="sm"
            onClick={handleAddToCart}
            className="px-3 py-2"
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
