import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    isNewArrival: boolean;
    description: string;
    stock: bigint;
    category: string;
    colors: Array<string>;
    price: number;
    isBestSeller: boolean;
    images: Array<string>;
}
export interface Subscriber {
    email: string;
    timestamp: Time;
}
export type Time = bigint;
export interface backendInterface {
    addProduct(name: string, description: string, price: number, category: string, colors: Array<string>, images: Array<string>, stock: bigint, isBestSeller: boolean, isNewArrival: boolean): Promise<void>;
    getAllProducts(category: string | null, isBestSeller: boolean | null, isNewArrival: boolean | null, sortBy: string | null, reverse: boolean | null): Promise<Array<Product>>;
    getAllSubscribers(): Promise<Array<Subscriber>>;
    getProductById(id: bigint): Promise<Product>;
    submitReview(productId: bigint, reviewer: string, rating: bigint, comment: string): Promise<void>;
    subscribeEmail(email: string): Promise<void>;
}
