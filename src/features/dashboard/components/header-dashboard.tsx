
export default function HeaderDashboard({ session }: { session: any }) {
    // Date
    const now = new Date()

    // Greeting
    const greeting =
        now.getHours() < 12 ? "Good morning" :
            now.getHours() < 18 ? "Good afternoon" : "Good evening"

    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-xl font-semibold">
                    {greeting}، {session.user.name?.split(" ")[0] ?? "Super Admin"} 👋
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                    {now.toLocaleDateString("en", {
                        weekday: "long", day: "numeric",
                        month: "long", year: "numeric",
                    })}
                </p>
            </div>
        </div>
    )
}