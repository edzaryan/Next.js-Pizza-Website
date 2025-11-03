"use client";
import { useCategoryStore } from "@/shared/store/category";
import { ProductWithRelations } from "@/@types/prisma";
import { useIntersection } from "react-use";
import { useEffect, useRef } from "react";
import { cn } from "@/shared/lib/utils";
import { Title, ProductCard } from ".";

interface Props {
    title: string;
    items: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList = ({ 
    title, 
    items, 
    categoryId, 
    className, 
    listClassName 
}: Props) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef<HTMLDivElement>(null);
    const intersection = useIntersection(intersectionRef as any, {
        threshold: 0.4,
    });

    useEffect(() => {
        if (intersection?.isIntersecting) {
            setActiveCategoryId(categoryId);
        }
    }, [intersection?.isIntersecting, categoryId, setActiveCategoryId]);

    return (
        <div className={className} id={title} ref={intersectionRef}>
           <Title text={title} size="lg" className="font-extrabold py-5" />

           <div className={cn("grid grid-cols-3 gap-5", listClassName)}>
                {items.map((product, i) => (
                    <ProductCard 
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                        ingredients={product.ingredients}
                    />
                ))}
           </div>
        </div>
    )
}