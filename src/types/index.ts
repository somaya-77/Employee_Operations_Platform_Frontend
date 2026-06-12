

export const ROLES = {
    SUPER_ADMIN: 'super',
    COMPANY_ADMIN: 'admin',
    MANAGER: 'manager',
    EMPLOYEE: 'employee',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

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

// export interface User {
//     id: number;
//     name: string;
//     email: string;
//     role: Role;
// }