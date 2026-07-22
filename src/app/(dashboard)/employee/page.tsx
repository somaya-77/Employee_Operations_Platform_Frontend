"use client"

import { Search, Plus, Pencil, UserX, UserCheck, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ROLE_COLORS, ROLE_LABELS } from "@/lib/constance/dashboard";
import { UseEmployeeHook } from "@/hooks/use-employee.hook";
import { Employee } from "@/types/employee.type";


export default function EmployeesPage() {
    const { total, search, setSearch, roleF, setRoleF, activeF, setActiveF, employees, loading, togglingId, pages, toggleActive, page, setPage } = UseEmployeeHook()

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold">Employees</h1>
                    <p className="text-sm text-muted-foreground mt-1">{total} total employees</p>
                </div>
                <Link href="/employee/new-employee"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition">
                    <Plus className="w-4 h-4" /> New Employee
                </Link>
            </div>

            {/* Filters */}
            <div className="flex gap-3 flex-wrap">
                <div className="relative flex-1 min-w-48">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full border border-border rounded-lg bg-sidebar pl-9 pr-3 py-2 text-sm outline-none focus:border-primary" />
                </div>
                <select value={roleF} onChange={e => setRoleF(e.target.value)}
                    className="border border-border rounded-lg bg-sidebar px-3 py-2 text-sm outline-none focus:border-primary">
                    <option value="">All Roles</option>
                    <option value="manager">Manager</option>
                    <option value="employee">Employee</option>
                    <option value="company_admin">Company Admin</option>
                </select>
                <select value={activeF} onChange={e => setActiveF(e.target.value)}
                    className="border border-border rounded-lg bg-sidebar px-3 py-2 text-sm outline-none focus:border-primary">
                    <option value="">All Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border bg-sidebar overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-border bg-muted/20">
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Employee</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Role</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Department</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Direct Manager</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Status</th>
                            <th className="text-left text-xs font-medium text-muted-foreground px-4 py-3">Hire Date</th>
                            <th className="px-4 py-3" />
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {loading ? (
                            <tr><td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">Loading...</td></tr>
                        ) : employees.length === 0 ? (
                            <tr><td colSpan={7} className="text-center py-12 text-muted-foreground text-sm">No results found</td></tr>
                        ) : employees.map((emp: Employee) => (
                            <tr key={emp.id} className="hover:bg-muted/20 transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary shrink-0">
                                            {emp.first_name[0]}{emp.last_name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium">{emp.first_name} {emp.last_name}</p>
                                            <p className="text-xs text-muted-foreground">{emp.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[emp.role] ?? ""}`}>
                                        {ROLE_LABELS[emp.role] ?? emp.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-muted-foreground text-xs">{emp.department?.name ?? "—"}</td>
                                <td className="px-4 py-3 text-muted-foreground text-xs">
                                    {emp.manager ? `${emp.manager.first_name} ${emp.manager.last_name}` : "—"}
                                </td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center gap-1 text-xs font-medium ${emp.is_active ? "text-emerald-500" : "text-rose-500"}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${emp.is_active ? "bg-emerald-500" : "bg-rose-500"}`} />
                                        {emp.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-muted-foreground">
                                    {emp.hire_date ? new Date(emp.hire_date).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1">
                                        <Link href={`/company-admin/employees/${emp.id}/edit`}
                                            className="p-1.5 rounded hover:bg-muted transition text-muted-foreground hover:text-foreground">
                                            <Pencil className="w-3.5 h-3.5" />
                                        </Link>
                                        <button onClick={() => toggleActive(emp)} disabled={togglingId === emp.id}
                                            className="p-1.5 rounded hover:bg-muted transition text-muted-foreground hover:text-foreground disabled:opacity-40">
                                            {emp.is_active ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination */}
                {pages > 1 && (
                    <div className="flex items-center justify-between px-4 py-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">Page {page} of {pages}</p>
                        <div className="flex gap-1">
                            <button onClick={() => setPage((p: number) => Math.max(1, p - 1))} disabled={page === 1}
                                className="p-1.5 rounded border border-border disabled:opacity-40 hover:bg-muted transition">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => setPage((p: number) => Math.min(pages, p + 1))} disabled={page === pages}
                                className="p-1.5 rounded border border-border disabled:opacity-40 hover:bg-muted transition">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}