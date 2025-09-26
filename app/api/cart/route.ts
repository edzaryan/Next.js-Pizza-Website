import crypto from "crypto";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse, NextRequest } from "next/server";
import { findOrCreateCart } from "@/shared/lib/find-or-create-cart";
import { CreateCartItemValues } from "@/shared/services/dto/cart.dto";
import { updateCartTotalAmount } from "@/shared/lib/update-cart-total-amount";


export async function GET(req: NextRequest) {
    try {
      const token = req.cookies.get('cartToken')?.value;
  
      if (!token) {
        return NextResponse.json({ totalAmount: 0, items: [] });
      }
  
      const userCart = await prisma.cart.findFirst({
        where: {
          OR: [
            {
              token,
            },
          ],
        },
        include: {
          items: {
            orderBy: {
              createdAt: 'desc',
            },
            include: {
              productItem: {
                include: {
                  product: true,
                },
              },
              ingredients: true,
            },
          },
        },
      });
  
      return NextResponse.json(userCart);
    } catch (error) {
      console.log('[CART_GET] Server error', error);
      return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        let token = req.cookies.get("cartToken")?.value;

        if (!token) {
            token = crypto.randomUUID();
        }

        const userCart = await findOrCreateCart(token);

        const data = (await req.json()) as CreateCartItemValues;

        const existingCartItems = await prisma.cartItem.findMany({
            where: {
                cartId: userCart.id,
                productItemId: data.productItemId,
            },
            include: {
                ingredients: true
            }
        });

        const findCartItem = existingCartItems.find(item => {
            const existingIngredientIds = item.ingredients.map(ing => ing.id).sort();
            const newIngredientIds = (data.ingredients || []).sort();
            
            return existingIngredientIds.length === newIngredientIds.length &&
                   existingIngredientIds.every((id, index) => id === newIngredientIds[index]);
        });

        if (findCartItem) {
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
                    ingredients: {
                        connect: data.ingredients?.map(id => ({ id })) 
                    }
                }
            });
        }

        const updatedUserCart = await updateCartTotalAmount(token);

        const response = NextResponse.json(updatedUserCart);
        response.cookies.set("cartToken", token);
        return response;
    } catch (error) {
        return NextResponse.json({ messsage: "Internal server error: Cart fetching failed" }, { status: 500 });
    }
}