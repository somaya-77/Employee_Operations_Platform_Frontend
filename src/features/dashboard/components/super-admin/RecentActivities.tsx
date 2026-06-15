"use client"
// components/superadmin/RecentActivities.tsx
import { Building2, UserPlus } from "lucide-react"

interface Activity {
  id: string
  type: "company_created" | "user_created"
  title: string
  meta: string
  date: string
}

interface Props { activities: Activity[] }

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (mins < 60) return `since ${mins} minutes`
  if (hours < 24) return `since ${hours} hours`
  return `since ${days} days`
}

export default function RecentActivities({ activities }: Props) {
  if (!activities.length) {
    return (
      <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
        No recent activities
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {activities.map((a) => (
        <div key={a.id} className="flex items-start gap-3 py-3.5 first:pt-0 last:pb-0">
          <div
            className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.type === "company_created"
                ? "bg-blue-500/10"
                : "bg-violet-500/10"
              }`}
          >
            {a.type === "company_created"
              ? <Building2 className="w-4 h-4 text-blue-500" />
              : <UserPlus className="w-4 h-4 text-violet-500" />
            }
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{a.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{a.meta}</p>
          </div>

          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
            {timeAgo(a.date)}
          </span>
        </div>
      ))}
    </div>
  )
}
