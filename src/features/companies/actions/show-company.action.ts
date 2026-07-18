"use server";

import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { showCompany } from "../services/show-company.service";


export async function showCompanyAction(id: string) {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    const result = await showCompany(id);
    
    if (result.success) {
        // revalidatePath(`/companies/edit-company/${id}`);
        return { success: true, data: result.data };
    }
    
    return { success: false, message: result.message };
}