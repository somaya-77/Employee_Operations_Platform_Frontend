import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>
                <div className="text-primary">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
            </CardContent>
        </Card>
    );
}