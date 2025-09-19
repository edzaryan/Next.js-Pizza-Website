import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { CartDrawer } from "./cart-drawer";

interface Props {
    className?: string;
}

export const CartButton = ({ className }: Props) => {
    return (
        <CartDrawer>
            <Button className={cn("group relative", className)}>
                <div>520 ₽</div>
                <span className="w-[1px] h-[20px] bg-white/40 mx-1" />
                <div className="flex items-center gap-[6px] transition duration-300 group-hover:opacity-0">
                    <ShoppingCart className="relative" strokeWidth={2} />
                    <div>3</div>
                </div>
                <ArrowRight
                    strokeWidth={2}
                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                />
            </Button>
        </CartDrawer>
    )
}