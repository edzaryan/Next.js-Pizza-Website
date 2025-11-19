import { calcTotalPizzaPrice } from "./calc-total-pizza-price";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { mapPizzaType } from "../constants/pizza";
import { ProductItem } from "@prisma/client";
import { Ingredient } from "@prisma/client";

export const getPizzaDetails = (
    type: PizzaType,
    size: PizzaSize,
    items: ProductItem[],
    ingredients: Ingredient[],
    selectedIngredients: Set<number>
) => {
    const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients);
    const textDetails = `${size} cm, ${mapPizzaType[type]} pizza`;

    return { totalPrice, textDetails };
}