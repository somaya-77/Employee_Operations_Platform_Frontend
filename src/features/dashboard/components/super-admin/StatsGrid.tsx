"use client";

import { Stats } from "@/types/dashboard.types";
import { Building2, Users, ShieldAlert, TrendingUp } from "lucide-react"



interface Props { stats: Stats }

export default function StatsGrid({ stats }: Props) {
  const cards = [
    {
      title: "Total Companies",
      value: stats.companies.total,
      sub: `${stats.companies.active} Active`,
      trend: `+${stats.companies.new_this_month} This Month`,
      positive: true,
      icon: Building2,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Users",
      value: stats.users.total.toLocaleString("en-US"),
      sub: `${stats.users.active} Active`,
      trend: `+${stats.users.new_this_month} This Month`,
      positive: true,
      icon: Users,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Suspended Companies",
      value: stats.companies.suspended,
      sub: "Requires Review",
      trend: stats.companies.suspended > 0 ? "Requires Attention" : "No Issues Found",
      positive: stats.companies.suspended === 0,
      icon: ShieldAlert,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      title: "Activity Rate",
      value: `${Math.round((stats.users.active / Math.max(stats.users.total, 1)) * 100)}%`,
      sub: "Active Users",
      trend: "Comparison to Total",
      positive: true,
      icon: TrendingUp,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon
        return (
          <div
            key={card.title}
            className="rounded-xl border border-border bg-sidebar p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{card.title}</span>
              <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                <Icon className={`w-4.5 h-4.5 ${card.color}`} />
              </div>
            </div>

            <div>
              <p className="text-2xl font-semibold tracking-tight">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{card.sub}</p>
            </div>

            <div
              className={`text-xs font-medium px-2 py-1 rounded-md w-fit ${card.positive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                }`}
            >
              {card.trend}
            </div>
          </div>
        )
      })}
    </div>
  )
}
