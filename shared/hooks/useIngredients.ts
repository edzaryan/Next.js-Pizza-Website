import { useState } from "react";
import { useEffect } from "react";
import { Ingredient } from "@prisma/client";
import { Api } from "@/shared/services/api-client";

export const useIngredients = () => {
    const [loading, setLoading] = useState(true);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

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

    return { 
        ingredients, 
        loading
    };
}