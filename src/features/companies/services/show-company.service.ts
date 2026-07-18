import { axiosServer } from "@/lib/axiosServer";

export async function showCompany(id: string) {
    try {
        const api = await axiosServer();
        const response = await api.get(`/companies/${id}`);
        
        return { success: true, data: response.data.data };
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to show company";
        return { success: false, message };
    }
}