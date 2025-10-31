"use client";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import { Category } from "@prisma/client";
import Link from "next/link";

interface Props {
    items: Category[];
    className?: string;
}

export const Categories = ({ items, className }: Props) => {
    const activeId = useCategoryStore((state) => state.activeId);

    return (
        <div className={cn("inline-flex gap-1 bg-gray-50 p-1 h-13 rounded-2xl border border-gray-100", className)}>
            {items.map(({ name, id }, index) => (
                <Link
                    className={cn(
                        "flex items-center font-bold rounded-xl px-5 cursor-pointer",
                        activeId === id && "bg-white shadow-sm shadow-gray-200 text-primary"
                    )}
                    href={`#${name}`}
                    key={index}>
                    {name}
                </Link>
            ))}
        </div>
    )
}