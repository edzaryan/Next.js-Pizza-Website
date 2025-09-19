import { PropsWithChildren } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from '@/shared/components/ui/sheet';
import { ArrowRight } from "lucide-react";


interface Props {
    className?: string;
}

export const CartDrawer = ({ className, children }: PropsWithChildren<Props>) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>

            {/* Items */}

            <SheetContent className="flex flex-col justify-between pb-0 bg-[#f4f1ee]">
                <SheetHeader>
                    <SheetTitle>
                        Your Cart <span className="font-bold">3 items</span>
                    </SheetTitle>
                </SheetHeader>

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