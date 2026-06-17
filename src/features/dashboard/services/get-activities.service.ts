import axiosServer from "@/lib/axiosServer";

export async function getActivities() {
    try {
        const response = await axiosServer.get("/dashboard/activities");
        return response.data.data;
    } catch (error: any) {
        console.error("Backend Error:", error.response?.data || error.message);
        throw new Error(`Failed to fetch activities: ${error.response?.status || 500}`);
    }
}