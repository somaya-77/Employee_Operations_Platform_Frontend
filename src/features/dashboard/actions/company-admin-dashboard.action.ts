"use server";

import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { getCompanyAdminDashboard } from "../services/company-admin/get-company-admin-dashboard.service";

export async function getCompanyAdminDashboardAction() {
  const session = await getServerSession(authOptions);
  if (!session) return { success: false, message: "Unauthorized" };

  try {
    const result = await getCompanyAdminDashboard();
    
    return { success: true, data: result.data || result };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Failed to load dashboard data" 
    };
  }
}