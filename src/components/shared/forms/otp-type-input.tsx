
import { FieldValues } from "react-hook-form";
import { TypeInputProps } from "./type-inputs";
import FormController from "./form-controller";
import FieldError from "./field-error";

export default function OTPTypeInput<T extends FieldValues>({ form, name }: TypeInputProps<T>) {

    return (
        <div className="flex flex-col items-center w-full">
            <FormController form={form} name={name}>
                {(field) => (
                    // <InputOTP
                    //     {...field}
                    //     maxLength={6}
                    //     status="default"
                    // />
                    <div></div>
                )}
            </FormController>
            <FieldError form={form} name={name} />
        </div>
    )
}