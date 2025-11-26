import { z } from "zod";


export const passwordSchema = z.string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(50, { message: "Password cannot exceed 50 characters" });

export const emailSchema = z.string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" });

export const formLoginSchema = z.object({
    email: emailSchema,
    password: passwordSchema
});

export const formRegisterSchema = formLoginSchema
    .merge(
        z.object({
            fullName: z.string()
                .min(2, { message: "Full name must be at least 2 characters" })
                .max(50, { message: "Full name cannot exceed 50 characters" })
                .regex(/^[a-zA-Z\s]+$/, { message: "Full name can only contain letters and spaces" }),
            confirmPassword: z.string()
                .min(1, { message: "Please confirm your password" })
        })
    )
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords do not match. Please try again",
        path: ["confirmPassword"]
    });

export const formResetPasswordSchema = z.object({
    email: emailSchema
});


export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
export type TFormResetPasswordValues = z.infer<typeof formResetPasswordSchema>;