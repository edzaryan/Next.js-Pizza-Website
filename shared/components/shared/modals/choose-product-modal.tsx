"use client"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/shared/components/ui/dialog";
import { ProductWithRelations } from "@/@types/prisma";
import { ProductForm } from "../product-form";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface Props {
    product: ProductWithRelations | null;
    className?: string;
}

export const ChooseProductModal = ({ className, product }: Props) => {
    const router = useRouter();

    if (!product) {
        return null;
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
                <ProductForm product={product} onSubmit={() => router.back()} />
            </DialogContent>
        </Dialog>
    )
}