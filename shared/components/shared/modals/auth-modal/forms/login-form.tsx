import { FormProvider, useForm } from "react-hook-form";
import { TFormLoginValues, formLoginSchema } from "./schemas";
import { Title } from "../../..";
import { FormInput } from "../../..";
import { Button } from "@/shared/components";  
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

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
            toast.error("Failed to log", {  icon: "❌" });
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Welcome Back" size="md" className="font-bold" />
                        <p className="text-gray-400">Sign in to your account to continue</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
                </div>

                <FormInput name="email" label="E-Mail" required />
                <FormInput name="password" label="Password" type="password" required />

                <Button 
                    loading={form.formState.isSubmitted} 
                    className="h-12 text-base" 
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </FormProvider>
    )
}