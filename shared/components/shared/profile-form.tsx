"use client"
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title, Container } from ".";
import { updateUserInfo } from "@/app/actions";
import { ProfileImageUploader } from "./form"
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

interface Props {
  data: User;
}

export function ProfileForm({ data }: Props) {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: TFormRegisterValues) => {
        try {
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            });

            toast.success("Data updated successfully", { icon: "✅" });
        } catch (error) {
            toast.error("Something went wrong.", { icon: "❌" });
        }
    }

    const onClickSignOut = () => {
        signOut({ callbackUrl: "/" });
    }

    return (
      <Container className="my-10">
        <Title text="Personal Information" size="md" className="text-[32px] font-extrabold" />
        
        <div className="flex flex-cols justify-center gap-50 mt-14">
          <div className="mt-3">
            <ProfileImageUploader initialImage={data.imageUrl} />
          </div>
          <div>
            <FormProvider {...form}>
              <form className="flex flex-col gap-5 w-96" onSubmit={form.handleSubmit(onSubmit)}>
                <FormInput name="email" label="E-Mail" required />
                <FormInput name="fullName" label="Full Name" required />

                <FormInput type="password" name="password" label="New Password" required />
                <FormInput type="password" name="confirmPassword" label="Confirm Password" required />

                <div className="flex flex-col gap-3 mt-5">
                  <Button 
                    disabled={form.formState.isSubmitting} 
                    className="text-base select-none" 
                    type="submit">
                    Save
                  </Button>

                  <Button
                    onClick={onClickSignOut}
                    variant="secondary"
                    disabled={form.formState.isSubmitting}
                    className="text-base select-none"
                    type="button">
                    Sign Out
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
    </Container>
  );
}