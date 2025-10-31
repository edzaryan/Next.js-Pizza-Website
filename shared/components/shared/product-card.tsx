"use client";
import Link from "next/link";
import Image from "next/image";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { Ingredient } from "@prisma/client";

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string;
    ingredients: Ingredient[];
}

export const ProductCard = ({ id, name, price, imageUrl, className, ingredients }: Props) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className="group grid place-items-center rounded-xl h-[303px] bg-secondary overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        width={230}
                        height={230}
                        priority
                        className="transform transition-transform duration-200 ease-out group-hover:translate-y-[4px]"
                        draggable={false}
                    />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <div className="text-sm text-gray-700">
                    {ingredients.map(ingredient => ingredient.name).join(", ")}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-[16px] font-bold">
                        From <span>{price} ₽</span>
                    </span>
                    <Button variant="secondary" className="text-base font-[500] text-[#f97316] gap-1">
                        <Plus className="size-5" />
                        <span className="rounded text-[16px]">
                            Add
                        </span>
                    </Button>
                </div>
            </Link>
        </div>
    )
}