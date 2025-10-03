"use client";
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { getCartItemDetails } from "@/shared/lib";
import { CheckoutItem } from "../checkout-item";
import { WhiteBlock } from "../white-block";

interface Props {
    onClickCountButton: (id: number, quantity: number, type: "plus" | "minus") => void;
    removeCartItem: (id: number) => void;
    items: CartStateItem[];
    className?: string;
}

export const CheckoutCard = ({ items, className, onClickCountButton, removeCartItem }: Props) => {
    return (
        <WhiteBlock title="1. Cart" className={className}>
            <div className="flex flex-col gap-5">
                {
                    items.map(item => (
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