// "use client";

import { authOptions } from "@/auth";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default async function HeaderCompanies() {
        const session = await getServerSession(authOptions);
    
    console.log("Session in action:", session?.user.role);

    return
    return (
        <div>
             <Button>
                <Link
                    href="/companies/create-company"
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition"
                >
                    <PlusCircleIcon className="w-4 h-4" />
                    New Company
                </Link>
            </Button>
        </div>
    )
}