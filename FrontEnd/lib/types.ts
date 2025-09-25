export type Product = {
    _id?: string;
    name: string;
    priceBeforeDiscount: number;
    finalPrice: number;
    images: string[];
    category: string;
    stock: number;
}
