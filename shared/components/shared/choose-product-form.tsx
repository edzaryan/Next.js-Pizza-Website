"use client";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { Title } from "./title";
import { Button } from "../ui";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    onClickAdd?: VoidFunction;
}

export const ChooseProductForm = ({ className, imageUrl, name, onClickAdd }: Props) => {
    const textDetails = "30cm, lah blhufh ufhrfrjf rfrfrf";
    const totalPrice = 350;
    
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
                <p className="text-gray-400">{textDetails}</p>
                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}