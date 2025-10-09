"use client";
import { CheckoutFormValues, checkoutFormSchema, CheckoutPersonalForm, CheckoutAddressForm, CheckoutCard } from "@/shared/components";
import { CheckoutSidebar, Container, Title } from "@/shared/components/shared";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/app/actions";
import { useCart } from "@/shared/hooks";
import toast from "react-hot-toast";
import { useState } from "react";

export default function CheckoutPage() {
    const { totalAmount, items, removeCartItem, updateItemQuantity, loading } = useCart();
    const [submitting, setSubmitting] = useState(false);

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

    const onSubmit = async (data: CheckoutFormValues) => {
        setSubmitting(true);

        try {
          let url = await createOrder(data);
    
          toast.success('Order successfully placed! 📝 Redirecting to payment... ', {
            icon: '✅',
          });

          if (url) {
            location.href = url;
          }
        } catch (err) {
          console.log(err);
          setSubmitting(false);
          toast.error('Failed to create order', { icon: '❌' });
        }
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
                                loading={loading}
                                items={items}
                            />

                            <CheckoutPersonalForm className={loading ? "opacity-40 pointer-events-none" : ""} />

                            <CheckoutAddressForm className={loading ? "opacity-40 pointer-events-none" : ""} />
                        </div>

                        <div className="w-[450px]">
                            <CheckoutSidebar totalAmount={totalAmount} loading={loading || submitting} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}