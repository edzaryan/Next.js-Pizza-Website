"use server";
import { CheckoutFormValues } from "@/shared/components";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { sendEmail } from "@/shared/lib";
import { cookies } from "next/headers";
import { PayOrderTemplate } from "@/shared/components";

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

        await sendEmail(
            data.email, 
            "Next Pizza / Pay for the order #" + order.id, 
            PayOrderTemplate({
                orderId: order.id,
                totalAmount: order.totalAmount,
                paymentUrl: "https://resend.com/api-keys"
            }));
    } catch (err) {
        console.log('[CreateOrder] Server error', err);
    }
}