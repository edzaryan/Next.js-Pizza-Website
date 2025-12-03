"use client"
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Button } from "../ui";
import { Title } from ".";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    price: number;
    onSubmit?: VoidFunction;
    loading?: boolean;
}

export const ChooseProductForm = ({ 
    className, 
    imageUrl, 
    price, 
    name, 
    onSubmit, 
    loading 
}: Props) => {
    return (
        <div className={cn(className, "flex flex-1")}>
            <div className="flex items-center justify-center flex-1 relative w-full">
                <Image 
                    src={imageUrl} 
                    width={350}
                    height={350}
                    className="relative left-2 top-2 transition-all z-10 duration-300"
                    alt={name} 
                />
            </div>

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                <Button 
                    onClick={onSubmit} 
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    loading={loading}
                >
                    Add to cart {price} ₽
                </Button>
            </div>
        </div>
    )
}