"use client"
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title, Container } from ".";
import { deleteAccount, updateUserInfo } from "@/app/actions";
import { ProfileImageUploader } from "./form"
import { signOut } from "next-auth/react";
import { User } from "@prisma/client";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useState } from "react";
import { 
  AlertDialog, 
  AlertDialogTrigger, 
  AlertDialogContent, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogCancel, 
  AlertDialogAction 
} from "../ui/alert-dialog";

interface Props {
  data: User;
}

export function ProfileForm({ data }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
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

    const onClickSignOut = async () => {
      signOut({ callbackUrl: "/" });
    }

    const handleDeleteAccount = async () => {
      try {
        setIsDeleting(true);
        await deleteAccount();
        await onClickSignOut();
        toast.success("Your account has been deleted.");
      } catch (error) {
        toast.error("Failed to delete account.");
      } finally {
        setIsDeleting(false);
      }
    }

    const deleteAccountDialog = (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            loading={isDeleting}
            variant="destructive"
            className="w-full bg-primary hover:bg-primary/90 text-[15px]"
          >
            Delete Account
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account?</AlertDialogTitle>
            <AlertDialogDescription>
              This action is permanent and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-primary hover:bg-primary/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );

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

                <div className="flex flex-col gap-3">
                  <Button 
                    disabled={form.formState.isSubmitting} 
                    className="text-base select-none text-[15px]" 
                    type="submit">
                    Save
                  </Button>
                </div>

                <hr />

                { deleteAccountDialog }

                <Button
                  onClick={onClickSignOut}
                  variant="secondary"
                  disabled={form.formState.isSubmitting}
                  className="text-base select-none text-[15px]"
                  type="button">
                  Sign Out
                </Button>
              </form>
            </FormProvider>
          </div>
        </div>
    </Container>
  );
}

