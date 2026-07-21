
"use client"
import { useEffect, useState } from "react"
import { CheckCircle2, XCircle, Clock, AlertTriangle, Plus, Pencil } from "lucide-react"

interface Subscription {
    id:             string
    plan:           "basic" | "pro" | "enterprise"
    status:         "active" | "expired" | "cancelled" | "trial"
    price_monthly: number
    max_users:     number
    expires_at:    string | null
    created_at:    string
    company:       { id: string; name: string; logo_url: string | null }
}

const PLAN_COLORS = {
    basic:      "bg-slate-500/10 text-slate-500",
    pro:        "bg-blue-500/10 text-blue-500",
    enterprise: "bg-violet-500/10 text-violet-500",
}

const STATUS_CONFIG = {
    active:    { label: "Active",    icon: CheckCircle2, cls: "text-emerald-500" },
    expired:   { label: "Expired",   icon: XCircle,         cls: "text-rose-500"    },
    cancelled: { label: "Cancelled", icon: XCircle,         cls: "text-slate-500"   },
    trial:     { label: "Trial",     icon: Clock,           cls: "text-amber-500"   },
}

export default function SubscriptionsPage() {
    const [subs,    setSubs]    = useState<Subscription[]>([])
    const [counts,  setCounts]  = useState<Record<string, number>>({})
    const [loading, setLoading] = useState(true)
    const [filter,  setFilter]  = useState<string>("all")
    const [editing, setEditing] = useState<Subscription | null>(null)
    const [saving,  setSaving]  = useState(false)

    useEffect(() => { fetchSubs() }, [filter])

    async function fetchSubs() {
        setLoading(true)
        try {
            const q   = filter !== "all" ? `?status=${filter}` : ""
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/super-admin/subscriptions${q}`,
                { credentials: "include" })
            const json = await res.json()
            setSubs(json.data.subscriptions)
            setCounts(json.data.statusCounts)
        } finally {
            setLoading(false)
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!editing) return
        setSaving(true)
        const form = new FormData(e.currentTarget)
        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/super-admin/subscriptions/${editing.id}`,
            {
                method:       "PATCH",
                credentials: "include",
                headers:     { "Content-Type": "application/json" },
                body: JSON.stringify({
                    plan:          form.get("plan"),
                    status:        form.get("status"),
                    expires_at:    form.get("expires_at") || null,
                    max_users:     Number(form.get("max_users")),
                    price_monthly: Number(form.get("price_monthly")),
                }),
            }
        )
        setSaving(false)
        setEditing(null)
        fetchSubs()
    }

    const FILTERS = [
        { key: "all",       label: "All",       count: Object.values(counts).reduce((a, b) => a + b, 0) },
        { key: "active",    label: "Active",    count: counts.active    ?? 0 },
        { key: "trial",     label: "Trial",     count: counts.trial     ?? 0 },
        { key: "expired",   label: "Expired",   count: counts.expired   ?? 0 },
        { key: "cancelled", label: "Cancelled", count: counts.cancelled ?? 0 },
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Subscriptions</h1>
                    <p className="text-sm text-muted-foreground mt-1">Manage company subscriptions</p>
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-2 flex-wrap">
                {FILTERS.map((f) => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition ${
                            filter === f.key
                                ? "bg-primary text-primary-foreground"
                                : "border border-border bg-sidebar text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {f.label}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                            filter === f.key ? "bg-white/20" : "bg-muted"
                        }`}>
                            {f.count}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-sidebar overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/30">
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Company</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Plan</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Price/Mo</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Users</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Expires At</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">Loading...</td></tr>
                        ) : subs.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-12 text-muted-foreground">No subscriptions found</td></tr>
                        ) : subs.map((s) => {
                            const st   = STATUS_CONFIG[s.status]
                            const Icon = st.icon
                            const exp  = s.expires_at
                                ? new Date(s.expires_at).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })
                                : "—"
                            const isExpiringSoon = s.expires_at
                                && new Date(s.expires_at).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000
                                && s.status === "active"

                            return (
                                <tr key={s.id} className="hover:bg-muted/20 transition-colors">
                                    <td className="px-4 py-3 font-medium">{s.company.name}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase ${PLAN_COLORS[s.plan]}`}>
                                            {s.plan}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`flex items-center gap-1.5 w-fit ${st.cls}`}>
                                            <Icon className="w-3.5 h-3.5" />
                                            <span className="text-xs">{st.label}</span>
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">${s.price_monthly}</td>
                                    <td className="px-4 py-3 text-muted-foreground">{s.max_users.toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs flex items-center gap-1 ${isExpiringSoon ? "text-amber-500 font-medium" : "text-muted-foreground"}`}>
                                            {isExpiringSoon && <AlertTriangle className="w-3 h-3" />}
                                            {exp}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setEditing(s)}
                                            className="text-muted-foreground hover:text-primary transition p-1 rounded"
                                        >
                                            <Pencil className="w-3.5 h-3.5" />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {/* Edit modal */}
            {editing && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-sidebar border border-border rounded-xl p-6 w-full max-w-md">
                        <h2 className="font-semibold mb-5">Edit Subscription — {editing.company.name}</h2>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Plan</label>
                                <select name="plan" defaultValue={editing.plan}
                                    className="w-full border border-border rounded-lg bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                                    <option value="basic">Basic</option>
                                    <option value="pro">Pro</option>
                                    <option value="enterprise">Enterprise</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Status</label>
                                <select name="status" defaultValue={editing.status}
                                    className="w-full border border-border rounded-lg bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                                    <option value="active">Active</option>
                                    <option value="trial">Trial</option>
                                    <option value="expired">Expired</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-muted-foreground mb-1.5">Price/Month ($)</label>
                                    <input name="price_monthly" type="number" defaultValue={editing.price_monthly}
                                        className="w-full border border-border rounded-lg bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                                </div>
                                <div>
                                    <label className="block text-xs text-muted-foreground mb-1.5">Max Users</label>
                                    <input name="max_users" type="number" defaultValue={editing.max_users}
                                        className="w-full border border-border rounded-lg bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs text-muted-foreground mb-1.5">Expiration Date</label>
                                <input name="expires_at" type="date"
                                    defaultValue={editing.expires_at ? editing.expires_at.split("T")[0] : ""}
                                    className="w-full border border-border rounded-lg bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="submit" disabled={saving}
                                    className="flex-1 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium disabled:opacity-50">
                                    {saving ? "Saving..." : "Save"}
                                </button>
                                <button type="button" onClick={() => setEditing(null)}
                                    className="flex-1 border border-border rounded-lg py-2.5 text-sm">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
