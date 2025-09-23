"use client";
import { PropsWithChildren, useEffect } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/components/ui/sheet';
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { useCartStore } from "@/shared/store/cart";


interface Props {
    className?: string;
}

export const CartDrawer = ({ children, className }: PropsWithChildren<Props>) => {
    const totalAmount = useCartStore((state) => state.totalAmount);
    const items = useCartStore((state) => state.items);
    const fetchCartItems = useCartStore((state) => state.fetchCartItems);

    useEffect(() => {
        fetchCartItems();
    }, [fetchCartItems]);

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]" aria-describedby={undefined}>
                <SheetHeader>
                    <SheetTitle>
                        Your Cart <span className="font-bold">{items.length} items</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-5 overflow-auto flex-1">
                    <div className="mb-2">
                        {
                            items.map(item => (
                                <CartDrawerItem 
                                    key={item.id}
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    details={item.pizzaSize && item.type 
                                        ? getCartItemDetails(
                                            item.ingredients, 
                                            item.type as PizzaType, 
                                            item.pizzaSize as PizzaSize) 
                                        : ""}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            ))
                        }
                    </div>
                </div>

                <SheetFooter className="p-8 bg-white ">
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg text-neutral-500">
                            Total
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                        </span>
                        <span className="font-bold text-lg">{totalAmount} ₽</span>
                    </div>

                    <Link href="/cart">
                        <Button type="submit" className="w-full h-12 text-base">
                            Place Order
                            <ArrowRight className="w-5 ml-2" />
                        </Button>
                    </Link>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}