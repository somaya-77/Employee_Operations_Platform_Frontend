import {
    Users,
    TrendingUp,
    TrendingDown,
} from "lucide-react";


export default function UserStats({ users }: { users: any }) {

    return (
        <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <Users className="w-4 h-4" /> Users
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Total Users", value: users.total.toLocaleString(), color: "text-violet-500", bg: "bg-violet-500/10" },
                    { label: "Active Users", value: users.active.toLocaleString(), color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { label: "Inactive Users", value: users.inactive.toLocaleString(), color: "text-slate-500", bg: "bg-slate-500/10" },
                    { label: "Activity Rate", value: `${users.activity_rate}%`, color: "text-blue-500", bg: "bg-blue-500/10" },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-border bg-sidebar p-5">
                        <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                            <Users className={`w-4 h-4 ${s.color}`} />
                        </div>
                        <p className="text-2xl font-semibold">{s.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                        {s.label === "Total Users" && (
                            <div className={`mt-2 text-xs font-medium flex items-center gap-1 ${users.growth_positive ? "text-emerald-500" : "text-rose-500"
                                }`}>
                                {users.growth_positive
                                    ? <TrendingUp className="w-3 h-3" />
                                    : <TrendingDown className="w-3 h-3" />
                                }
                                {users.growth} this month
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}