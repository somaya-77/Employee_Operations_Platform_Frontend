
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
    id: string;
    name: string
    status: string
    user_count: number
    created_at: string
}

export interface Stats {
    companies: { total: number; active: number; suspended: number; new_this_month: number }
    users: { total: number; active: number; new_this_month: number }
}


export interface StatCardItem {
    label: string;
    value: number;
    sub: string;
    trend?: string;
    positive: boolean;
    icon: React.ElementType;
    color: string;
    bg: string;
}



export interface EmployeeStats {
  total: number;
  active: number;
  new_this_month: number;
}

export interface DepartmentStats {
  total: number;
}

export interface AttendanceStats {
  present_today: number;
  late_today: number;
  absent_today: number;
  on_leave_today: number;
  rate: number;
}

export interface LeaveStats {
  pending: number;
}

export interface Stats {
  employees: EmployeeStats;
  departments: DepartmentStats;
  attendance: AttendanceStats;
  leaves: LeaveStats;
}

export interface RecentEmployee {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  created_at: string;
  department?: {
    name: string;
  };
}

export interface RecentData {
  employees: RecentEmployee[];
  leaves: any[];
}

export interface CompanyDashboardData {
  stats: Stats;
  recent: RecentData;
}