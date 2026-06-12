import { SidebarProvider } from "./sidebar-provider";


export default function DashboardProvider({ children }: { children: React.ReactNode }) {

    return (
        <>
        <SidebarProvider>
            {children}
        </SidebarProvider>
        </>
    )
}