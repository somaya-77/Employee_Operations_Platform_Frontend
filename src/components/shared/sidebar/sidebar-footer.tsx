"use client";

// Imports
import { Role } from "@/types";
import { useSidebar } from "@/app/(dashboard)/providers/sidebar-provider";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function SidebarFooter({ role }: { role: string | undefined }) {
    const { isCollapsed } = useSidebar();
    return (
        <div className="flex items-center justify-between gap-4 flex-1 mt-6">
            {/* Avatar */}
            <Avatar className={` ${isCollapsed && "ml-2"}`}>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
                <AvatarBadge className="bg-green-600 dark:bg-green-800" />
            </Avatar>
            {/* Name & Role */}
            {!isCollapsed &&
                <div className="flex flex-col gap-1 flex-1">
                    <h3 className="font-semibold text-sm">Somaya Adel</h3>
                    <div className="text-xs text-sidebar-foreground bg-sidebar-primary/30 border py-1 px-2 rounded-lg flex items-center gap-1 ">
                        {role}
                    </div>
                </div>

            }
        </div>
    );
}