"use server";
import { getUserSession } from "@/shared/lib/get-user-session";
import { CheckoutFormValues, VerificationUserTemplate } from "@/shared/components";
import { PayOrderTemplate } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { createPayment } from "@/shared/lib";
import { sendEmail } from "@/shared/lib";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { hashSync } from "bcrypt";


export async function createOrder(data: CheckoutFormValues) {
    try {
        const cartToken = (await cookies()).get("cartToken")?.value;

        if (!cartToken) {
            throw new Error("Cart token not found");
        }

        const userCart = await prisma.cart.findFirst({
            include: {
                user: true,
                items: {
                    include: {
                        ingredients: true,
                        productItem: {
                            include: {
                                product: true
                            }
                        }
                    }
                }
            },
            where: {
                token: cartToken
            }
        });

        if (!userCart) {
            throw new Error("Cart not found");
        }

        if (userCart?.totalAmount === 0) {
            throw new Error("Cart is empty");
        }

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
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        });

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        });

        // Fake payment
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
        console.log('[CreateOrder] Server error', err);
    }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try {
        const currentUser = await getUserSession();

        if (!currentUser) {
            throw new Error("User not authenticated");
        }

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
        console.log('[UpdateUserInfo] Server error', err);
        throw err;
    }
}

export async function getUserProfile() {
    try {
        const session = await getUserSession();

        if (!session) {
            return null;
        }

        const user = await prisma.user.findFirst({
            where: { id: Number(session?.id) }
        });

        return user;
    } catch (err) {
        console.log('[GetUserProfile] Server error', err);
        return null;
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error('Email not verified');
      }

      throw new Error('User already exists');
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10)
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      'Next Pizza / 📝 Registration Confirmation',
      VerificationUserTemplate({
        code,
      }),
    );
  } catch (err) {
    console.log('Error [CREATE_USER]', err);
    throw err;
  }
}