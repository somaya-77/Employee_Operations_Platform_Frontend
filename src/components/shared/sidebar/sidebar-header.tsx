"use client";

// Imports
import { cn } from "@/lib/utils";
import Logo from "@/components/shared/logo";
import { ChevronLeft } from "lucide-react";
import { useSidebar } from "@/app/(dashboard)/providers/sidebar-provider";


export default function SidebarHeader() {
    // Context Sidebar
    const { isCollapsed, toggleCollapse } = useSidebar();
    return (
        <div className="flex items-center justify-between mb-6">
            {/* Logo */}
            {!isCollapsed && <Logo />}

            <div className="flex flex-1 justify-end">
                <button onClick={toggleCollapse} className={cn("bg-sidebar-primary/30 border p-2 rounded-lg cursor-pointer", isCollapsed && "mr-1.5")}>
                    <ChevronLeft size={16} className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
                </button>

            </div>
        </div>
    )
}