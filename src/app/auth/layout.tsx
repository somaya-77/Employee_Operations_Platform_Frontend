export default function AuthLayout({children}: { children: React.ReactNode }) {

    return (
        <div className="flex-1">
            <div className="flex justify-center items-center h-screen">
            {children}
            </div>
        </div>
    )
}