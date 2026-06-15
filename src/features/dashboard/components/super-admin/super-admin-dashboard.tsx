import { getServerSession } from "next-auth"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"
import { ROLES } from "@/types"

import { Building2, Plus } from "lucide-react"
import Link from "next/link"
import StatsGrid from "./StatsGrid"
import RecentActivities from "./RecentActivities"
import SystemAlerts from "./SystemAlerts"
import TopCompanies from "./TopCompanies"
import { Button } from "@/components/ui/button"
import { getStats } from "@/features/dashboard/services/get-stats.service"
import HeaderDashboard from "../header-dashboard"



export default async function SuperAdminDashboard() {

    const session = await getServerSession(authOptions)

    if (!session) redirect("/auth/login")
    if (session.user.role !== ROLES.SUPER_ADMIN) redirect("/dashboard")

    // Parallel fetch — all 3 APIs at once
    // const [statsData, 
    //     activitiesData, alertsData
    // ] = await Promise.all([
    //     getStats(),
    //     // getActivities(),
    //     // getAlerts(),
    // ])

const statsData = await getStats()

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
                        <Link
                            href="/activities"
                            className="text-xs text-muted-foreground hover:text-primary transition"
                        >
                           Show all
                        </Link>
                    </div>
                    {/* <RecentActivities activities={activitiesData.activities} /> */}
                </div>

                {/* System alerts — 1/3 width */}
                {/* <div className="rounded-xl border border-border bg-sidebar p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-medium"></h2>
                        {alertsData.alerts.filter((a: { type: string }) => a.type === "error").length > 0 && (
                            <span className="text-xs bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded-full font-medium">
                                {alertsData.alerts.filter((a: { type: string }) => a.type === "error").length} 
                            </span>
                        )}
                    </div>
                    <SystemAlerts alerts={alertsData.alerts} />
                </div> */}
            </div>

            {/* ── Top Companies table ── */}
            <div className="rounded-xl border border-border bg-sidebar p-6">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        <h2 className="font-medium">Top Companies</h2>
                    </div>
                    <Link
                        href="/companies"
                        className="text-xs text-muted-foreground hover:text-primary transition"
                    >
                        Management company
                    </Link>
                </div>
                {/* <TopCompanies companies={statsData.topCompanies} /> */}
            </div>

        </div>
    )
}