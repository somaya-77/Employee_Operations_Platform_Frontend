"use client";

import { useLoginHook } from "./use-login-hook";
import { LoginSchemaType } from "../schemas/login.schema";
import Form from "@/components/shared/forms/form";
import { loginInputs } from "@/lib/constance/forms";

export default function LoginForm() {
    // Hook
    const { form, onSubmit } = useLoginHook();

    return (
        <>
            <Form<LoginSchemaType> title="Login" data={loginInputs} titleBtn="login" handleSubmit={form.handleSubmit(onSubmit)} path="/forgot-password" form={form} titleLinkPage="Forgot your password?" />
        </>
    )
}

