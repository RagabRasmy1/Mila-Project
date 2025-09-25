import api from "./axiosInstance"

export const getAllCategories = async () => {
    const res = await api.get('/categories')
    return res
}