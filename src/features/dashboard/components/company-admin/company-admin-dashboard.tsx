
import Recent from "./recent";
import Attendance from "./attendance";
import StatsGrid from "../super-admin/StatsGrid";
import HeaderDashboard from "../header-dashboard";
import { getCompanyAdminStatsConfig } from "@/lib/constance/dashboard";
import { getCompanyAdminDashboardAction } from "../../actions/company-admin-dashboard.action";

export default async function CompanyAdminDashboard() {
    // Get data
    const { data } = await getCompanyAdminDashboardAction()
    const { stats, recent } = data;

    const cards = getCompanyAdminStatsConfig(stats);
    return (
        <div className="space-y-8">
            {/*  Header  */}
            <HeaderDashboard />

            {/*  Stats  */}
            <StatsGrid cards={cards} />

            {/* Attendance bar */}
            <Attendance stats={stats} />

            {/* Recent */}
            <Recent recent={recent} />
        </div>
    )
}