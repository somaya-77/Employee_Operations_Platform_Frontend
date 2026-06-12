import Header from "@/components/shared/header/header";
import Sidebar from "@/components/shared/sidebar/sidebar";
import DashboardProvider from "./providers";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <main className="flex-1 h-screen flex">
            <DashboardProvider>
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Header />
                    <div className="p-6 h-full">
                        {children}
                    </div>

                </div>
            </DashboardProvider>
        </main>
    )
}