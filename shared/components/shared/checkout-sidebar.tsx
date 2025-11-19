import { Package, Percent, Truck } from "lucide-react";
import { CheckoutItemDetails, WhiteBlock } from ".";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button, Skeleton } from "../ui";

const VAT = 15;
const DELIVERY_PRICE = 250;

interface Props {
    totalAmount: number;
    className?: string;
    loading?: boolean;
}

export const CheckoutSidebar = ({ className, totalAmount, loading }: Props) => {
    const vatPrice = (totalAmount * VAT) / 100;
    const totalPrice = totalAmount + vatPrice + DELIVERY_PRICE;

    return (
        <WhiteBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-2">
                <span className="text-xl">Total Amount:</span>
                {
                    loading 
                        ? <Skeleton className="w-51 h-13" /> 
                        : <span className="text-[34px] font-extrabold">{totalPrice} ₽</span>
                }
            </div>

            <CheckoutItemDetails 
                className="mt-5"
                value={loading ? <Skeleton className="w-16 h-[28px] rounded-[6px]" /> : `${totalAmount} ₽`}
                title={
                    <div className="flex items-center">
                        <Package size={18} className="mr-2 text-gray-400" />
                        Products Total
                    </div>
                }  
            />
            <CheckoutItemDetails 
                className="mt-5"
                value={loading ? <Skeleton className="w-16 h-[28px] rounded-[6px]" /> : `${VAT} ₽`}
                title={
                    <div className="flex items-center">
                        <Percent size={18} className="mr-2 text-gray-400" />
                        Taxes
                    </div>
                }  
            />
            <CheckoutItemDetails 
                className="mt-5"
                value={loading ? <Skeleton className="w-16 h-[28px] rounded-[6px]" /> : `${DELIVERY_PRICE} ₽`}
                title={
                    <div className="flex items-center">
                        <Truck size={18} className="mr-2 text-gray-400" />
                        Delivery
                    </div>
                }  
            />

            <Button  
                loading={loading}
                type="submit" 
                className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                Place an order
                <ArrowRight className="w-5 ml-2" />
            </Button>
        </WhiteBlock>
    )
}