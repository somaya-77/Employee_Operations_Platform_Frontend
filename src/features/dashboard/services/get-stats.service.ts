import axiosServer from "@/lib/axiosServer";

export async function getStats(query?: string) {
    try {
        const url = query ? `/companies/stats?search=${query}` : `/companies/stats`;
console.log("urlurlurlurlurl", url)
        const response = await axiosServer.get(url);
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch stats: ${error.response?.status || 500}`);
    }
}