import { ROLES } from "@/types";
import StatsGrid from "./StatsGrid";
import { authOptions } from "@/auth";
import { Building2 } from "lucide-react";
import SystemAlerts from "./SystemAlerts";
import TopCompanies from "./TopCompanies";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import RecentActivities from "./RecentActivities";
import HeaderDashboard from "../header-dashboard";
import { getAlerts } from "../../services/get-alerts.service";
import CardHeader from "@/components/shared/header/card-header";
import { getActivities } from "../../services/get-activities.service";
import { getStats } from "@/features/dashboard/services/get-stats.service";
import { getSuperAdminStatsConfig } from "@/lib/constance/dashboard";


export default async function SuperAdminDashboard() {
    // Session
    const session = await getServerSession(authOptions)

    if (!session) redirect("/auth/login")
    if (session.user.role !== ROLES.SUPER_ADMIN) redirect("/dashboard")

    // Parallel fetch — all 3 APIs at once
    const [statsData, activitiesData, alertsData] = await Promise.all([
        getStats(),
        getActivities(),
        getAlerts(),
    ])

    const cards = getSuperAdminStatsConfig(statsData);
    return (
        <div className="space-y-8">
            {/*  Header  */}
            <HeaderDashboard  />

            {/*  Stats  */}
            <StatsGrid cards={cards} />

            {/*  Main grid  */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent activities — 2/3 width */}
                <div className="lg:col-span-2 rounded-xl border border-border bg-sidebar p-6">
                    <CardHeader title="Last Activity" link="/activities" titleBtn="Show all" />
                    <RecentActivities activities={activitiesData?.activities} />
                </div>

                {/* System alerts — 1/3 width */}
                <div className="rounded-xl border border-border bg-sidebar p-6">
                    <CardHeader title="Alerts" link="/alerts" titleBtn="Show all" />
                    <SystemAlerts alerts={alertsData?.alerts} />
                </div>
            </div>

            {/*  Top Companies table  */}
            <div className="rounded-xl border border-border bg-sidebar p-6">
                <CardHeader title="Top Companies" icon={<Building2 className="w-4 h-4 text-muted-foreground" />} link="/companies" titleBtn="Management company" />
                <TopCompanies companies={statsData?.recent_companies} />
            </div>
        </div>
    )
}