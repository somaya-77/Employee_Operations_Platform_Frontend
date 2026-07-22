"use client";

// Imports
import { Employee } from "@/types/employee.type";
import { useEffect, useState, useCallback } from "react";


export function UseEmployeeHook() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [roleF, setRoleF] = useState("")
    const [activeF, setActiveF] = useState("")
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)
    const [total, setTotal] = useState(0)
    const [togglingId, setTogglingId] = useState<string | null>(null)

    const fetchEmployees = useCallback(async () => {
        setLoading(true)
        try {
            const q = new URLSearchParams()
            if (search) q.set("search", search)
            if (roleF) q.set("role", roleF)
            if (activeF) q.set("is_active", activeF)
            q.set("page", String(page))
            q.set("limit", "15")
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company-admin/employees?${q}`, { credentials: "include" })
            const json = await res.json()
            setEmployees(json.data.employees)
            setPages(json.data.pagination.pages)
            setTotal(json.data.pagination.total)
        } finally { setLoading(false) }
    }, [search, roleF, activeF, page])

    useEffect(() => { fetchEmployees() }, [fetchEmployees])
    useEffect(() => { setPage(1) }, [search, roleF, activeF])

    async function toggleActive(emp: Employee) {
        setTogglingId(emp.id)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company-admin/employees/${emp.id}`, {
            method: "PATCH", credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_active: !emp.is_active }),
        })
        setTogglingId(null)
        fetchEmployees()
    }

    return { total, search, setSearch, roleF, setRoleF, activeF, setActiveF, employees, loading, togglingId, pages, toggleActive, page, setPage };

}