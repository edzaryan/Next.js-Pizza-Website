import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { useCartStore } from "@/shared/store/cart";
import { useEffect } from "react";

type ReturnProps = {
    updateItemQuantity: (id: number, quantity: number) => void;
    addCartItem: (values: CreateCartItemValues) => void;
    removeCartItem: (id: number) => void;
    items: CartStateItem[];
    totalAmount: number;
    loading: boolean;
}

export const useCart = (): ReturnProps => {
    const cartState = useCartStore(state => state);

    useEffect(() => {
        cartState.fetchCartItems();
    }, []);

    return cartState;
}