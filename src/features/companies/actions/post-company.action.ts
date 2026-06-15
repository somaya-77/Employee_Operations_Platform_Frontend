"use server";

import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { postCompany } from '@/features/companies/services/post-company.service';
import { CompanySchemaType } from "@/features/companies/schemas/company.schema";


export async function createCompanyAction(data: CompanySchemaType) {
    const session = await getServerSession(authOptions);
    if (!session) throw new Error("Unauthorized");

    try {
        const result = await postCompany(data);
        return { success: true, data: result };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
}