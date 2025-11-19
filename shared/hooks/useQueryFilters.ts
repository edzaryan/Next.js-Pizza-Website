import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { Filters } from "./useFilters";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
    const router = useRouter();
    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        const params: any = {
            ...filters.prices,
            pizzaTypes: Array.from(filters.pizzaTypes),
            sizes: Array.from(filters.sizes),
            ingredients: Array.from(filters.selectedIngredients)
        };

        // Remove empty arrays
        Object.keys(params).forEach((key) => {
            if (Array.isArray(params[key]) && params[key].length === 0) {
                delete params[key];
            }
        });

        const query = qs.stringify(params, { 
            arrayFormat: "comma", encode: false 
        });

        router.push(`?${query}`, { scroll: false });
    }, [
        filters.prices.priceFrom,
        filters.prices.priceTo,
        filters.pizzaTypes,
        filters.sizes,
        filters.selectedIngredients,
        router
    ]);
}