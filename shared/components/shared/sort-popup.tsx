import { ArrowUpDown } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
    className?: string;
}

export const SortPopup = ({ className }: Props) => {
    return (
        <div className={cn(
            "inline-flex items-center gap-1 bg-gray-50 px-5 h-13 rounded-2xl cursor-pointer border border-gray-100",
            className
        )}>
            <ArrowUpDown size={16} />
            <b>Sort by:</b>
            <b className="text-primary">Popularity</b>
        </div>
    )
}