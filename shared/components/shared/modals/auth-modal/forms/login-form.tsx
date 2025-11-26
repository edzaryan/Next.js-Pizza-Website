"use client"
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components";  
import { signIn } from "next-auth/react";
import { FormInput } from "../../..";
import toast from "react-hot-toast";
import { Title } from "../../..";


interface Props {
    onClose?: VoidFunction;
}

export const LoginForm = ({ onClose }: Props) => {
    const form = useForm<TFormLoginValues>({
        resolver: zodResolver(formLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: TFormLoginValues) => {
        try {
            const resp = await signIn("credentials", {
                ...data,
                redirect: false
            });

            if (!resp?.ok) {
                throw Error();
            }

            toast.success("You successfully login", { icon: "✅" });
            onClose?.();
        } catch (error) {
            return toast.error("Failed to log", { icon: "❌" });
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5 select-none" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Sign In" size="md" className="font-bold uppercase" />
                    </div>
                    <img 
                        src="/assets/images/phone-icon.png" 
                        className="w-15 h-15" 
                        alt="phone-icon" 
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="password" label="Password" type="password" required />

                    <Button 
                        loading={form.formState.isSubmitted} 
                        className="h-12 text-base" 
                        type="submit"
                    >
                        Login
                    </Button>
                </div>
            </form>
        </FormProvider>
    )
}