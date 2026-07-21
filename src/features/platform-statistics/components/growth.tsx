import { BarChart3 } from "lucide-react";


export default function Growth({ chart }: { chart: any }) {

    return (
        <section>
            <h2 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Company Growth — Last 6 Months
            </h2>
            <div className="rounded-xl border border-border bg-sidebar p-6">
                <div className="flex items-end gap-3 h-32">
                    {chart.map((item: { month: string; count: number }) => {
                        const max = Math.max(...chart.map((c: { count: number }) => c.count), 1)
                        const pct = Math.round((item.count / max) * 100)
                        const [, m] = item.month.split("-")
                        const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
                        return (
                            <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
                                <span className="text-xs font-medium text-foreground">{item.count}</span>
                                <div className="w-full rounded-t-md bg-primary/80 transition-all" style={{ height: `${pct}%`, minHeight: 4 }} />
                                <span className="text-xs text-muted-foreground">{months[parseInt(m)]}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}