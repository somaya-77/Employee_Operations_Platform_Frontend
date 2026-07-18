"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-bold">404 - Page Not Found</h2>
            <p className="text-muted-foreground">Could not find the requested resource.</p>
            <Button>
                <Link href="/dashboard">Return to Dashboard</Link>
            </Button>
        </div>
    );
}