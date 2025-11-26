"use client"
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui";
import { registerUser } from "@/app/actions";
import { FormInput } from "../../..";
import toast from "react-hot-toast";
import { Title } from "../../..";


interface Props {
  onClose?: VoidFunction;
}

export const RegisterForm = ({ onClose }: Props) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        verified: ""
      });

      toast.success("Registration successfull. Verify your email", { icon: "✅" });
      onClose?.();
    } catch (error: any) {
      return toast.error(error.message ?? "Something went wrong. Please try again", { icon: "❌" });
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5 select-none" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
            <div className="mr-2">
              <Title text="Create an account" size="md" className="font-bold uppercase" />
            </div>
            <img 
              src="/assets/images/phone-icon.png" 
              alt="phone-icon" 
              className="w-15 h-15" 
            />
        </div>

        <div className="flex flex-col gap-2">
            <FormInput name="email" label="E-Mail" required />
            <FormInput name="fullName" label="Full Name" required />
            <FormInput name="password" label="Password" type="password" required />
            <FormInput name="confirmPassword" label="Confirm Password" type="password" required />

            <Button 
              loading={form.formState.isSubmitting} 
              className="h-12 text-base" 
              type="submit"
            >
              Register
            </Button>
        </div>
      </form>
    </FormProvider>
  )
}