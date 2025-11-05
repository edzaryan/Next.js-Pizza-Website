import { calcCartItemTotalPrice } from "./calc-cart-item-total-price";
import { CartDto } from "../services/dto/cart.dto";


export type CartStateItem = {
    id: number;
    quantity: number;
    name: string;
    imageUrl: string;
    price: number;
    disabled?: boolean;
    pizzaSize?: number | null;
    pizzaType?: number | null;
    ingredients: Array<{ name: string; price: number }>;
}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDto): ReturnProps => {
    const items = data.items.map((item) => {
        return {
            id: item.id,
            quantity: item.quantity,
            name: item.productItem.product.name,
            imageUrl: item.productItem.product.imageUrl,
            price: calcCartItemTotalPrice(item),
            pizzaSize: item.productItem.size,
            pizzaType: item.productItem.pizzaType,
            ingredients: item.ingredients.map(ingredient => ({
                name: ingredient.name,
                price: ingredient.price,
            })),
            disabled: false
        }
    }) as CartStateItem[]

    return {
        items,
        totalAmount: data.totalAmount,
    }
}