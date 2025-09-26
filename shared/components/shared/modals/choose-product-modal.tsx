"use client";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { ChooseProductForm } from "../choose-product-form";
import { useCartStore } from "@/shared/store/cart";

interface Props {
    product: ProductWithRelations | null;
    className?: string;
}

export const ChooseProductModal = ({ className, product }: Props) => {
    const router = useRouter();
    const firstItem = product?.items[0];
    const isPizzaForm = Boolean(firstItem?.pizzaType);
    const addCartItem = useCartStore((state) => state.addCartItem);

    if (!product) {
        return null;
    }

    const onAddProduct = () => {
        addCartItem({
            productItemId: firstItem?.id,
        });
    }

    const onAddPizza = (productItemId: number, ingredients: number[]) => {
        addCartItem({
            productItemId,
            ingredients
        });
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
                        onSubmit={onAddPizza} />
                ) : (
                    <ChooseProductForm 
                        imageUrl={product.imageUrl} 
                        name={product.name} 
                        onSubmit={onAddProduct}
                        price={firstItem?.price || 0}
                    />
                )}
            </DialogContent>
        </Dialog>
    )
}