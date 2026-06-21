import { CompanySchemaType } from "@/features/companies/schemas/company.schema";
import { axiosServer } from "@/lib/axiosServer";

export async function postCompany(data: CompanySchemaType) {
    try {
        const api = await axiosServer();

        const response = await api.post("/companies", data);
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch stats: ${error.response?.status || 500}`);
    }
}