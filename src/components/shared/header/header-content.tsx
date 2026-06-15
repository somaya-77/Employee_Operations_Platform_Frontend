"use client";

// Import
import Logo from "@/components/logo";
import { Input } from "@/components/ui/input";
import { useSidebar } from "@/app/(dashboard)/providers/sidebar-provider";


export default function HeaderContent() {

        
    // Context
    const { isCollapsed } = useSidebar();

    return (
        <header className="flex justify-between gap-4 p-5 items-center border-b bg-sidebar">
            {isCollapsed && <Logo />}
            <Input type="text" placeholder="Search..." className="flex-1 px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </header>
    )
}