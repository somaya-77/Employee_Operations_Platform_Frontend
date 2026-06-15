import axiosInstance from "@/lib/axios";

export async function getStats() {
    try {
        const response = await axiosInstance.get("/companies/stats");
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch stats: ${error.response?.status || 500}`);
    }
}