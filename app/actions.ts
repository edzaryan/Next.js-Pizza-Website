"use server"
import { CheckoutFormValues, VerificationUserTemplate, ResetPasswordEmailTemplate } from "@/shared/components";
import { getUserSession } from "@/shared/lib/get-user-session";
import { PayOrderTemplate } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { createPayment } from "@/shared/lib";
import { sendEmail } from "@/shared/lib";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { hashSync } from "bcrypt";
import { nanoid } from "nanoid";
import { Api } from "@/shared/services/api-client";
import cloudinary from "@/shared/lib/cloudinary";


export async function createOrder(data: CheckoutFormValues) {
    try {
        const cartToken = (await cookies()).get("cartToken")?.value;

        if (!cartToken) throw new Error("Cart token not found");

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: { product: true }
                        }
                    }
                }
            },
            where: { token: cartToken }
        });

        if (!userCart) throw new Error("Cart not found");
        if (userCart.totalAmount === 0) throw new Error("Cart is empty");

        const order = await prisma.order.create({
            data: {
                token: cartToken,
                fullName: data.firstName + " " + data.lastName,
                email: data.email,
                phone: data.phone,
                address: data.address,
                comment: data.comment,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items)
            }
        });

        await prisma.cart.update({
            where: { id: userCart.id },
            data: { totalAmount: 0 }
        });

        await prisma.cartItem.deleteMany({ where: { cartId: userCart.id } });

        const paymentUrl = await createPayment();

        await sendEmail(
            data.email,
            "Next Pizza / Pay for the order #" + order.id,
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl
            })
        );

        return paymentUrl;
    } catch (err) {
        console.log("[CreateOrder] Server error", err);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();
        if (!currentUser) throw new Error("User not authenticated");

        const findUser = await prisma.user.findFirst({
            where: { id: Number(currentUser.id) }
        });

        await prisma.user.update({
            where: { id: Number(currentUser.id) },
            data: {
                email: body.email,
                fullName: body.fullName,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password
            }
        });
    } catch (err) {
        console.log("[UpdateUserInfo] Server error", err);
        throw err;
    }
}

export async function getUserProfile() {
    try {
        const session = await getUserSession();
        if (!session) return null;

        const user = await prisma.user.findFirst({
            where: { id: Number(session.id) }
        });

        return user;
    } catch (err) {
        console.log("[GetUserProfile] Server error", err);
        return null;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try {
        const user = await prisma.user.findFirst({
            where: { email: body.email }
        });

        if (user && !user.verified) {
            await prisma.verificationCode.deleteMany({
                where: { userId: user.id }
            });

            const code = Math.floor(100000 + Math.random() * 900000).toString();

            await prisma.verificationCode.create({
                data: { code, userId: user.id }
            });

            await sendEmail(
                user.email,
                "Verify Your Next Pizza Account",
                VerificationUserTemplate({ code })
            );

            return;
        }

        if (user && user.verified) {
            throw new Error("This email is already registered. Please log in.");
        }

        const createdUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10)
            }
        });

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        await prisma.verificationCode.create({
            data: { code, userId: createdUser.id }
        });

        await sendEmail(
            createdUser.email,
            "Verify Your Next Pizza Account",
            VerificationUserTemplate({ code })
        );
    } catch (err) {
        console.log("Error [CREATE_USER]", err);
        throw err;
    }
}

export async function verifyUser(code: string) {
    const record = await prisma.verificationCode.findFirst({
        where: { code },
        include: { user: true }
    });

    if (!record) throw new Error("Invalid verification code");

    await prisma.user.update({
        where: { id: record.userId },
        data: { verified: new Date() }
    });

    await prisma.verificationCode.delete({
        where: { userId: record.userId }
    });

    return true;
}

export async function requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) return;
    if (!user.verified) return;

    await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id }
    });

    await prisma.verificationCode.deleteMany({
        where: { userId: user.id }
    });

    const token = nanoid(40);

    await prisma.passwordResetToken.create({
        data: { userId: user.id, token }
    });

    await sendEmail(
        user.email,
        "Reset Your Next Pizza Password",
        ResetPasswordEmailTemplate({ token })
    );
}

export async function resetPasswordWithCode(token: string, newPassword: string) {
    const existingToken = await prisma.passwordResetToken.findUnique({
        where: { token },
        include: { user: true }
    });

    if (!existingToken) throw new Error("Invalid or expired reset link");

    const isExpired =
        Date.now() - existingToken.createdAt.getTime() > 10 * 60 * 1000;

    if (isExpired) throw new Error("Reset link has expired");
    if (!existingToken.user.verified) throw new Error("This account must be verified first.");

    await prisma.user.update({
        where: { id: existingToken.userId },
        data: { password: hashSync(newPassword, 10) }
    });

    await prisma.passwordResetToken.delete({
        where: { id: existingToken.id }
    });
}

export async function deleteAccount() {
  try {
    const session = await getUserSession();
    if (!session) throw new Error("User not authenticated");

    const userId = Number(session.id);

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) throw new Error("User not found");

    if (user.imageId) {
        await deleteCloudinaryImage(user.imageId);
    }

    await prisma.verificationCode.deleteMany({
      where: { userId }
    });

    await prisma.passwordResetToken.deleteMany({
      where: { userId }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cart: { userId }
      }
    });

    await prisma.cart.deleteMany({
      where: { userId }
    });

    await prisma.order.updateMany({
      where: { userId },
      data: { userId: null }
    });

    await prisma.user.delete({
      where: { id: userId }
    });

    return true;
  } catch (err) {
    console.log("[DeleteAccount] Server error", err);
    throw err;
  }
}

export async function deleteCloudinaryImage(publicId: string) {
    try {
        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        console.log("Cloudinary delete error:", error);
    }
}