import { useEffect, useState } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";
import { useSet } from "react-use";

interface ReturnProps {
    ingredients: Ingredient[];
    loading: boolean;
    selectedIngredients: Set<string>;
    onAddId: (id: string) => void;
}

export const useFilterIngredients = (): ReturnProps => {
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState(true);
    const [set, { toggle }] = useSet(new Set<string>([]));

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const ingredients = await Api.ingredients.getAllIngredients();
                setIngredients(ingredients);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        
        fetchIngredients();
    }, []);

    return { ingredients, loading, onAddId: toggle, selectedIngredients: set };
}