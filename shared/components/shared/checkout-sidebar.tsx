import { CheckoutItemDetails } from "./checkout-item-details";
import { Package, Percent, Truck } from "lucide-react";
import { WhiteBlock } from "./white-block";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/shared/lib/utils";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    className?: string;
}

export const CheckoutSidebar = ({ className, totalAmount }: Props) => {

    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-2">
                <span className="text-xl">Total Amount:</span>
                <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
            </div>

            <CheckoutItemDetails 
                className="mt-5"
                value={`${totalAmount} ₽`}
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Products Total
                    </div>
                }  
            />
            <CheckoutItemDetails 
                className="mt-5"
                value={`${VAT} ₽`}
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        Taxes
                    </div>
                }  
            />
            <CheckoutItemDetails 
                className="mt-5"
                value={`${DELIVERY_PRICE} ₽`}
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Delivery
                    </div>
                }  
            />

            <Button type="submit" className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Place an order
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    )
}