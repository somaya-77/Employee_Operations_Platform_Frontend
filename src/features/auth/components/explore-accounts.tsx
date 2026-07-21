"use client";

// Imports
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { accountsBtn } from "@/lib/constance/forms";

export default function ExploreAccounts() {
    // Router
    const router = useRouter()
    // Transition state for handling login
    const [isPending, startTransition] = useTransition();

    // State 
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    
    // Handle login for the selected account
    const handleLogin = (email: string, password: string, index: number) => {
        setLoadingIndex(index);

        startTransition(async () => {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
                setLoadingIndex(null);
                return;
            }

            toast.success("Sign in successful");
            router.push("/dashboard");
            router.refresh();
        });
    };

    return (
        <div className="flex flex-col items-center justify-center w-full p-8 ">
            <h2 className="text-xl font-bold mb-6 text-center">Explore using accounts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full max-w-sm">
                {accountsBtn.map((acc, index) => (
                    <Button
                    className="min-w-50"
                        key={index}
                        variant="outline"
                        isLoading={isPending && loadingIndex === index}
                        onClick={() => handleLogin(acc.email, acc.password, index)}
                    >
                        {acc.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}