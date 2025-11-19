import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import crypto from "crypto";


export async function GET(req: NextRequest) {
    try {
      const token = req.cookies.get('cartToken')?.value;
  
      if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] });
      }
  
      const userCart = await prisma.cart.findFirst({
        where: { token },
        include: {
          items: {
            orderBy: { createdAt: 'desc' },
            include: {
              productItem: {
                include: { product: true }
              },
              ingredients: true,
            },
          },
        },
      });
  
      return NextResponse.json(userCart || { totalAmount: 0, items: [] });
    } catch (error) {
      console.log('[CART_GET] Server error', error);
      return NextResponse.json({ message: 'Failed to fetch cart' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);
    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productItemId: data.productItemId,
      },
      include: { ingredients: true }
    });

    const ingredientIds = data.ingredients?.sort() || [];
    const hasExactMatch = findCartItem && 
      findCartItem.ingredients.length === ingredientIds.length &&
      findCartItem.ingredients.every(ing => ingredientIds.includes(ing.id));

    if (hasExactMatch) {
      await prisma.cartItem.update({
        where: { id: findCartItem.id },
        data: { quantity: findCartItem.quantity + 1 }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productItemId: data.productItemId,
          quantity: 1,
          ingredients: { connect: ingredientIds.map(id => ({ id })) }
        }
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);
    const resp = NextResponse.json(updatedUserCart);
    resp.cookies.set('cartToken', token);
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Failed to create cart item' }, { status: 500 });
  }
}