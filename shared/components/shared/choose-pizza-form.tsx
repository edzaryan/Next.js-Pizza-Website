"use client"
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { IngredientItem, GroupVariants, Title, PizzaImage } from "..";
import { Ingredient, ProductItem } from "@prisma/client";
import { usePizzaOptions } from "@/shared/hooks";
import { getPizzaDetails } from "@/shared/lib";
import { cn } from "@/shared/lib/utils";
import { Button } from "../ui";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onSubmit: (itemId: number, ingredients: number[]) => void;
    loading?: boolean;
}

export const ChoosePizzaForm = ({ 
    name, 
    items, 
    imageUrl, 
    className, 
    ingredients, 
    onSubmit,
    loading
}: Props) => {
    const { size, type, setSize, setType, selectedIngredients, availableSizes, currentItemId, addIngredient } = 
        usePizzaOptions(items);

    const { totalPrice, textDetails } = 
        getPizzaDetails(type, size, items, ingredients, selectedIngredients);

    const handleClickAdd = () => {
        if (currentItemId) {
            onSubmit(currentItemId, Array.from(selectedIngredients));
        }
    }
    
    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                
                <div className="text-gray-400">{textDetails}</div>

                <GroupVariants 
                    items={availableSizes} 
                    value={String(size)} 
                    onClick={value => setSize(Number(value) as PizzaSize)} 
                    className="mt-5"
                />

                <GroupVariants 
                    items={pizzaTypes} 
                    value={String(type)} 
                    onClick={value => setType(Number(value) as PizzaType)} 
                    className="mt-2"
                />

                <div className="mt-5 bg-gray-50 rounded-md max-h-[420px] overflow-auto custom-scrollbar">
                    <div className="grid grid-cols-3 gap-2 p-4">
                        {ingredients.map(ingredient => (
                            <IngredientItem 
                                key={ingredient.id} 
                                {...ingredient}  
                                active={selectedIngredients.has(ingredient.id)}
                                onClick={() => addIngredient(ingredient.id)}
                            />
                        ))}
                    </div>
                </div>

                <Button 
                    onClick={handleClickAdd}
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
                    loading={loading}
                >
                    Add to cart {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}