import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { ROLES } from "@/types"
import { ArrowRight, Building2, Plus } from "lucide-react"
import Link from "next/link"
import StatsGrid from "./StatsGrid"
import RecentActivities from "./RecentActivities"
import SystemAlerts from "./SystemAlerts"
import TopCompanies from "./TopCompanies"
import { Button } from "@/components/ui/button"
import { getStats } from "@/features/dashboard/services/get-stats.service"
import HeaderDashboard from "../header-dashboard"
import { getActivities } from "../../services/get-activities.service"
import { getAlerts } from "../../services/get-alerts.service"



export default async function SuperAdminDashboard() {

    const session = await getServerSession(authOptions)

    if (!session) redirect("/auth/login")
    if (session.user.role !== ROLES.SUPER_ADMIN) redirect("/dashboard")

    // Parallel fetch — all 3 APIs at once
    const [statsData, activitiesData, alertsData] = await Promise.all([
        getStats(),
        getActivities(),
        getAlerts(),
    ])


    return (
        <div className="space-y-8">
            {/* ── Header ── */}
            <HeaderDashboard session={session} />

            {/* ── Stats ── */}
            <StatsGrid stats={statsData} />

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Recent activities — 2/3 width */}
                <div className="lg:col-span-2 rounded-xl border border-border bg-sidebar p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium">Last Activity </h2>
                        <Button>
                            <Link
                                href="/activities"
                                className="text-sm flex gap-2 items-center"
                            >
                                Show all <ArrowRight size={16} />
                            </Link>
                        </Button>
                    </div>
                    <RecentActivities activities={activitiesData.activities} />
                </div>

                {/* System alerts — 1/3 width */}
                <div className="rounded-xl border border-border bg-sidebar p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium"></h2>
                        {alertsData.alerts.filter((a: { type: string }) => a.type === "error").length > 0 && (
                            <span className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full font-medium">
                                {alertsData.alerts.filter((a: { type: string }) => a.type === "error").length}
                            </span>
                        )}
                    </div>
                    <SystemAlerts alerts={alertsData} />
                </div>
            </div>

            {/* ── Top Companies table ── */}
            <div className="rounded-xl border border-border bg-sidebar p-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <h2 className="font-medium">Top Companies</h2>
                    </div>
                    <Button>
                        <Link
                            href="/companies"
                            className="text-sm flex items-center gap-2"
                        >
                            Management company <ArrowRight size={16} />
                        </Link>
                    </Button>
                </div>
                <TopCompanies companies={statsData.recent_companies} />
            </div>

        </div>
    )
}