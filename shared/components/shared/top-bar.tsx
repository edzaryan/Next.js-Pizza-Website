import { Container, Categories, SortPopup } from ".";
import { Category } from "@prisma/client";
import { cn } from "@/shared/lib/utils";

interface Props {
    categories: Category[];
    className?: string;
}

export const TopBar = ({ categories, className }: Props) => {
    return (
        <div className={cn(
            "sticky top-0 bg-white py-4 shadow-lg shadow-black/5 z-10",
            className
        )}>
            <Container className="flex items-center justify-between">
                <Categories items={categories} />
                <SortPopup />
            </Container>
        </div>
    )
}