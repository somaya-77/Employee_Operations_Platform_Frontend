import {axiosServer} from "@/lib/axiosServer";

export async function getAlerts() {
    try {
        const api = await axiosServer();
        
        const response = await api.get("/dashboard/alerts");
        return response.data.data;
    } catch (error: any) {
       return null;
    }
}