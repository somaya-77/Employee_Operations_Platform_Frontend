
import { FieldValues } from "react-hook-form";
import { TypeInputProps } from "./type-inputs";
import { Label } from "@/components/ui/label";
import FormController from "./form-controller";
import { InputPassword } from "./input-password";
import FieldError from "./field-error";

export default function PasswordTypeInput<T extends FieldValues>({ form, name, label, placeholder }: TypeInputProps<T>) {

    return (
        <div className="w-full flex flex-col gap-2">
            <Label>{label}</Label>
            <FormController form={form} name={name}>
                {(field) => (
                    <InputPassword {...field} placeholder={placeholder} />
                )}
            </FormController>
            <FieldError form={form} name={name} />
        </div>
    )
}