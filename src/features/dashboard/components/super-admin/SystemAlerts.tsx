"use client"

// Imports
import { Info } from "lucide-react";
import { Alert } from "@/types/dashboard.types";
import { configAlerts } from "@/lib/constance/dashboard";

// Interface
interface Props { alerts: Alert[] }


export default function SystemAlerts({ alerts }: Props) {
  // Empty alerts
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
        const cfg  = configAlerts[a.type]
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
