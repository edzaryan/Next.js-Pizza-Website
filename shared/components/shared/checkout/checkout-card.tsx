"use client"
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemDetails } from "@/shared/lib";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";
import { CheckoutItemSkeleton } from "..";

interface Props {
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    items: CartStateItem[];
    loading?: boolean;
    className?: string;
}

export const CheckoutCard = ({ items, className, onClickCountButton, removeCartItem, loading }: Props) => {
    return (
        <WhiteBlock title="1. Cart" className={className}>
            <div className="flex flex-col gap-5">
                {
                    loading 
                        ? [...Array(3)].map((_, index) => <CheckoutItemSkeleton key={index} />)
                        : items.map(item => (
                            <CheckoutItem
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                price={item.price}
                                quantity={item.quantity}
                                imageUrl={item.imageUrl}
                                disabled={item.disabled}
                                details={getCartItemDetails(
                                    item.ingredients, 
                                    item.pizzaType as PizzaType, 
                                    item.pizzaSize as PizzaSize
                                )}
                                onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                onClickRemove={() => removeCartItem(item.id)}
                            />
                        ))
                }
            </div>
        </WhiteBlock>
    )
}