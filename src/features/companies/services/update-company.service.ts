import { axiosServer } from "@/lib/axiosServer";
import { CompanySchemaType } from "../schemas/company.schema";

export async function updateCompany(id: string, data: CompanySchemaType) {
    try {
        const api = await axiosServer();
        const response = await api.put(`/companies/${id}`, data);
        
        return { success: true, data: response.data.data };
    } catch (error: any) {
        const message = error.response?.data?.message || "Failed to update company";
        return { success: false, message };
    }
}