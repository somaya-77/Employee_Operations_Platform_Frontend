"use client"
import { AlertTriangle, Info, XCircle } from "lucide-react"

interface Alert {
  id:      string
  type:    "warning" | "error" | "info"
  title:   string
  message: string
  date:    string
}

interface Props { alerts: Alert[] }

const CONFIG = {
  error: {
    icon: XCircle,
    bg:   "bg-rose-500/8",
    border: "border-rose-500/20",
    iconColor: "text-rose-500",
    badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
    label: "Wrong",
  },
  warning: {
    icon: AlertTriangle,
    bg:   "bg-amber-500/8",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    label: "Warning",
  },
  info: {
    icon: Info,
    bg:   "bg-blue-500/8",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    label: "information",
  },
}

export default function SystemAlerts({ alerts }: Props) {

  console.log("alerts3333333333333333333333",alerts)
  if (!alerts.length) {
    return (
      <div className="flex flex-col items-center justify-center h-32 gap-2 text-muted-foreground">
        <Info className="w-5 h-5" />
        <p className="text-sm">No alerts</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2.5">
      {alerts.map((a) => {
        const cfg  = CONFIG[a.type]
        const Icon = cfg.icon
        return (
          <div
            key={a.id}
            className={`flex items-start gap-3 rounded-lg border p-3 ${cfg.bg} ${cfg.border}`}
          >
            <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.iconColor}`} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${cfg.badge}`}>
                  {cfg.label}
                </span>
                <span className="text-xs font-medium">{a.title}</span>
              </div>
              <p className="text-xs text-muted-foreground">{a.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
