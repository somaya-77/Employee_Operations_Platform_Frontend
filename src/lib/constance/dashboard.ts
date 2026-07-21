import { AlertTriangle, Info, CheckCircle2, XCircle, Clock, Globe, Mail,  Server, CheckCircle, } from "lucide-react";

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



///////////////////////////////////////


// Settings grouped by category
export const CATEGORIES = [
    {
        key:   "general",
        label: "General Settings",
        icon:  Globe,
        keys:  ["platform_name", "allow_registration", "max_companies", "default_trial_days"],
    },
    {
        key:   "email",
        label: "Email Settings",
        icon:  Mail,
        keys:  ["platform_email", "smtp_host", "smtp_port", "smtp_user"],
    },
    {
        key:   "system",
        label: "System Settings",
        icon:  Server,
        keys:  ["maintenance_mode"],
    },
]

// UI config per key
export const FIELD_CONFIG: Record<string, {
    label: string
    type:  "text" | "email" | "number" | "toggle"
    placeholder?: string
}> = {
    platform_name:        { label: "Platform Name",         type: "text",   placeholder: "PeopleFlow"       },
    platform_email:       { label: "Support Email",           type: "email",  placeholder: "support@..."    },
    allow_registration:   { label: "Allow New Registration", type: "toggle"                                },
    max_companies:        { label: "Maximum Companies",      type: "number", placeholder: "100"            },
    default_trial_days:   { label: "Trial Days",            type: "number", placeholder: "14"             },
    maintenance_mode:     { label: "Maintenance Mode",      type: "toggle"                                },
    smtp_host:            { label: "SMTP Host",              type: "text",   placeholder: "smtp.gmail.com" },
    smtp_port:            { label: "SMTP Port",              type: "number", placeholder: "587"            },
    smtp_user:            { label: "SMTP User",              type: "email",  placeholder: "user@gmail.com" },
}

export const TYPE_CONFIG = {
    info:    { icon: Info,          cls: "text-blue-500",   bg: "bg-blue-500/10",    label: "Info"    },
    warning: { icon: AlertTriangle, cls: "text-amber-500",  bg: "bg-amber-500/10",   label: "Warning" },
    error:   { icon: XCircle,       cls: "text-rose-500",   bg: "bg-rose-500/10",    label: "Error"   },
    success: { icon: CheckCircle,   cls: "text-emerald-500",bg: "bg-emerald-500/10", label: "Success" },
}

export const CHANNEL_LABELS = { in_app: "In-App", email: "Email", both: "Both" }
export const ROLE_LABELS: Record<string, string> = {
    company_admin: "Company Admins",
    manager:       "Managers",
    employee:      "Employees",
}