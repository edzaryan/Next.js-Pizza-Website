import { fetchCartItems, addCartItem, removeCartItem, updateItemQuantity } from "@/shared/store/cartSlice";
import { AppDispatch, RootState } from "@/shared/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount, loading, error } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return {
    items,
    totalAmount,
    loading,
    error,
    fetchCartItems: () => dispatch(fetchCartItems()),
    addCartItem: (values: any) => dispatch(addCartItem(values)),
    removeCartItem: (id: number) => dispatch(removeCartItem(id)),
    updateItemQuantity: (id: number, quantity: number) => dispatch(updateItemQuantity({ id, quantity })),
  }
}
