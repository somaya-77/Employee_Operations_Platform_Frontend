import { Stats } from "@/types/dashboard.types";


export default function Attendance({ stats }: { stats: Stats }) {

    return (
        <div className="rounded-xl border border-border bg-sidebar p-5">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-medium">Today's Attendance</h2>
                <span className="text-xs text-muted-foreground">{stats.attendance.rate}%</span>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 transition-all" style={{ width: `${Math.round((stats.attendance.present_today / Math.max(stats.employees.active, 1)) * 100)}%` }} />
                <div className="bg-amber-500 transition-all" style={{ width: `${Math.round((stats.attendance.late_today / Math.max(stats.employees.active, 1)) * 100)}%` }} />
                <div className="bg-blue-500 transition-all" style={{ width: `${Math.round((stats.attendance.on_leave_today / Math.max(stats.employees.active, 1)) * 100)}%` }} />
                <div className="bg-muted flex-1" />
            </div>
            <div className="flex gap-4 mt-2">
                {[
                    { label: "Present", val: stats.attendance.present_today, color: "bg-emerald-500" },
                    { label: "Late", val: stats.attendance.late_today, color: "bg-amber-500" },
                    { label: "On Leave", val: stats.attendance.on_leave_today, color: "bg-blue-500" },
                    { label: "Absent", val: stats.attendance.absent_today, color: "bg-muted" },
                ].map((s) => (
                    <div key={s.label} className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${s.color}`} />
                        <span className="text-xs text-muted-foreground">{s.label} ({s.val})</span>
                    </div>
                ))}
            </div>
        </div>
    )
}