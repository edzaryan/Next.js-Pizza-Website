"use client"
import { AppDispatch, RootState } from "@/shared/store/store";
import { ChoosePizzaForm, ChooseProductForm } from ".";
import { ProductWithRelations } from "@/@types/prisma";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem } from "@/shared/store/cartSlice";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ProductForm = ({ product, onSubmit }: Props) => {
  const firstItem = product?.items[0];
  const dispatch = useDispatch<AppDispatch>();
  const isPizzaForm = Boolean(firstItem?.pizzaType);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const onHandleSubmit = async (productItemId?: number, ingredients?: number[]) => {
    const itemId = productItemId || firstItem?.id;

    if (!itemId) {
      toast.error("Product not available");
      return;
    }

    try {
      await dispatch(
        addCartItem({
          productItemId: itemId,
          ingredients,
        })
      ).unwrap(); // unwraps the thunk promise so we can catch errors

      toast.success(`${product.name} added to cart`);
      onSubmit?.();
    } catch (error) {
      toast.error(`Failed to add ${product.name} to cart`);
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        {...product}
        onSubmit={onHandleSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      {...product}
      onSubmit={() => onHandleSubmit()}
      price={firstItem?.price || 0}
      loading={loading}
    />
  );
};
