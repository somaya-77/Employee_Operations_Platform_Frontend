import { AlertTriangle, Info, CheckCircle2, XCircle, Clock } from "lucide-react";

// Config alerts
export const configAlerts = {
    error: {
        icon: XCircle,
        bg: "bg-rose-500/8",
        border: "border-rose-500/20",
        iconColor: "text-rose-500",
        badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        label: "Wrong",
    },
    warning: {
        icon: AlertTriangle,
        bg: "bg-amber-500/8",
        border: "border-amber-500/20",
        iconColor: "text-amber-500",
        badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        label: "Warning",
    },
    info: {
        icon: Info,
        bg: "bg-blue-500/8",
        border: "border-blue-500/20",
        iconColor: "text-blue-500",
        badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        label: "information",
    },
}

// Status companies
export const STATUS = {
    active: { label: "Active", icon: CheckCircle2, cls: "text-emerald-500" },
    suspended: { label: "Suspended", icon: XCircle, cls: "text-rose-500" },
    trial: { label: "Trial", icon: Clock, cls: "text-amber-500" },
}