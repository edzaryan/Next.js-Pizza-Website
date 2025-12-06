"use client"
import { useIntersection } from "@/shared/hooks/useIntersection";
import { setActiveId } from "@/shared/store/categorySlice";
import { ProductWithRelations } from "@/@types/prisma";
import { AppDispatch } from "@/shared/store/store";
import { useDispatch } from "react-redux";
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
  listClassName,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const intersectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      dispatch(setActiveId(categoryId));
    }
  }, [intersection?.isIntersecting, categoryId, dispatch]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold py-5" />

      <div className={cn("grid grid-cols-3 gap-5", listClassName)}>
        {items.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            name={product.name}
            price={product.items[0]?.price ?? 0} 
            imageUrl={product.imageUrl}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
