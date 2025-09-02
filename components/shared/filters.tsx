"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Title } from "./title";
import { Input } from "@/components/ui";
import { RangeSlider } from "./range-slider";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { useSet } from "react-use";
import qs from "qs";

interface Props {
    className?: string;
}

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}

interface QueryFilters extends PriceProps {
    pizzaTypes: string;
    sizes: string;
    ingredients: string;
}

export const Filters = ({ className }: Props) => {
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
    const router = useRouter();

    const { ingredients, loading, onAddId, selectedIngredients } = useFilterIngredients(
        searchParams.get("ingredients")?.split(",")
    );
    const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(
        searchParams.has("sizes") ? searchParams.get("sizes")?.split(",") : []));
    const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(
        searchParams.has("pizzaTypes") ? searchParams.get("pizzaTypes")?.split(",") : []));
    const [prices, setPrice] = useState<PriceProps>({
        priceFrom: Number(searchParams.get("priceFrom")) || undefined,
        priceTo: Number(searchParams.get("priceTo")) || undefined,
    });

    const ingredientsItems = ingredients.map(ingredient => ({
        value: String(ingredient.id),
        text: ingredient.name
    }));

    const updatePrice = (name: keyof PriceProps, value: number | undefined) => {
        setPrice({ ...prices, [name]: value });
    }

    useEffect(() => {
        const filters: any = {
            ...prices,
            pizzaTypes: Array.from(pizzaTypes),
            sizes: Array.from(sizes),
            ingredients: Array.from(selectedIngredients)
        };

        // Remove undefined values
        Object.keys(filters).forEach(key => {
            if (filters[key] === undefined) {
                delete filters[key];
            }
        });

        const query = qs.stringify(filters, { arrayFormat: "comma", encode: false });
        router.push(`?${query}`, { scroll: false });

    }, [prices, pizzaTypes, sizes, selectedIngredients, router]);

    return (
        <div className={className}>
            <Title text="Filter" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup 
                title="Pizza Type"
                name="pizzaTypes"
                className="mt-5"
                onClickCheckbox={togglePizzaTypes}
                selected={pizzaTypes}
                items={[
                    { text: "Thin", value: "1" },
                    { text: "Traditional", value: "2" },
                ]}
            />
            
            <CheckboxFiltersGroup 
                title="Sizes"
                name="sizes"
                className="mt-5"
                onClickCheckbox={toggleSizes}
                selected={sizes}
                items={[
                    { text: "20 sm", value: "20" },
                    { text: "30 sm", value: "30" },
                    { text: "40 sm", value: "40" },
                ]}
            />

            <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
                <p className="font-bold mb-3">Price range</p>
                <div className="flex gap-3 mb-5">
                    <Input 
                        type="number" 
                        placeholder="0" 
                        min={0} 
                        max={1000} 
                        value={prices.priceFrom ? String(prices.priceFrom) : ""} 
                        onChange={(e) => updatePrice("priceFrom", e.target.value ? Number(e.target.value) : undefined)}
                    />
                    <Input 
                        type="number" 
                        placeholder="1000" 
                        min={100} 
                        max={1000} 
                        value={prices.priceTo ? String(prices.priceTo) : ""} 
                        onChange={(e) => updatePrice("priceTo", e.target.value ? Number(e.target.value) : undefined)}
                    />
                </div>

                <RangeSlider 
                    min={0} 
                    max={1000} 
                    step={10} 
                    value={[prices.priceFrom || 0, prices.priceTo || 1000]} 
                    onValueChange={([priceFrom, priceTo]) => setPrice({ priceFrom, priceTo })}
                />
            </div>

            <CheckboxFiltersGroup 
                title="Ingredients"
                name="ingredients"
                className="mt-5"
                limit={6}
                loading={loading}
                defaultItems={ingredientsItems.slice(0, 6)}
                items={ingredientsItems}
                onClickCheckbox={onAddId}
                selected={selectedIngredients}
            />
        </div>
    );
};