

export interface Employee {
    id: string; first_name: string; last_name: string; email: string
    phone: string|null; role: string; is_active: boolean
    hire_date: string|null; created_at: string
    department: { id: string; name: string } | null
    manager:    { id: string; first_name: string; last_name: string } | null
}

export interface Dept { id: string; name: string }
export interface Mgr  { id: string; first_name: string; last_name: string }