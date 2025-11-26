"use client"
import { formNewPasswordSchema, TFormNewPasswordValues } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordWithCode } from "@/app/actions";
import { FormInput } from "@/shared/components";
import { Button } from "@/shared/components";
import { Title } from "@/shared/components";
import toast from "react-hot-toast";
import { useState } from "react";


export function ResetPasswordConfirmForm({ token }: { token: string }) {
    const [isSuccess, setIsSuccess] = useState(false);

    const form = useForm<TFormNewPasswordValues>({
        resolver: zodResolver(formNewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: TFormNewPasswordValues) => {
        try {
            await resetPasswordWithCode(token, data.password);

            setIsSuccess(true);
            toast.success("Your password has been updated!", { icon: "🔐" });
        } catch (error: any) {
            return toast.error(error.message ?? "Something went wrong", { icon: "❌" });
        }
    }

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center text-center gap-4 py-10">
                <Title text="Password Updated" size="md" className="font-bold" />
                <p className="text-gray-600">
                    Your password has been successfully updated.
                    <br />
                    You may now close this page.
                </p>

                <img 
                    src="/assets/images/phone-icon.png" 
                    className="w-[80px] h-[80px] opacity-70" 
                />
            </div>
        )
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <Title text="Set a New Password" size="md" className="font-bold uppercase" />
                    <img src="/assets/images/phone-icon.png" className="w-[60px] h-[60px]" />
                </div>

                <FormInput 
                    name="password" 
                    label="New Password" 
                    type="password"
                    required
                />

                <FormInput 
                    name="confirmPassword" 
                    label="Confirm Password" 
                    type="password"
                    required
                />

                <Button 
                    loading={form.formState.isSubmitting}
                    type="submit"
                    className="h-12 text-base"
                >
                    Reset Password
                </Button>
            </form>
        </FormProvider>
    )
}
