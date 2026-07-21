import { axiosServer } from "@/lib/axiosServer";

export async function getPlatform() {
    try {
        const api = await axiosServer();
        const response = await api.get("/super-admin/platform");
        return { success: true, data: response.data.data };
    } catch (error: any) {
        const message = error?.message || "Failed";
        return { success: false, message };
    }
}