"use client"

import { UseNewEmployeeHook } from "@/hooks/use-new-employee.hook"
import { ArrowRight, UserPlus } from "lucide-react"
import Link from "next/link"


export default function NewEmployeePage() {
    const { error, handleSubmit, success, form, depts, managers, saving, set } = UseNewEmployeeHook()


    return (
        <div className=" space-y-8">
            <div className="flex items-center gap-3">
                <Link href="/company-admin/employees" className="text-muted-foreground hover:text-foreground transition">
                    {/* <ArrowRight className="w-4 h-4" /> */}
                </Link>
                <div>
                    <h1 className="text-xl font-semibold">New Employee</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Create a new employee account</p>
                </div>
            </div>

            {error && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-lg px-4 py-3 text-sm">{error}</div>}
            {success && <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-lg px-4 py-3 text-sm">{success}</div>}

            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-sidebar p-6 space-y-5">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                    {(["first_name", "last_name"] as const).map((key) => (
                        <div key={key}>
                            <label className="block text-xs text-muted-foreground mb-1.5">{key === "first_name" ? "First Name" : "Last Name"} *</label>
                            <input value={form[key]} onChange={e => set(key, e.target.value)} required
                                className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                        </div>
                    ))}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} required
                        className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-xs text-muted-foreground mb-1.5">Password *</label>
                    <input type="password" value={form.password} onChange={e => set("password", e.target.value)} required minLength={8}
                        className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                </div>

                {/* Role + Dept + Manager */}
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Role *</label>
                        <select value={form.role} onChange={e => set("role", e.target.value)}
                            className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                            <option value="employee">Employee</option>
                            <option value="manager">Manager</option>
                            <option value="company_admin">Company Admin</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Department</label>
                        <select value={form.department_id} onChange={e => set("department_id", e.target.value)}
                            className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                            <option value="">— Select —</option>
                            {depts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Direct Manager</label>
                        <select value={form.manager_id} onChange={e => set("manager_id", e.target.value)}
                            className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary">
                            <option value="">— Select —</option>
                            {managers.map(m => <option key={m.id} value={m.id}>{m.first_name} {m.last_name}</option>)}
                        </select>
                    </div>
                </div>

                {/* Phone + Hire date */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Phone Number</label>
                        <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                            className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                    </div>
                    <div>
                        <label className="block text-xs text-muted-foreground mb-1.5">Hire Date</label>
                        <input type="date" value={form.hire_date} onChange={e => set("hire_date", e.target.value)}
                            className="w-full border border-border rounded-lg bg-background px-3 py-2.5 text-sm outline-none focus:border-primary" />
                    </div>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={saving}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground rounded-lg py-2.5 text-sm font-medium disabled:opacity-50 hover:bg-primary/90 transition">
                        <UserPlus className="w-4 h-4" />
                        {saving ? "Creating..." : "Create Account"}
                    </button>
                    <Link href="/company-admin/employees"
                        className="flex-1 flex items-center justify-center border border-border rounded-lg py-2.5 text-sm hover:bg-muted transition">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    )
}