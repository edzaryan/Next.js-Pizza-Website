"use server";

import { prisma } from "@/prisma/prisma-client";
import { CheckoutFormValues } from "@/shared/components";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: CheckoutFormValues) {
    const token = "123";

    await prisma.order.create({
        data: {
            token,
            totalAmount: 1500,
            status: OrderStatus.PENDING,
            items: [],
            fullName: data.firstName + " " + data.lastName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            comment: data.comment
        }
    });
}