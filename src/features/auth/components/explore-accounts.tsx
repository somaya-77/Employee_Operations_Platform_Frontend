"use client";

// Imports
import { useTransition } from "react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { accountsBtn } from "@/lib/constance/forms";

export default function ExploreAccounts() {
    // Transition state for handling login
    const [isPending, startTransition] = useTransition();

    const handleLogin = (email: string, password: string) => {
        startTransition(async () => {
            await signIn("credentials", {
                email,
                password,
                callbackUrl: "/dashboard",
            });
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-8 ">
            <h2 className="text-xl font-bold mb-6 text-center">Explore using accounts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full max-w-sm">
                {accountsBtn.map((acc, index) => (
                    <Button
                        key={index}
                        variant="outline"
                        isLoading={isPending}
                        onClick={() => handleLogin(acc.email, acc.password)}
                    >
                        {acc.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}