
import { getPlatformAction } from "@/features/platform-statistics/actions/get-platform.action";
import CompaniesStats from "@/features/platform-statistics/components/companies-stats";
import UserStats from "@/features/platform-statistics/components/user-stats";
import Operations from "@/features/platform-statistics/components/operations";
import Growth from "@/features/platform-statistics/components/growth";


export default async function PlatformStatisticsPage() {

    const { data } = await getPlatformAction()
    const { companies, users, operations, chart } = data

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-xl font-semibold">Platform Statistics</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Comprehensive overview of platform performance
                </p>
            </div>

            {/*  Companies stats  */}
            <CompaniesStats companies={companies} />

            {/*  Users stats  */}
            <UserStats users={users} />

            {/*  Operations  */}
            <Operations operations={operations} />

            {/*  Growth chart  */}
            {chart && chart.length > 0 && (
                <Growth chart={chart} />
            )}
        </div>
    )
}