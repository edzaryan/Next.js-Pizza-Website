"use client";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaSizes, pizzaTypes, mapPizzaType } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { useSet } from "react-use";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm = ({ className, imageUrl, name, ingredients, items, onClickAddCart }: Props) => {
    const [size, setSize] = useState<PizzaSize>(20);
    const [type, setType] = useState<PizzaType>(1);
    const [selectedIngredients, { toggle: addIngredient }] = useSet(new Set<number>([]));
    
    const pizzaPrice = items
        .find(item => item.pizzaType === type && item.size === size)?.price || 0;
    const totalIngredientsPrice = ingredients
        .filter(ingredient => selectedIngredients.has(ingredient.id))
        .reduce((acc, ingredient) => acc + ingredient.price, 0);
    const totalPrice = pizzaPrice + totalIngredientsPrice;
    const textDetails = `${size} cm, ${mapPizzaType[type]} pizza`;

    const filteredPizzasByType = items.filter(item => item.pizzaType === type);
    const availablePizzaSizes = pizzaSizes.map(item => ({
        name: item.name,
        value: item.value,
        disabled: !filteredPizzasByType.some(pizza => Number(pizza.size) === Number(item.value))
    }));

    useEffect(() => {
        const isAvailableSize = availablePizzaSizes?.find(
            item => Number(item.value) === size && !item.disabled
        );
        const availableSize = availablePizzaSizes?.find(item => !item.disabled);

        if (!isAvailableSize && availableSize) {
            setSize(Number(availableSize.value) as PizzaSize);
        }
    }, [type]);

    const handleClickAdd = () => {
        onClickAddCart?.();
    }
    
    return (
        <div className={cn(className, "flex flex-1")}>
            <PizzaImage imageUrl={imageUrl} size={size} />

            <div className="w-[490px] bg-[#f7f6f5] p-7">
                <Title text={name} size="md" className="font-extrabold mb-1" />
                
                <div className="text-gray-400">{textDetails}</div>

                <GroupVariants 
                    items={availablePizzaSizes} 
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

                <div className="mt-5 bg-gray-50 rounded-md max-h-[420px] overflow-auto scrollbar">
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
                    className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
                    Add to cart {totalPrice} ₽
                </Button>
            </div>
        </div>
    )
}