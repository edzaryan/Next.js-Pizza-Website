"use client" ;
import { useState } from "react";
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input } from "@/components/ui/input";

type Item = FilterCheckboxProps;

interface Props {
    items: Item[];
    title: string;
    limit?: number;
    className?: string;
    defaultItems: Item[];
    defaultValue?: string[];
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
}

export const CheckboxFiltersGroup = ({ 
    items,
    title,  
    onChange, 
    className,
    limit = 5,
    defaultItems,  
    defaultValue,
    searchInputPlaceholder = "Search..."
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const list = showAll 
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLowerCase())) 
        : defaultItems.slice(0, limit);

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }

    return (
        <div className={className}>
            <p className="font-bold mb-5">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input 
                        onChange={(e) => onChangeSearchInput(e.target.value)}
                        placeholder={searchInputPlaceholder} 
                        className="bg-gray-50 border-none" 
                    />
                </div>
            )}

            <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={false}
                        onCheckedChange={(id) => console.log(id)}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
                    <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
                        {showAll ? "Show less" : "Show more"}   
                    </button>
                </div>
            )}
        </div>
    )
}