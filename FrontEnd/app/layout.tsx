"use client"; // 🔥 Needed at top for client component
import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { UserProvider } from "@/contexts/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

// export const metadata: Metadata = {
//   title: "Bella Cosmetics - Premium Beauty Products",
//   description:
//     "Discover luxurious cosmetics and skincare products. Shop the latest trends in makeup, skincare, and beauty essentials.",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient()); // ✅ FIX HERE
  return (
    <html lang="ar" dir="rtl">
      <body className={`${poppins.variable} font-poppins`}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools
            buttonPosition="bottom-left"
            initialIsOpen={false}
          />
          <CartProvider>
            <UserProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </UserProvider>
          </CartProvider>
          <Toaster richColors position="top-center" />
        </QueryClientProvider>
      </body>
    </html>
  );
}
