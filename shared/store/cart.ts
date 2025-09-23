import { create } from "zustand";
import { getCartDetails } from "../lib";
import { Api } from "../services/api-client";

export type ICartItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    type?: number | null;
    ingredients: Array<{ name: string; price: number }>;
};

export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: ICartItem[];

    fetchCartItems: () => Promise<void>;

    updateItemQuantity: (id: number, quantity: number) => Promise<void>;

    addCartItem: (values: any) => Promise<void>;

    removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.getCart();
            set(getCartDetails(data));
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set(getCartDetails(data));
        } catch (error) {
            set({ error: true });
        } finally {
            set({ loading: false });
        }
    },

    addCartItem: async (values: any) => {
        try {
            // Update local state
        } catch (error) {
            set({ error: true });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            // Update local state
        } catch (error) {
            set({ error: true });
        }
    },
}));