"use client";

import Link from "next/link";
import { FieldValues, Path } from "react-hook-form";
import TypeInputs from "./type-inputs";
import { Button } from "@/components/ui/button";
import { AuthFormProps } from "@/types";




export default function Form<T extends FieldValues>({ title, data, titleBtn, handleSubmit, path, form, titleLinkPage, icon, email }: AuthFormProps<T>) {
    // const forgotPasswordMutation = useForgotPasswordMutation();

    // const handleResendOTP = (email: ForgotPasswordFormValues) => {
    //     forgotPasswordMutation.mutate(email);
    // };

    return (
        <>
            <form onSubmit={handleSubmit} >
                <div className="flex flex-col gap-6 justify-center items-center w-full ">
                    {/* <div className="flex gap-6 w-full">
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
                    </div> */}

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
                </div>

                {/* {title === "Verify OTP" && (
                    <OTPTimer initialSeconds={60} onResend={handleResendOTP} email={email} />
                )} */}

                <Button
                isLoading={form.formState.isSubmitting}
                    type="submit" className="w-full mt-6">{titleBtn}</Button>
            </form>
        </>
    )
}