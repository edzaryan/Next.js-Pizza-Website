import { axiosInstance } from "./instance";

// Upload avatar
export const uploadAvatar = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosInstance.post<{ imageUrl: string }>(
        "/upload",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
    );

    return data.imageUrl;
};

// Delete avatar
export const deleteAvatar = async (): Promise<null> => {
    const { data } = await axiosInstance.delete<{ imageUrl: null }>("/upload");
    return data.imageUrl;
};