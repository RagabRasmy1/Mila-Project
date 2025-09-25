"use client";

import React, { useState, useMemo } from "react";
import { Filter, X } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { Button } from "@/components/ui/button";
import FilterSidebar from "./FilterSidebar";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/api-products";
import { getAllCategories } from "../services/api-categories";
import { Product } from "@/lib/types";

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery<{ _id: string; name: string }[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getAllCategories();
      return res.data.categories || [];
    },
  });

  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
  } = useQuery<Product[]>({
    queryKey: ["products", selectedCategoryId],
    queryFn: async () => {
      const res = await getAllProducts(selectedCategoryId);
      if (selectedCategoryId) {
        return res.data.products || [];
      }
      return res.data.data.products || [];
    },
  });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            جميع المنتجات
          </h1>
          <p className="text-lg text-gray-600">
            اكتشفي مجموعتنا الكاملة من منتجات الجمال الفاخرة
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full justify-center"
          >
            <Filter className="h-4 w-4 ml-2" />
            {showFilters ? "إخفاء المرشحات" : "إظهار المرشحات"}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <h2 className="text-xl font-semibold text-gray-900 lg:hidden">
                  المرشحات
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Pass categories and selectedCategory to FilterSidebar */}
              <FilterSidebar
                categories={[{ _id: "", name: "الكل" }, ...categories]}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setSelectedCategoryId={setSelectedCategoryId}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600">
                عرض {products.length} من {products.length} منتج
              </p>
            </div>

            {/* Products Grid */}
            {productsLoading || categoriesLoading ? (
              <div className="text-center py-12 text-gray-500">
                جاري التحميل...
              </div>
            ) : productsError || categoriesError ? (
              <div className="text-center py-12 text-red-500">
                حدث خطأ أثناء جلب البيانات
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product: Product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <Filter className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg">لم يتم العثور على منتجات</p>
                  <p className="text-sm">جربي تعديل المرشحات</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setSelectedCategory("الكل")}
                >
                  مسح جميع المرشحات
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
