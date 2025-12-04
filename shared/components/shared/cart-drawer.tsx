"use client";
import { Sheet, SheetTrigger, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetClose } from "../ui/sheet";
import { updateItemQuantity, removeCartItem } from "@/shared/store/cartSlice";
import { PizzaType, PizzaSize } from "@/shared/constants/pizza";
import { RootState, AppDispatch } from "@/shared/store/store";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Title } from ".";


export const CartDrawer = ({ children }: PropsWithChildren) => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalAmount, items } = useSelector((state: RootState) => state.cart);
  const [redirect, setRedirect] = useState(false);

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    dispatch(updateItemQuantity({ id, quantity: newQuantity }));
  }

  const onClickRemoveButton = (id: number) => {
    dispatch(removeCartItem(id));
  }

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        className="flex flex-col justify-between pb-0 bg-[#f4f1ee]"
        aria-describedby={undefined}
      >
        {totalAmount > 0 && (
          <SheetHeader>
            <SheetTitle>
              Your Cart <span className="font-bold">{items.length} items</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!totalAmount && (
          <div className="flex flex-col h-full items-center justify-center w-72 mx-auto">
            <Image
              src="/assets/images/empty-box.png"
              alt="cart-empty"
              width={120}
              height={120}
            />
            <Title
              size="sm"
              text="Your cart is empty"
              className="text-center font-bold my-2"
            />
            <p className="text-center text-neutral-500 mb-5">
              Your cart is empty. Please add some items to your cart.
            </p>
            <SheetClose>
              <Button className="w-56 h-12 text-base" size="lg">
                <ArrowLeft className="w-5 mr-2" />
                Back to Home
              </Button>
            </SheetClose>
          </div>
        )}

        {totalAmount > 0 && (
          <>
            <div className="mt-5 overflow-auto flex-1">
              {items.map((item) => (
                <div key={item.id} className="mb-2">
                  <CartDrawerItem
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={getCartItemDetails(
                      item.ingredients,
                      item.pizzaType as PizzaType,
                      item.pizzaSize as PizzaSize
                    )}
                    name={item.name}
                    disabled={item.disabled}
                    price={item.price}
                    quantity={item.quantity}
                    onClickCountButton={(type) =>
                      onClickCountButton(item.id, item.quantity, type)
                    }
                    onClickRemoveButton={() => onClickRemoveButton(item.id)}
                  />
                </div>
              ))}
            </div>

            <SheetFooter className="p-8 bg-white">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Total
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-lg">{totalAmount} ₽</span>
              </div>

              <Link href="/checkout">
                <Button
                  onClick={() => setRedirect(true)}
                  loading={redirect}
                  type="submit"
                  className="w-full h-12 text-base"
                >
                  Place Order
                  <ArrowRight className="w-5 ml-2" />
                </Button>
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
