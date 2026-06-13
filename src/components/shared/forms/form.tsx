"use client";

import Link from "next/link";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import TypeInputs from "./type-inputs";
import { Button } from "@/components/ui/button";
// import { useForgotPasswordMutation } from "@/lib/query/Auth-query/auth-query";
// import { ForgotPasswordFormValues } from "@/lib/schemas/forgot-password.schema";

export interface Data {
    id: number;
    label: string;
    placeholder?: string | undefined;
    type: string;
    name: string;
}

export interface AuthFormProps<T extends FieldValues> {
    title: "Login";
    // title: "Login" | "Create a New Password" | "Forgot Password" | "Verify OTP";
    data: Data[];
    titleBtn: string;
    handleSubmit: (e?: React.BaseSyntheticEvent) => void;
    path: string;
    form: UseFormReturn<T>;
    titleLinkPage?: string;
    description?: string;
    icon?: boolean;
    email?: string | null | undefined;
    generalErrorMessage?: string;
}

export default function Form<T extends FieldValues>({ title, data, titleBtn, handleSubmit, path, form, titleLinkPage, icon, email }: AuthFormProps<T>) {
    // const forgotPasswordMutation = useForgotPasswordMutation();

    // const handleResendOTP = (email: ForgotPasswordFormValues) => {
    //     forgotPasswordMutation.mutate(email);
    // };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-6 justify-center items-center w-full ">
                    <div className="flex gap-6 w-full">
                        {data
                            .filter(item => item.name === "firstName" || item.name === "lastName")
                            .map(item => (
                                <div key={item.id} className="w-1/2">
                                    <TypeInputs form={form}
                                        type={item.type}
                                        label={item.label}
                                        placeholder={item.placeholder}
                                        name={item.name as Path<T>} />
                                </div>
                            ))}
                    </div>

                    {data
                        .filter(item => item.name !== "firstName" && item.name !== "lastName")
                        .map(item => (
                            <div key={item.id} className="w-full">
                                <TypeInputs form={form}
                                    type={item.type}
                                    label={item.label}
                                    placeholder={item.placeholder}
                                    name={item.name as Path<T>} />

                                {(title === "Login" && item.type === "password") &&
                                    <Link href="/forgot-password" className="flex justify-end text-maroon-700 dark:text-softPink-300 text-sm font-semibold">
                                        Forgot password
                                    </Link>
                                }
                            </div>
                        ))}


                    {/* <div className="w-full flex justify-end ">
                    <Link className="text-blue-600 font-medium -mt-2 mb-4" href={path}>{titleLinkPage}</Link>
                </div> */}
                </div>

                {/* {title === "Verify OTP" && (
                    <OTPTimer initialSeconds={60} onResend={handleResendOTP} email={email} />
                )} */}

                <Button
                    type="submit" className="w-full mt-6 cursor-pointer" disabled={form.formState.isSubmitting}>{titleBtn}</Button>
            </form>
            {/* <FormFooter title={title} /> */}
        </>
    )
}