"use client";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store/cart";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import toast from "react-hot-toast";

interface Props {
    product: ProductWithRelations | null;
    className?: string;
}

export const ChooseProductModal = ({ className, product }: Props) => {
    const router = useRouter();
    const firstItem = product?.items[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType);
    const addCartItem = useCartStore((state) => state.addCartItem);
    const loading = useCartStore((state) => state.loading);

    if (!product) {
        return null;
    }

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
            router.back();
        } catch (error) {
            console.error(error);
            const errorMessage = `Failed to add ${product.name} to cart`;
            toast.error(errorMessage);
        }
    }

    return (
        <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
            <DialogContent 
                className={cn(
                    "p-0 !w-[1060px] !max-w-[1060px] min-h-[520px] bg-white overflow-hidden", 
                    className
                )}>
                <DialogTitle className="sr-only">{product.name}</DialogTitle>
                <DialogDescription className="sr-only">
                    Choose your preferred size and add any extras to customize your order.
                </DialogDescription>
                {isPizzaForm ? (
                    <ChoosePizzaForm 
                        {...product} 
                        onSubmit={onSubmit} 
                        loading={loading}
                        />
                ) : (
                    <ChooseProductForm 
                        {...product}
                        onSubmit={() => onSubmit()}
                        price={firstItem?.price || 0}
                        loading={loading}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}