import { axiosServer } from "@/lib/axiosServer";
import { withErrorHandler } from "@/lib/api-handler";

export async function getStats(query?: string) {
    return withErrorHandler(async () => {
        const api = await axiosServer();
        const url = query ? `/companies/stats?search=${query}` : `/companies/stats`;
        const response = await api.get(url);
        return response.data.data;
    });
}