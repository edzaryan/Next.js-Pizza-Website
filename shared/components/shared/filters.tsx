"use client"
import { useFilters, useQueryFilters, useIngredients } from "@/shared/hooks";
import { RangeSlider, CheckboxFiltersGroup, Title } from "..";
import { Input } from "@/shared/components/ui";

interface Props {
    className?: string;
}

export const Filters = ({ className }: Props) => {
    const { ingredients, loading } = useIngredients();
    const filters = useFilters();

    useQueryFilters(filters);
    
    const ingredientsItems = ingredients.map(ingredient => ({
        value: String(ingredient.id),
        text: ingredient.name
    }));

    const updatePrices = (prices: number[]) => {
        filters.setPrices('priceFrom', prices[0]);
        filters.setPrices('priceTo', prices[1]);
    }

    return (
        <div className={className}>
            <Title text="Filter" size="sm" className="mb-5 font-bold" />

            <CheckboxFiltersGroup 
                title="Pizza Type"
                name="pizzaTypes"
                className="mt-5"
                onClickCheckbox={filters.setPizzaTypes}
                selected={filters.pizzaTypes}
                items={[
                    { text: "Thin", value: "1" },
                    { text: "Traditional", value: "2" },
                ]}
            />
            
            <CheckboxFiltersGroup 
                title="Sizes"
                name="sizes"
                className="mt-5"
                onClickCheckbox={filters.setSizes}
                selected={filters.sizes}
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
                        value={filters.prices.priceFrom ?? ""} 
                        onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
                    />
                    <Input 
                        type="number" 
                        placeholder="1000" 
                        min={100} 
                        max={1000} 
                        value={filters.prices.priceTo ?? ""} 
                        onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
                    />
                </div>

                <RangeSlider 
                    min={0} 
                    max={1000} 
                    step={10} 
                    value={[filters.prices.priceFrom || 0, filters.prices.priceTo || 1000]} 
                    onValueChange={updatePrices}
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
                onClickCheckbox={filters.setSelectedIngredients}
                selected={filters.selectedIngredients}
            />
        </div>
    );
};