
// Dashboard:

//Alerts
export interface Alert {
    id: string;
    type: "warning" | "error" | "info";
    title: string;
    message: string;
    date: string;
}

// Activity
export interface Activity {
    id: string
    type: "new_user" | "new_company" | "leave_request"
    title: string
    subtitle: string
    status: string
    created_at: string
};

// Company
export interface Company {
    id: string
    name: string
    status: string
    user_count: number
    created_at: string
}

export interface Stats {
  companies: { total: number; active: number; suspended: number; new_this_month: number }
  users: { total: number; active: number; new_this_month: number }
}