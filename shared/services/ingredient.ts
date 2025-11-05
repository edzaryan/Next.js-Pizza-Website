import { Ingredient } from "@prisma/client";
import { axiosInstance } from "./instance";


export const getAllIngredients = async(): Promise<Ingredient[]> =>
    (await axiosInstance.get<Ingredient[]>("ingredients"))
    .data;