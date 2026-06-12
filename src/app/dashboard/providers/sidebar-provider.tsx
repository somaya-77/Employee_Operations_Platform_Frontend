'use client';

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext({
    isCollapsed: false,
    toggleCollapse: () => { },
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
    // State
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Handle toggle 
    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggleCollapse }}>
            {children}
        </SidebarContext.Provider>
    );
}

export const useSidebar = () => useContext(SidebarContext);