"use client"
import { TFormResetPasswordValues, formResetPasswordSchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/app/actions";
import { Button } from "@/shared/components";  
import { FormInput } from "../../..";
import toast from "react-hot-toast";
import { Title } from "../../..";


interface Props {
  onClose?: VoidFunction;
}

export function ResetPasswordForm({ onClose }: Props) {
    const form = useForm<TFormResetPasswordValues>({
        resolver: zodResolver(formResetPasswordSchema),
        defaultValues: { email: "" },
    });

    const onSubmit = async (data: TFormResetPasswordValues) => {
        try {
            await requestPasswordReset(data.email);

            toast.success("We've sent you a password reset link", { icon: "✅" });
            onClose?.();
        } catch (error: any) {
            return toast.error(error.message ?? "Something went wrong. Please try again", { icon: "❌" });
        }
    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5 select-none" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <Title text="Reset Password" size="md" className="font-bold uppercase" />
                    <img 
                        src="/assets/images/phone-icon.png" 
                        className="w-[60px] h-[60px]" 
                        alt="icon" 
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <FormInput name="email" label="E-Mail" type="email" required />
                    <Button 
                        loading={form.formState.isSubmitting} 
                        className="h-12 text-base"
                        type="submit"
                    >
                        Reset my password
                    </Button>   
                </div>
            </form>
        </FormProvider>
    )
}
