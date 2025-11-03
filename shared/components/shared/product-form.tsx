"use client";
import { ChoosePizzaForm, ChooseProductForm } from ".";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
    product: ProductWithRelations;
    onSubmit?: VoidFunction;
}

export const ProductForm = ({ product, onSubmit }: Props) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);
    const firstItem = product?.items[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType);

    const onHandleSubmit = async (productItemId?: number, ingredients?: number[]) => {
        const itemId = productItemId || firstItem?.id;
        
        if (!itemId) {
            toast.error("Product not available");
            return;
        }

        try {
            await addCartItem({
                productItemId: itemId,
                ingredients
            });
            
            const successMessage = `${product.name} added to cart`;
            toast.success(successMessage);
            onSubmit?.();
        } catch (error) {
            const errorMessage = `Failed to add ${product.name} to cart`;
            toast.error(errorMessage);
        }
    }

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm 
                {...product} 
                onSubmit={onHandleSubmit} 
                loading={loading} 
            />
        )
    }

    return (
        <ChooseProductForm 
            {...product}
            onSubmit={() => onHandleSubmit()}
            price={firstItem?.price || 0}
            loading={loading}
        />
    )
}