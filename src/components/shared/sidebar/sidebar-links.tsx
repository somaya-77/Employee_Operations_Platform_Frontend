'use client';

// Imports
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SIDEBAR } from "@/lib/constance/sidebar";
import { useSidebar } from "@/app/(dashboard)/providers/sidebar-provider";
import { Role } from "@/types";


export default function SidebarLinks({role}:{ role: string | undefined }) {
        
    const { isCollapsed } = useSidebar();
    // Pathname
    const pathname = usePathname();

    // Filter the sidebar items based on the user's role
    const filteredSidebar = SIDEBAR.map((section) => ({
        ...section,
        items: section.items.filter((item) => item.role.includes(role as Role)),
    })).filter((section) => section.items.length > 0);

    return (
        <nav className="overflow-y-auto h-[86%]">
            {filteredSidebar.map((section) => (
                <div key={section.section} className="mb-6 border-b ">
                    {/* Section Name */}
                    {!isCollapsed && <h3 className="text-xs font-semibold mb-2 px-2 uppercase">{section.section}</h3>}
                    {section.items.map((item) => {
                        const isActive = pathname.startsWith(item.path);

                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                className={`flex items-center gap-3 p-2 m-2 text-sm rounded-lg transition-colors 
                                    ${isActive
                                        ? "bg-sidebar-primary text-white"
                                        : "text-muted-foreground hover:bg-sidebar-primary hover:text-white"
                                    }`}
                            >
                                {/* Icon */}
                                <div className="[&>svg]:size-4">
                                    {item.icon}
                                </div>
                                {/* Title */}
                                {!isCollapsed && <span className="text-sm">{item.title}</span>}
                            </Link>
                        );
                    })}
                </div>
            ))}
        </nav >
    );
}


