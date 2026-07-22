import { axiosServer } from "@/lib/axiosServer";

export async function getCompanyAdminDashboard() {
    try {
        const api = await axiosServer();

        const response = await api.get("/company-admin/dashboard");
        return response.data.data;
    } catch (error) {

        return null;
    }
}