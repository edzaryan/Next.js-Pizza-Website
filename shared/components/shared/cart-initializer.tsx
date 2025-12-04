"use client"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/shared/store/store";
import { fetchCartItems } from "@/shared/store/cartSlice";


export function CartInitializer() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  return null;
}
