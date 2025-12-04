import { prisma } from "@/prisma/prisma-client";


export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    sizes?: string;
    pizzaTypes?: string;
    ingredients?: string;
    priceFrom?: string;
    priceTo?: string;
}

export const findPizzas = async(params: GetSearchParams) => {
    const sizes = params.sizes?.split(',').map(Number).filter(Boolean);
    const pizzaTypes = params.pizzaTypes?.split(',').map(Number).filter(Boolean);
    const ingredientsIdArr = params.ingredients?.split(',').map(Number).filter(Boolean);
    const minPrice = Number(params.priceFrom) || 0;
    const maxPrice = Number(params.priceTo) || 1000;

    return await prisma.category.findMany({
        include: {
            products: {
                orderBy: { id: "desc" },
                where: {
                    ...(params.query && { name: { contains: params.query, mode: 'insensitive' } }),
                    ...(ingredientsIdArr?.length && { ingredients: { some: { id: { in: ingredientsIdArr } } } }),
                    ...((sizes?.length || pizzaTypes?.length || minPrice > 0 || maxPrice < 1000) && {
                        items: {
                            some: {
                                price: { gte: minPrice, lte: maxPrice },
                                ...(sizes?.length && { size: { in: sizes } }),
                                ...(pizzaTypes?.length && { pizzaType: { in: pizzaTypes } })
                            }
                        }
                    })
                },
                include: {
                    ingredients: true,
                    items: { 
                        where: { price: { gte: minPrice, lte: maxPrice } },
                        orderBy: { price: "asc" } 
                    }
                }
            }
        }
    })
}