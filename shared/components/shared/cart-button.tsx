"use client"
import { ShoppingCart, ArrowRight, Loader } from "lucide-react";
import { useCartStore } from "@/shared/store";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { CartDrawer } from ".";

interface Props {
    className?: string;
}

export const CartButton = ({ className }: Props) => {
    const totalAmount = useCartStore(state => state.totalAmount);
    const loading = useCartStore(state => state.loading);
    const items = useCartStore(state => state.items);

    return (
        <CartDrawer>
            <Button className={cn("group relative", className)} disabled={loading}>
                {loading ? (
                    <Loader className="w-25 h-5 animate-spin" />
                ) : (
                    <>
                        <div className="text-[14px]">{totalAmount} ₽</div>
                        <span className="w-[1px] h-[20px] bg-white/40 mx-1" />
                        <div className="flex items-center gap-[6px] transition duration-300 group-hover:opacity-0 text-[14px]">
                            <ShoppingCart className="relative" size={18} />
                            <div>{items.length}</div>
                        </div>
                        <ArrowRight
                            size={18}
                            className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                        />
                    </>
                )}
            </Button>
        </CartDrawer>
    )
}