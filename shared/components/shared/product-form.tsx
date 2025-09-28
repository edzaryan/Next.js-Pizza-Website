"use client";
import { ChoosePizzaForm, ChooseProductForm } from "@/shared/components/shared";
import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store/cart";
import toast from "react-hot-toast";

interface Props {
    className?: string;
    product: ProductWithRelations;
}

export const ProductForm = ({ product, className }: Props) => {
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);
    const firstItem = product?.items[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType);

    const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
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
        } catch (error) {
            const errorMessage = `Failed to add ${product.name} to cart`;
            toast.error(errorMessage);
        }
    }

    if (isPizzaForm) {
        return (
            <ChoosePizzaForm 
                {...product} 
                onSubmit={onSubmit} 
                loading={loading} 
            />
        )
    }

    return (
        <ChooseProductForm 
            {...product}
            onSubmit={() => onSubmit()}
            price={firstItem?.price || 0}
            loading={loading}
        />
    )
}