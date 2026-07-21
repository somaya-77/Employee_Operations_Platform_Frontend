"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { getPlatform } from "../services/get-platform-stats.service";

export async function getPlatformAction() {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    const result = await getPlatform();
    
    if (result.success) {
        return { success: true, data: result.data };
    }
    
    return { success: false, message: result.message };
}