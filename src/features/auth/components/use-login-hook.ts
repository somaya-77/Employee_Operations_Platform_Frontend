'use client'

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { defaultValue, LoginSchema, LoginSchemaType } from "../schemas/login.schema";


export function useLoginHook() {
    // navigate
    const router = useRouter();

    // form
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(LoginSchema),
        defaultValues: defaultValue,
    });

    const onSubmit = async (data: LoginSchemaType) => {
        const { email, password } = data;

        try {
            const response = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!response?.ok) {
                toast.error(response?.error || "Login failed");
                return;
            }

            toast.success("Login successful!");

            router.push("/dashboard");
            router.refresh();

        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    return {
        form,
        onSubmit,
    };
}