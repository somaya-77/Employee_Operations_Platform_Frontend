import {axiosServer} from "@/lib/axiosServer";

export async function getStats(query?: string) {
    try {
                const api = await axiosServer();


        const url = query ? `/companies/stats?search=${query}` : `/companies/stats`;

        const response = await api.get(url);
        return response.data.data;
    } catch (error: any) {
        console.error("JWT ERROR:", error);
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch stats: ${error.response?.status || 500}`);
    }
}