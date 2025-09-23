import { axiosInstance } from "./instance"
import { CartDto } from "./dto/cart.dto";


export const getCart = async (): Promise<CartDto> => {
    return (await axiosInstance.get<CartDto>("/cart")).data;
} 

export const updateItemQuantity = async (itemId: number, quantity: number): Promise<CartDto> => {
    return (await axiosInstance.patch<CartDto>("/cart/" + itemId, { quantity })).data;
}