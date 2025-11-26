"use client";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { ResetPasswordForm } from "./forms/reset-password-form";
import { RegisterForm } from "./forms/register-form";
import { LoginForm } from "./forms/login-form";
import { Button } from "@/shared/components";
import { signIn } from "next-auth/react";
import { useState } from "react";


type ModalType = "login" | "register" | "password-reset";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal = ({ open, onClose }: Props) => {
  const [type, setType] = useState<ModalType>("login");
  const isAuthMode = type === "login" || type === "register";

  const socialButtons = (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        className="gap-2 h-12 p-2 flex-1"
        onClick={() => signIn("github", { callbackUrl: "/", redirect: true })}
      >
        <img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
        GitHub
      </Button>

      <Button
        variant="secondary"
        className="gap-2 h-12 p-2 flex-1"
        onClick={() => signIn("google", { callbackUrl: "/", redirect: true })}
      >
        <img className="w-6 h-6" src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg" />
        Google
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        {type === "login" && <LoginForm onClose={onClose} />}
        {type === "register" && <RegisterForm onClose={() => setType("login")} />}
        {type === "password-reset" && <ResetPasswordForm onClose={() => setType("login")} />}

        <hr />

        {isAuthMode && socialButtons}

        <Button
          variant="outline"
          className="h-12"
          onClick={() => setType(type === "login" ? "register" : "login")}
        >
          {type === "login" ? "Register" : "Login"}
        </Button>

        {isAuthMode && (
          <p
            onClick={() => setType("password-reset")}
            className="text-blue-500 cursor-pointer"
          >
            Forgot Password?
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
