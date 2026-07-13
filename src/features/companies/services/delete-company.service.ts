import { axiosServer } from "@/lib/axiosServer";

export async function deleteCompany(id: string) {
    try {
        const api = await axiosServer();
        const response = await api.delete(`/companies/${id}`);
        
        return { success: true, data: response.data.data };
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to delete company";
        return { success: false, message };
    }
}