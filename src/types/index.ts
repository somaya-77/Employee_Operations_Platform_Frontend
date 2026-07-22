import { FieldValues, UseFormReturn } from 'react-hook-form';

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


export interface Data {
    id: number;
    label: string;
    placeholder?: string | undefined;
    type: string;
    name: string;
}

export interface AuthFormProps<T extends FieldValues> {
    title: "Login";
    data: Data[];
    titleBtn: string;
    handleSubmit: (e?: React.BaseSyntheticEvent) => void;
    path: string;
    form: UseFormReturn<T>;
    titleLinkPage?: string;
    description?: string;
    icon?: boolean;
    email?: string | null | undefined;
    generalErrorMessage?: string;
}