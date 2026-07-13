import { axiosServer } from "@/lib/axiosServer";

export async function getActivities() {
    try {
        const api = await axiosServer();

        const response = await api.get("/dashboard/activities");

        return response.data.data;
    } catch (error) {

        return null;
    }
}