import { CompanySchemaType } from "@/features/companies/schemas/company.schema";
import { axiosServer } from "@/lib/axiosServer";

export async function postCompany(data: CompanySchemaType) {
    try {
        const api = await axiosServer();
        const response = await api.post("/companies", data);
        return response.data.data;
    } catch (error) {
return null;    }
}