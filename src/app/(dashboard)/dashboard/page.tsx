import { ROLES } from "@/types";
import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import SuperAdminDashboard from "@/features/dashboard/components/super-admin/super-admin-dashboard";
import CompanyAdminDashboard from "@/features/dashboard/components/company-admin/company-admin-dashboard";

export default async function DashboardPage() {
    // Get the session on the server side
    const session = await getServerSession(authOptions);

    // Role-based rendering logic
    const role = session?.user?.role as string;

    return (
        <div className="">
            {role === ROLES.SUPER_ADMIN && (
                <SuperAdminDashboard />
            )}
            {role === ROLES.COMPANY_ADMIN && (
                <CompanyAdminDashboard />
            )}
        </div>
    );
}


