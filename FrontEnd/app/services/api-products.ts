import api from "./axiosInstance";

export const getAllProducts = async (categoryId?: string) => {
    const res = await api.get(categoryId ? `/products/${categoryId}/category` : '/products')
    return res
}

export const getProductById = async (id: string) => {
    const res = await api.get(`/products/${id}`)
    return res
}

