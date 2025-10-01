"use client";
import { Sheet, SheetTrigger, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetClose } from '@/shared/components/ui/sheet';
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { PropsWithChildren } from "react";
import { useCart } from "@/shared/hooks";
import { Button } from "../ui/button";
import { Title } from "./title";
import Image from "next/image";
import Link from "next/link";


export const CartDrawer = ({ children }: PropsWithChildren) => {
    const { totalAmount, items, removeCartItem, updateItemQuantity } = useCart();

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    const onClickRemoveButton = (id: number) => {
        removeCartItem(id);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]" aria-describedby={undefined}>
                {totalAmount > 0 && (
                    <SheetHeader>
                        <SheetTitle>
                            Your Cart <span className="font-bold">{items.length} items</span>
                        </SheetTitle>
                    </SheetHeader>
                )}
                {!totalAmount && (
                    <div className="flex flex-col h-full items-center justify-center w-72 mx-auto">
                        <Image src="/assets/images/empty-box.png" alt="cart-empty" width={120} height={120} />
                        <Title size="sm" text="Your cart is empty" className="text-center font-bold my-2" />
                        <p className="text-center text-neutral-500 mb-5">
                            Your cart is empty. Please add some items to your cart.
                        </p>
                        <SheetClose>
                            <Button className="w-56 h-12 text-base" size="lg">
                                <ArrowLeft className="w-5 mr-2" />
                                Back to Home
                            </Button>
                        </SheetClose>
                    </div>
                )}
                {totalAmount > 0 && <>
                    <div className="mt-5 overflow-auto flex-1">
                    {
                        items.map(item => (
                            <div key={item.id} className="mb-2">
                                <CartDrawerItem 
                                    id={item.id}
                                    imageUrl={item.imageUrl}
                                    details={
                                        getCartItemDetails(
                                            item.ingredients, 
                                            item.pizzaType as PizzaType, 
                                            item.pizzaSize as PizzaSize
                                        ) 
                                    }
                                    name={item.name}
                                    disabled={item.disabled}
                                    price={item.price}
                                    quantity={item.quantity}
                                    onClickCountButton={(type) => onClickCountButton(item.id, item.quantity, type)}
                                    onClickRemoveButton={() => onClickRemoveButton(item.id)}
                                />
                            </div>
                        ))
                    }
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
                </>}
            </SheetContent>
        </Sheet>
    )
}