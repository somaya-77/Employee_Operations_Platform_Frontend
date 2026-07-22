"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Dept, Mgr } from "@/types/employee.type"

const defaultForm = {
    first_name: "", last_name: "", email: "", password: "",
    role: "employee", department_id: "", manager_id: "",
    phone: "", hire_date: "",
}
export function UseNewEmployeeHook() {
    const router = useRouter()
    const [form, setForm] = useState(defaultForm)
    const [depts, setDepts] = useState<Dept[]>([])
    const [managers, setManagers] = useState<Mgr[]>([])
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/company-admin/departments`, { credentials: "include" })
            .then(r => r.json()).then(j => setDepts(j.data ?? []))
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/employees?role=manager&limit=100`, { credentials: "include" })
            .then(r => r.json()).then(j => setManagers(j.data?.employees ?? []))
    }, [])

    function set(key: string, val: string) { setForm(p => ({ ...p, [key]: val })) }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault(); setError(""); setSaving(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company-admin/employees`, {
                method: "POST", credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, department_id: form.department_id || null, manager_id: form.manager_id || null }),
            })
            const json = await res.json()
            if (!res.ok) { setError(json.message); return }
            setSuccess("Account created successfully! Redirecting...")
            setTimeout(() => router.push("/company-admin/employees"), 1500)
        } finally { setSaving(false) }
    }


    return { error, handleSubmit, success, form, depts, managers, saving, set }
}