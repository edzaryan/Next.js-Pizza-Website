"use client";
import { cn } from "@/shared/lib/utils";

export type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
}

interface Props {
    className?: string;
    items: readonly Variant[];
    value?: Variant["value"];
    onClick?: (value: Variant["value"]) => void;
}

export const GroupVariants = ({ className, items, onClick, value }: Props) => {

    return (
        <div className={cn(className, "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none")}>
            {
                items.map(item => (
                    <button 
                        key={item.name} 
                        onClick={() => onClick?.(item.value)}
                        className={cn(
                            "flex items-center justify-center flex-1 cursor-pointer h-[30px] px-5 rounded-3xl transition-all duration-400 text-sm",
                            {
                                "bg-white shadow": item.value === value,
                                "text-gray-500 opacity-50 pointer-events-none": item.disabled,
                            }
                        )}
                    >
                        {item.name}
                    </button>
                ))
            }
        </div>
    )
}