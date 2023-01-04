export interface ICartItem {
    image: string;
    name: string;
    price: number;
    article: string;
    available: boolean;
    category: string;
    count?: number;
}

export interface ICartType {
    cart: ICartItem[];
}