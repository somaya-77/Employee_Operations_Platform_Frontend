import axiosInstance from "@/lib/axios";
import axiosServer from "@/lib/axiosServer";

export async function getAlerts() {
    try {
        const response = await axiosServer.get("/dashboard/alerts");
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch alerts: ${error.response?.status || 500}`);
    }
}