"use client"
import { ShoppingCart, ArrowRight, Loader } from "lucide-react";
import { RootState } from "@/shared/store/store";
import { useSelector } from "react-redux";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui/button";
import { CartDrawer } from ".";


interface Props {
  className?: string;
}

export const CartButton = ({ className }: Props) => {
  const { totalAmount, loading, items } = useSelector((state: RootState) => state.cart);

  return (
    <CartDrawer>
      <Button className={cn("group relative", className)} disabled={loading}>
        {loading ? (
          <Loader className="w-5 h-5 animate-spin" />
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
