import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { CircleCheck } from "lucide-react";

interface Props {
    className?: string;
    name: string;
    price: number;
    imageUrl: string;
    onClick?: () => void;
    active?: boolean;
}

export const IngredientItem = ({ className, name, price, imageUrl, onClick, active }: Props) => {
    return (
        <div 
            className={cn(
                'flex items-center flex-col p-1 rounded-xl text-center relative cursor-pointer shadow-sm bg-white',
                { 'border border-primary' : active },
                className)} 
            onClick={onClick}
        >
            {active && <CircleCheck className="absolute top-2 right-2 text-primary" />}
            <Image width={110} height={110} src={imageUrl} alt={name} />
            <div className="text-xs mb-1">{name}</div>
            <div className="font-bold">{price} ₽</div>
        </div>
    )
}