import { cn } from "@/shared/lib/utils";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";

interface Props extends CartItemProps {
    className?: string;
}

export const CartDrawerItem = ({ id, imageUrl, name, price, quantity, className }: Props) => {
    return (
        <div className={cn("flex bg-white p-5 gap-6", className)}>
            <CartItem.Image src={imageUrl} />

            <div className="flex-1">
                <CartItem.Info />
            </div>
        </div>
    )
}