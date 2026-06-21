// import {axiosServer} from "@/lib/axiosServer";

// export async function getActivities() {
//     try {
//         const response = await axiosServer.get("/dashboard/activities");
//         return response.data.data;
//     } catch (error: any) {
//         console.error("Backend Error:", error.response?.data || error.message);
//         throw new Error(`Failed to fetch activities: ${error.response?.status || 500}`);
//     }
// }


import { axiosServer } from "@/lib/axiosServer";

export async function getActivities() {
    try {
        const api = await axiosServer();

        const response = await api.get("/dashboard/activities");

        return response.data.data;
    } catch (error: any) {

        console.error("Status:", error?.response?.status);
        console.error("Data:", error?.response?.data);

        throw new Error(
            error?.response?.data?.message ||
            `Failed to fetch stats: ${error?.response?.status || 500}`
        );
    }
}