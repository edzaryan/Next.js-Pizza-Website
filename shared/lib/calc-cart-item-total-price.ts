import { CartItemDto } from "../services/dto/cart.dto";

export const calcCartItemTotalPrice = (item: CartItemDto) => {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
}