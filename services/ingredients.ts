import { Ingredient, Product } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./contants";


export const getAllIngredients = async (): Promise<Ingredient[]> => 
    (await axiosInstance.get<Ingredient[]>(ApiRoutes.GET_ALL_INGREDIENTS))
    .data;