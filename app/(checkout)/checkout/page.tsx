"use client";
import { CheckoutPersonalForm, CheckoutAddressForm, CheckoutCard } from "@/shared/components/shared/checkout";
import { CheckoutFormValues, checkoutFormSchema } from "@/shared/components/shared/checkout/checkout-form-schema";
import { CheckoutSidebar } from "@/shared/components/shared/checkout-sidebar";
import { Container, Title } from "@/shared/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useCart } from "@/shared/hooks";

export default function CheckoutPage() {
    const { totalAmount, items, removeCartItem, updateItemQuantity } = useCart();

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            address: "",
            comment: ""
        }
    });

    const onSubmit = (data: CheckoutFormValues) => {
        console.log(data);
    };

    const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
        const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
        updateItemQuantity(id, newQuantity);
    };

    return (
        <Container className="mt-10">
            <Title text="Placing an order" className="font-extrabold mb-8 text-[36px]" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCard
                                onClickCountButton={onClickCountButton}
                                removeCartItem={removeCartItem}
                                items={items}
                            />

                            <CheckoutPersonalForm />

                            <CheckoutAddressForm />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}