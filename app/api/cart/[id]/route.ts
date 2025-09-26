import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: paramId } = await params;
        const id = Number(paramId);
        const data = (await req.json()) as { quantity: number };
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id }
        });

        if (!cartItem) {
            return NextResponse.json({ message: "Cart item not found" });
        }

        await prisma.cartItem.update({
            where: { id },
            data: { quantity: data.quantity }
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error: Cart updating failed" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id: paramId } = await params;
        const id = Number(paramId);
        const token = req.cookies.get("cartToken")?.value;

        if (!token) {
            return NextResponse.json({ message: "Cart token not found" });
        }

        const cartItem = await prisma.cartItem.findFirst({
            where: { id }
        });

        if (!cartItem) {
            return NextResponse.json({ error: "Cart item not found" });
        }

        await prisma.cartItem.delete({
            where: { id }
        });

        const updatedUserCart = await updateCartTotalAmount(token);

        return NextResponse.json(updatedUserCart);
    } catch (error) {
        return NextResponse.json({ message: "Internal server error: Cart deleting failed" }, { status: 500 });
    }
}