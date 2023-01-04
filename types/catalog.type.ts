export interface ICatalogTypeItem {
    image: string;
    name: string;
    price: number;
    article: string;
    available: boolean;
    category: string;
    count?: number;
}

export interface ICatalogType {
    products: ICatalogTypeItem[];
}