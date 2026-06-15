import axiosInstance from "@/lib/axios";
import { CompanySchemaType } from "@/features/companies/schemas/company.schema";

export async function postCompany(data: CompanySchemaType) {
    try {
        const response = await axiosInstance.post("/companies", data);
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch stats: ${error.response?.status || 500}`);
    }
}