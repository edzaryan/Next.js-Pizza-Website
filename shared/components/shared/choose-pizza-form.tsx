"use client";
import { cn } from "@/shared/lib/utils";
import { PizzaImage } from "./pizza-image";
import { Title } from "./title";
import { Button } from "../ui";
import { GroupVariants } from "./group-variants";
import { PizzaSize, PizzaType, pizzaTypes } from "@/shared/constants/pizza";
import { Ingredient, ProductItem } from "@prisma/client";
import { IngredientItem } from "./ingredient-item";
import { usePizzaOptions } from "../../hooks";
import { getPizzaDetails } from "../../lib/get-pizza-details";

interface Props {
    imageUrl: string;
    name: string;
    className?: string;
    ingredients: Ingredient[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
}

export const ChoosePizzaForm = ({ className, imageUrl, name, ingredients, items, onClickAddCart }: Props) => {
    const { 
        size, 
        type, 
        setSize, 
        setType, 
        selectedIngredients, 
        availableSizes, 
        addIngredient
    } = usePizzaOptions(items);

    const { 
        totalPrice, 
        textDetails 
    } = getPizzaDetails(type, size, items, ingredients, selectedIngredients);

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