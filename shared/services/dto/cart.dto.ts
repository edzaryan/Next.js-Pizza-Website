import { Cart, CartItem, Ingredient, ProductItem, Product } from "@prisma/client";

export type CartItemDto = CartItem & {
    productItem: ProductItem & {
        product: Product;
    };
    ingredients: Ingredient[];
}

export interface CartDto extends Cart {
    items: CartItemDto[];
}
