"use client"
import { useEffect, useState } from "react"
import { Bell, Send, Trash2, Info, AlertTriangle, XCircle, CheckCircle } from "lucide-react"
import { CHANNEL_LABELS, ROLE_LABELS, TYPE_CONFIG } from "@/lib/constance/dashboard"

interface Notification {
    id:          string
    title:       string
    message:     string
    type:        "info" | "warning" | "error" | "success"
    channel:     "in_app" | "email" | "both"
    target_role: string | null
    company_id:  string | null
    sent_at:     string | null
    created_at:  string
}



const defaultForm = { title: "", message: "", type: "info", channel: "in_app", target_role: "" }

export default function NotificationsPage() {
    const [notifications,   setnotifications]   = useState<Notification[]>([])
    const [loading,  setLoading]  = useState(true)
    const [sending,  setSending]  = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [form,     setForm]     = useState(defaultForm)
    const [success,  setSuccess]  = useState("")

    useEffect(() => { fetchnotifications() }, [])

    async function fetchnotifications() {
        setLoading(true)
        try {
            const res  = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/notifications`,
                { credentials: "include" })
            const json = await res.json()
            setnotifications(json.data)
        } finally { setLoading(false) }
    }

    async function handleSend(e: React.FormEvent) {
        e.preventDefault()
        setSending(true)
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/notifications`, {
                method:       "POST",
                credentials: "include",
                headers:     { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    target_role: form.target_role || null,
                }),
            })
            setSuccess("Notification sent successfully")
            setForm(defaultForm)
            setShowForm(false)
            fetchnotifications()
            setTimeout(() => setSuccess(""), 3000)
        } finally { setSending(false) }
    }

    async function handleDelete(id: string) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/notifications/${id}`,
            { method: "DELETE", credentials: "include" })
        setnotifications((prev) => prev.filter((n) => n.id !== id))
    }

    function timeAgo(dateStr: string) {
        const diff  = Date.now() - new Date(dateStr).getTime()
        const mins  = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)
        const days  = Math.floor(diff / 86400000)
        if (mins  < 60)  return `${mins}m ago`
        if (hours < 24)  return `${hours}h ago`
        return `${days}d ago`
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Notifications</h1>
                    <p className="text-sm text-muted-foreground mt-1">Send and manage platform notifications</p>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                >
                    <Send className="w-4 h-4" /> New Notification
                </button>
            </div>

            {success && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg px-4 py-3 text-sm">
                    <CheckCircle className="w-4 h-4" /> {success}
                </div>
            )}

            {/* Send form modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-sidebar border border-border rounded-xl p-6 w-full max-w-lg">
                        <h2 className="font-semibold mb-5 flex items-center gap-2">
                            <Bell className="w-4 h-4" /> Send New Notification
                        </h2>
                        <form onSubmit={handleSend} className="space-y-4">
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Title *</label>
                                <input value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))}
                                    placeholder="Notification title"
                                    required
                                    className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Message *</label>
                                <textarea value={form.message} onChange={e => setForm(p => ({...p, message: e.target.value}))}
                                    placeholder="Notification message..."
                                    rows={3} required
                                    className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary resize-none" />
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs text-muted-foreground mb-1.5">Type</label>
                                    <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))}
                                        className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                                        <option value="info">Info</option>
                                        <option value="warning">Warning</option>
                                        <option value="error">Error</option>
                                        <option value="success">Success</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-muted-foreground mb-1.5">Channel</label>
                                    <select value={form.channel} onChange={e => setForm(p => ({...p, channel: e.target.value}))}
                                        className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                                        <option value="in_app">In-App</option>
                                        <option value="email">Email</option>
                                        <option value="both">Both</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-muted-foreground mb-1.5">Target</label>
                                    <select value={form.target_role} onChange={e => setForm(p => ({...p, target_role: e.target.value}))}
                                        className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                                        <option value="">All</option>
                                        <option value="company_admin">Company Admins</option>
                                        <option value="manager">Managers</option>
                                        <option value="employee">Employees</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={sending}
                                    className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium disabled:opacity-50">
                                    <Send className="w-4 h-4" />
                                    {sending ? "Sending..." : "Send"}
                                </button>
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 border border-border rounded-lg py-2.5 text-sm">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Notifications list */}
            <div className="rounded-xl border border-border bg-sidebar overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
                ) : notifications.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <Bell className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">No notifications found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {notifications.map((n) => {
                            const cfg  = TYPE_CONFIG[n.type]
                            const Icon = cfg.icon
                            return (
                                <div key={n.id} className="flex items-start gap-4 p-4 hover:bg-muted/20 transition-colors">
                                    <div className={`w-9 h-9 rounded-lg ${cfg.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                                        <Icon className={`w-4 h-4 ${cfg.cls}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="text-sm font-medium">{n.title}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.cls} font-medium`}>
                                                {cfg.label}
                                            </span>
                                            <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                                {CHANNEL_LABELS[n.channel]}
                                            </span>
                                            {n.target_role && (
                                                <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                                    {ROLE_LABELS[n.target_role] ?? n.target_role}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{n.message}</p>
                                        <p className="text-xs text-muted-foreground/60 mt-1.5">{timeAgo(n.created_at)}</p>
                                    </div>
                                    <button onClick={() => handleDelete(n.id)}
                                        className="text-muted-foreground hover:text-rose-500 transition p-1 rounded shrink-0">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

