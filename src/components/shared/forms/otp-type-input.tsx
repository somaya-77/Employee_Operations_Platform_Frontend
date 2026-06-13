import { TypeInputProps } from "@/lib/types/props.type";
import { FieldError, FormController, InputOTP } from "@/components";
import { FieldValues } from "react-hook-form";

export default function OTPTypeInput<T extends FieldValues>({ form, name }: TypeInputProps<T>) {

    return (
        <div className="flex flex-col items-center w-full">
            <FormController form={form} name={name}>
                {(field) => (
                    <InputOTP
                        {...field}
                        maxLength={6}
                        status="default"
                    />
                )}
            </FormController>
            <FieldError form={form} name={name} />
        </div>
    )
}