'use client';

// Imports
import { Role, ROLES } from "@/types";
import SidebarLinks from "./sidebar-links";
import SidebarHeader from "./sidebar-header";
import SidebarFooter from "./sidebar-footer";
import { useSidebar } from "@/app/(dashboard)/providers/sidebar-provider";
import { User } from "next-auth";


export default function SidebarContent({ role }: { role: string | undefined }) {
    // context
    const { isCollapsed } = useSidebar();
    return (
        <aside className={`bg-sidebar border-r border-sidebar-border h-screen p-4 transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"}`}>
            <SidebarHeader />
            <SidebarLinks role={role} />
            <SidebarFooter role={role} />
        </aside>
    )
}