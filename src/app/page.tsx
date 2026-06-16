import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import { redirect } from "next/navigation";

export default async function HomePage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/auth/login");
    }

    redirect("/dashboard");
}