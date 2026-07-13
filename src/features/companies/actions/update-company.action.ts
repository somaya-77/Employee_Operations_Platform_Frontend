"use server";

import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { CompanySchemaType } from "../schemas/company.schema";
import { updateCompany } from "../services/update-company.service";


export async function updateCompanyAction(id: string, data: CompanySchemaType) {
    const session = await getServerSession(authOptions);
    if (!session) return { success: false, message: "Unauthorized" };

    const result = await updateCompany(id, data);
    
    if (result.success) {
        revalidatePath("/companies");
        return { success: true, data: result.data };
    }
    
    return { success: false, message: result.message };
}