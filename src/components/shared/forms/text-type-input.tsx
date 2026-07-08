
import { FieldValues } from "react-hook-form";
import { TypeInputProps } from "./type-inputs";
import { Label } from "@/components/ui/label";
import FormController from "./form-controller";
import { Input } from "@/components/ui/input";
import FieldError from "./field-error";


export default function TextTypeInput<T extends FieldValues>({ label, form, name, placeholder }: TypeInputProps<T>) {

    return (
        <div className="w-full flex flex-col gap-2">
            <Label>{label}</Label>
            <FormController form={form} name={name}>
                {(field) => (
                    <Input {...field} placeholder={placeholder}
                    />)}
            </FormController>
            <FieldError form={form} name={name} />
        </div>
    )
}