"use client";

// Imports
import { Building2 } from "lucide-react";
import { Activity } from "@/types/dashboard.types";
import { timeAgo } from "@/lib/utils";

// Interface
interface Props { activities: Activity[] }

export default function RecentActivities({ activities }: Props) {
  // Super admin only cares about company-level activity
  const companyActivities = activities.filter((a) => a.type === "new_company")

  if (!companyActivities.length) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
        No recent activities
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {companyActivities.map((a) => (
        <div key={a.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
          <div className="mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-500/10">
            <Building2 className="w-4 h-4 text-blue-500" />
          </div>

          <div className="flex-1 min-w-0">
            {/* Title */}
            <p className="text-sm font-medium truncate">{a.title}</p>
            {/* Subtitle */}
            <p className="text-xs text-muted-foreground mt-0.5 capitalize">{a.subtitle}</p>
          </div>

          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
            {timeAgo(a.created_at)}
          </span>
        </div>
      ))}
    </div>
  )
}