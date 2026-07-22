import { greeting, now } from "@/lib/constance/dashboard";

export default function HeaderDashboard() {

    return (
        <div className="flex items-start justify-between gap-4">
            <div>
                <h1 className="text-xl font-semibold">
                    {greeting} 👋
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