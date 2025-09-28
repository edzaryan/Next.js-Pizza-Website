"use client";

import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItem from "./cart-item-details";
import { CountButton } from "./count-button";
import { Trash2Icon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props extends CartItemProps {
    onClickCountButton?: (type: "plus" | "minus") => void;
    onClickRemoveButton?: () => void;
    className?: string;
}

export const CartDrawerItem = ({ 
    onClickRemoveButton,
    onClickCountButton,
    imageUrl,  
    className, 
    disabled,
    quantity, 
    details, 
    price,
    name,
}: Props) => {
    return (
        <div className={cn(
            "flex bg-white p-5 gap-6",
            {"opacity-50 pointer-events-none" : disabled},
            className
        )}>
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