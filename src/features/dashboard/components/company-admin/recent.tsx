"use client";

// Imports
import Link from "next/link";
import { RecentData } from "@/types/dashboard.types";

export default function Recent({ recent }: { recent: RecentData }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent employees */}
            <div className="rounded-xl border border-border bg-sidebar p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium">Recently Added Employees</h2>
                    <Link href="/employees" className="text-xs text-muted-foreground hover:text-primary transition">View all →</Link>
                </div>
                <div className="divide-y divide-border">
                    {recent.employees.map((emp: any) => (
                        <div key={emp.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                                {emp.first_name[0]}{emp.last_name[0]}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{emp.first_name} {emp.last_name}</p>
                                <p className="text-xs text-muted-foreground">{emp.department?.name ?? "—"}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                                {new Date(emp.created_at).toLocaleDateString("en-US", { day: "numeric", month: "short" })}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pending leaves */}
            <div className="rounded-xl border border-border bg-sidebar p-5">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-sm font-medium">Recent Leave Requests</h2>
                    <Link href="/dashboard/leaves" className="text-xs text-muted-foreground hover:text-primary transition">View all →</Link>
                </div>
                <div className="divide-y divide-border">
                    {recent.leaves.map((req: any) => {
                        const STATUS = { pending: { label: "Pending", cls: "bg-amber-500/10 text-amber-600 dark:text-amber-400" }, approved: { label: "Approved", cls: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" }, rejected: { label: "Rejected", cls: "bg-rose-500/10 text-rose-600 dark:text-rose-400" }, cancelled: { label: "Cancelled", cls: "bg-muted text-muted-foreground" } }
                        const st = STATUS[req.status as keyof typeof STATUS] ?? STATUS.pending
                        return (
                            <div key={req.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">{req.employee.first_name} {req.employee.last_name}</p>
                                    <p className="text-xs text-muted-foreground">{req.leave_type} · {req.days_count} days</p>
                                </div>
                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.cls}`}>{st.label}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}