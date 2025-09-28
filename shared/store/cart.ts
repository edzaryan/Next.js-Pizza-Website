import { create } from "zustand";
import { getCartDetails } from "../lib";
import { Api } from "../services/api-client";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export type ICartItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    pizzaSize?: number | null;
    pizzaType?: number | null;
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
            set({ ...getCartDetails(data), loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },

    updateItemQuantity: async (id: number, quantity: number) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.updateItemQuantity(id, quantity);
            set({ ...getCartDetails(data), loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },

    addCartItem: async (values: CreateCartItemValues) => {
        try {
            set({ loading: true, error: false });
            const data = await Api.cart.addCartItem(values);
            set({ ...getCartDetails(data), loading: false });
        } catch (error) {
            set({ error: true, loading: false });
        }
    },

    removeCartItem: async (id: number) => {
        try {
            set(state => ({ 
                ...state, 
                loading: true, 
                error: false,
                items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item)
            }));
            const data = await Api.cart.removeCartItem(id);
            set({ ...getCartDetails(data), loading: false });
        } catch (error) {
            set({ error: true });
        } finally {
            set(state => ({ 
                ...state,
                loading: false,
                items: state.items.map(item => ({ ...item, disabled: false }))
            }))
        }
    },
}));