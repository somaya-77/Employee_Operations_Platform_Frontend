import { getStats } from "@/features/dashboard/services/get-stats.service";
import TopCompanies from "@/features/dashboard/components/super-admin/TopCompanies";

export default async function CompaniesPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string }>;
}) {
    const { query } = await searchParams;
    // Fetch data
    const statsData = await getStats(query)
    return ( <TopCompanies companies={statsData?.recent_companies} path="/companies" href="/companies/create-company" textBtn="New company"/>)
}