import {
    Activity,
    CalendarOff,
} from "lucide-react";


export default function Operations({ operations }: { operations: any }) {

    return (
        <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4" /> Daily Operations
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border bg-sidebar p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{operations.attendance_today}</p>
                        <p className="text-sm text-muted-foreground">Checked in today</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-sidebar p-5 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                        <CalendarOff className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-semibold">{operations.pending_leaves}</p>
                        <p className="text-sm text-muted-foreground">Pending leave requests</p>
                    </div>
                </div>
            </div>
        </section>
    )
}