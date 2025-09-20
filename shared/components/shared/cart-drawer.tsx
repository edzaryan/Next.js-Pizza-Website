"use client";

import { PropsWithChildren } from "react";
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

interface Props {
    className?: string;
}

export const CartDrawer = ({ className, children }: PropsWithChildren<Props>) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Your Cart <span className="font-bold">3 items</span>
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-5 overflow-auto flex-1">
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                    <div className="mb-2">
                        <CartDrawerItem 
                            id={1}
                            imageUrl="https://media.dodostatic.net/image/r:292x292/0198bf57bc517218ab93c762f4b0193e.jpg"
                            details={getCartItemDetails(2, 30, [{ name: "xxx" }, { name: "yyy" }])}
                            name={"Ham and cheese sandwich"}
                            price={100}
                            quantity={1}
                        />
                    </div>
                </div>

                <SheetFooter className="p-8 bg-white ">
                    <div className="flex mb-4">
                        <span className="flex flex-1 text-lg text-neutral-500">
                            Total
                            <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                        </span>
                        <span className="font-bold text-lg">500 ₽</span>
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