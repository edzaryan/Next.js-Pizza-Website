import { Container, Title } from "@/shared/components/shared";
import { WhiteBlock } from "@/shared/components/shared";
import { Input, Textarea } from "@/shared/components/ui";
import { CheckoutItemDetails } from "@/shared/components/shared";
import { Package, Percent, Truck, ArrowRight } from "lucide-react";
import { Button } from "@/shared/components/ui";

export default function CheckoutPage() {
    return (
        <Container className="mt-10">
            <Title text="Placing an order" className="font-extrabold mb-8 text-[36px]" />

            <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                    <WhiteBlock title="1. Cart">888</WhiteBlock>
                    <WhiteBlock title="2. Personal Information">
                        <div className="grid grid-cols-2 gap-4">
                            <Input name="firstName" placeholder="First name" className="text-base" />
                            <Input name="lastName" placeholder="Last name" className="text-base" />
                            <Input name="email" placeholder="Email" className="text-base" />
                            <Input name="phone" placeholder="Phone" className="text-base" />
                        </div>
                    </WhiteBlock>
                    <WhiteBlock title="3. Delivery Address">
                        <div className="flex flex-col gap-5">
                            <Input name="address" placeholder="Type Address" className="text-base" />
                            <Textarea placeholder="Order comments" rows={4} className="text-base"  />
                        </div>
                    </WhiteBlock>
                </div>

                <div className="w-[450px]">
                    <WhiteBlock className="p-6 sticky top-4">
                        <div className="flex flex-col gap-2">
                            <span className="text-xl">Total Amount:</span>
                            <span className="text-[34px] font-extrabold">3506 ₽</span>
                        </div>

                        <CheckoutItemDetails 
                            className="mt-5"
                            value="3506"
                            title={
                                <div className="flex items-center">
                                    <Package size={18} className="mr-2 text-gray-400" />
                                    Cost
                                </div>
                            }  
                        />
                        <CheckoutItemDetails 
                            className="mt-5"
                            value="3506"
                            title={
                                <div className="flex items-center">
                                    <Percent size={18} className="mr-2 text-gray-400" />
                                    Taxes
                                </div>
                            }  
                        />
                        <CheckoutItemDetails 
                            className="mt-5"
                            value="3506"
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
                </div>
            </div>
        </Container>
    )
}