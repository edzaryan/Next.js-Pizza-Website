"use client"
import { FilterCheckbox, FilterCheckboxProps } from "./filter-checkbox";
import { Input, Skeleton } from "../ui";
import { useState } from "react";

type Item = FilterCheckboxProps;

interface Props {
    items: Item[];
    title: string;
    limit?: number;
    loading?: boolean;
    className?: string;
    defaultItems?: Item[];
    defaultValue?: string[];
    selected?: Set<string>;
    onClickCheckbox?: (id: string) => void;
    searchInputPlaceholder?: string;
    onChange?: (values: string[]) => void;
    name?: string;
}

export const CheckboxFiltersGroup = ({ 
    items,
    title,  
    onChange, 
    name,
    className,
    loading,
    limit = 5,
    defaultItems,  
    defaultValue,
    selected,
    onClickCheckbox,
    searchInputPlaceholder = "Search..."
}: Props) => {
    const [showAll, setShowAll] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const list = showAll 
        ? items.filter(item => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
        : (defaultItems || items).slice(0, limit);

    const onChangeSearchInput = (value: string) => {
        setSearchValue(value);
    }

    if (loading) {
        return (
            <div className={className}>
                <p className="font-bold mb-5">{title}</p>
                
                <div className="space-y-[16px]">
                    {Array.from({ length: limit }).map((_, index) => (
                        <Skeleton key={index} className="h-[24px] w-[250px] rounded-3xl" />
                    ))}
                    <Skeleton className="h-[24px] w-[90px] rounded-3xl" />
                </div>
            </div>
        )
    }

    return (
        <div className={className}>
            <p className="font-bold mb-5">{title}</p>

            {showAll && (
                <div className="mb-5">
                    <Input 
                        onChange={(e) => onChangeSearchInput(e.target.value)}
                        placeholder={searchInputPlaceholder} 
                    />
                </div>
            )}

            <div className="custom-scrollbar flex flex-col gap-4 max-h-96 pr-2 overflow-auto">
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        endAdornment={item.endAdornment}
                        checked={selected?.has(item.value)}
                        onCheckedChange={() => onClickCheckbox?.(item.value)}
                        name={name}
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