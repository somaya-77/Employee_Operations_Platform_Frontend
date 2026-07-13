import { axiosServer } from "@/lib/axiosServer";

// export async function getStats(query?: string) {
//     try {
//         const api = await axiosServer();

//         const url = query ? `/companies/stats?search=${query}` : `/companies/stats`;

//         const response = await api.get(url);
//         return response.data.data;
//     } catch (error: any) {
//         if (error.response?.status === 401) {
//             console.error("Token expired or invalid. Please log in again.");
//         }
//         throw error;
//     }
// }


import { withErrorHandler } from "@/lib/api-handler";

export async function getStats(query?: string) {
    return withErrorHandler(async () => {
        const api = await axiosServer();
        const url = query ? `/companies/stats?search=${query}` : `/companies/stats`;
        const response = await api.get(url);
        return response.data.data;
    });
}