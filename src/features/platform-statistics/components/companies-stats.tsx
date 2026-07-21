import { Company } from "@/types/dashboard.types";
import { 
    Building2, 
    TrendingUp, 
    TrendingDown,
} from "lucide-react";


export default function CompaniesStats({companies}:{companies: any}) {

    return (
            <section>
                <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Companies
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Companies", value: companies.total, color: "text-blue-500", bg: "bg-blue-500/10" },
                        { label: "Active Companies", value: companies.active, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                        { label: "Suspended Companies", value: companies.suspended, color: "text-rose-500", bg: "bg-rose-500/10" },
                        { label: "In Trial Period", value: companies.trial, color: "text-amber-500", bg: "bg-amber-500/10" },
                    ].map((s) => (
                        <div key={s.label} className="rounded-xl border border-border bg-sidebar p-5">
                            <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center mb-3`}>
                                <Building2 className={`w-4 h-4 ${s.color}`} />
                            </div>
                            <p className="text-2xl font-semibold">{s.value}</p>
                            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                            {s.label === "Total Companies" && (
                                <div className={`mt-2 text-xs font-medium flex items-center gap-1 ${companies.growth_positive ? "text-emerald-500" : "text-rose-500"
                                    }`}>
                                    {companies.growth_positive
                                        ? <TrendingUp className="w-3 h-3" />
                                        : <TrendingDown className="w-3 h-3" />
                                    }
                                    {companies.growth} this month
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
    )
}