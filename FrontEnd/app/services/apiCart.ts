import api from "./axiosInstance";
export const getMyCart = async () => {
  try {
    const response = await api.get("/carts");
    return response.data?.myCart || null;
  } catch (error) {
    console.error("Error in getMyCart:", error);
    const message =
      error?.response?.data?.message || error?.response?.data?.error?.message;

    // If auth-related issue, return null instead of throwing
    if (
      error?.response?.status === 401 ||
      message === "Authentication required"
    ) {
      return null;
    }
    throw error;
  }
};

export const removeFromCart = async (productId: string) => {
  try {
    await api.delete("/carts", {
      data: { productId },
    });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    throw error;
  }
};

export const updateProductQuantity = async ({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) => {
  try {
    const res = await api.put("/carts", { productId, quantity });
    return res.data.cart;
  } catch (error) {
    console.error("Error updating cart quantity:", error);
    throw error;
  }
};

export const PaymentOrder = async ({ phone, address, name }) => {
  try {
    const res = await api.post("/pay", {
      phone,
      shippingAddress: address,
      customerName: name,
    });
    return res.data;
  } catch (err) {
    console.error(err);
    const message =
      error?.response?.data?.message || error?.response?.data?.error?.message;
    throw new Error(message || "حدث خطأ أثناء معالجة الدفع");
  }
};

// api/cartApi.js

export const addToCart = async ({ productId, quantity = 1 }) => {
  try {
    const response = await api.post("/carts", { productId, quantity });
    return response.data;
  } catch (error) {
    // Optional: log the error for debugging
    console.error("Add to cart error:", error);

    // Normalize and re-throw a useful error object
    const message =
      error?.response?.data?.error?.message ||
      error?.message ||
      "Failed to add product to cart";

    throw new Error(message);
  }
};
