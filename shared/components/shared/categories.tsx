"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store/store";
import { Category } from "@prisma/client";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface Props {
  items: Category[];
  className?: string;
}

export const Categories = ({ items, className }: Props) => {
  const activeId = useSelector((state: RootState) => state.category.activeId);

  return (
    <div
      className={cn(
        "inline-flex gap-1 bg-gray-50 p-1 h-13 rounded-2xl border border-gray-100",
        className
      )}
    >
      {items.map(({ name, id }) => (
        <Link
          key={id}
          className={cn(
            "flex items-center font-bold rounded-xl px-5 cursor-pointer",
            activeId === id &&
              "bg-white shadow-sm shadow-gray-200 text-primary"
          )}
          href={`#${name}`}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};
