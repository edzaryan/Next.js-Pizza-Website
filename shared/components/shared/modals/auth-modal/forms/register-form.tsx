"use client"
import { TFormRegisterValues, formRegisterSchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui";
import { registerUser } from "@/app/actions";
import { FormInput } from "../../../form";
import toast from "react-hot-toast";
import { Title } from "../../..";
import Image from "next/image";


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

      toast.error("Registration successful 📝. Verify your email", { icon: "✅" });
      onClose?.();
    } catch (error) {
      return toast.error("Invalid E-Mail or password", { icon: "❌" });
    }
  }

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5 select-none" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center">
            <div className="mr-2">
                <Title text="Create an account" size="md" className="font-bold uppercase" />
            </div>
            <Image 
              src="/assets/images/phone-icon.png" 
              alt="phone-icon" 
              width={60} 
              height={60} 
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