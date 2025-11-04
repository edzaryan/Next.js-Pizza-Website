import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./constants";


export const getAllIngredients = async(): Promise<Ingredient[]> =>
    (await axiosInstance.get<Ingredient[]>(ApiRoutes.GET_ALL_INGREDIENTS))
    .data;