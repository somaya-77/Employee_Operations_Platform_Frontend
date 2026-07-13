"use server";

import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { deleteCompany } from "../services/delete-company.service";


export async function deleteCompanyAction(id: string) {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    const result = await deleteCompany(id);
    
    if (result.success) {
        revalidatePath("/companies");
        return { success: true, data: result.data };
    }
    
    return { success: false, message: result.message };
}