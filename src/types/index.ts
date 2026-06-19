import { Label } from '@/components/ui/label';

// Roles type
export const ROLES = {
    SUPER_ADMIN: 'super_admin',
    COMPANY_ADMIN: 'company_admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];


// Sidebar
type SidebarItem = {
    title: string;
    path: string;
    icon: React.ReactNode;
    role: Role[];

}

export type Sidebar = {
    section: string;
    items: SidebarItem[];
}

// Form
export type TypeForm = {
    id: number;
    label: string;
    type: string;
    name: string;
    placeholder: string;
}

export interface User {
    id: number;
    
    name: string;
    email: string;
    role: Role;
}