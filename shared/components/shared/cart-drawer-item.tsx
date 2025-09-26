"use client";

import { cn } from "@/shared/lib/utils";
import { Trash2Icon } from "lucide-react";
import { CountButton } from "./count-button";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
    className?: string;
    onClickRemoveButton?: () => void;
    onClickCountButton?: (type: "plus" | "minus") => void;
}

export const CartDrawerItem = ({ 
    name,
    price,
    details, 
    imageUrl,  
    quantity, 
    className, 
    onClickCountButton,
    onClickRemoveButton 
}: Props) => {
    return (
        <div className={cn("flex bg-white p-5 gap-6", className)}>
            <CartItem.Image src={imageUrl} />

            <div className="flex-1">
                <CartItem.Info name={name} details={details} />

                <hr className="my-3" />

                <div className="flex items-center justify-between">
                    <CountButton onClick={onClickCountButton} value={quantity} />

                    <div className="flex items-center gap-3">
                        <CartItem.Price value={price} />
                        <Trash2Icon 
                            className="text-gray-400 cursor-pointer hover:text-gray-600" 
                            onClick={onClickRemoveButton} 
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}