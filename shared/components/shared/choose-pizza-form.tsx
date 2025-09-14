"use client";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaSizes, pizzaTypes, mapPizzaType } from "@/shared/constants/pizza";
import { useState } from "react";
import { Ingredient } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items?: any[];
    onClickAdd?: VoidFunction;
}

export const ChoosePizzaForm = ({ className, imageUrl, name, ingredients, items }: Props) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));

    const textDetails = `${size} cm, ${mapPizzaType[type]} pizza`;
    const totalPrice = 350;
    
    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                
                <div className="text-gray-400">{textDetails}</div>

                <GroupVariants 
                    items={pizzaSizes} 
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

                <div className="mt-5 p-5 bg-gray-50 rounded-md h-[420px] overflow-auto scrollbar">
                    <div className="grid grid-cols-3 gap-3">
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

                <Button className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}