import { getStats } from "@/features/dashboard/services/get-stats.service";
import TopCompanies from "@/features/dashboard/components/super-admin/TopCompanies";
import HeaderCompanies from "../../../features/companies/components/header-companies";


export default async function CompaniesPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams;
    // Fetch data
    const statsData = await getStats(query)
    return (
        <div className="flex flex-col gap-8">
            <HeaderCompanies />
            <TopCompanies companies={statsData.recent_companies} />
        </div>
    )
}