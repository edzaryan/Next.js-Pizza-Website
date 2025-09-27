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
                <div className="flex justify-center p-6 bg-secondary rounded-xl h-[260px]">
                    <Image 
                        src={imageUrl} 
                        alt={name} 
                        width={215} 
                        height={215}
                        style={{ width: 'auto', height: 'auto' }}
                    />
                </div>

                <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />

                <p className="text-sm text-gray-400">
                    {
                        ingredients.map(ingredient => ingredient.name).join(', ')
                    }
                </p>

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