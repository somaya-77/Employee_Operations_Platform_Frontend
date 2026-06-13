'use client';

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import TextTypeInput from "./text-type-input";
import PasswordTypeInput from "./password-type-input";

export interface TypeInputProps<T extends FieldValues> {
    form: UseFormReturn<T>;
    name: Path<T>;
    placeholder?: string;
    label?: string;
    type?: string;
}

export default function TypeInputs<T extends FieldValues>({ form, name, placeholder, label, type }: TypeInputProps<T>) {
    const inputStyle = "w-full flex flex-col gap-2"

    const labelText = label || "";
    switch (type) {
        case "text":
            return <TextTypeInput<T> label={labelText} form={form} name={name} placeholder={placeholder} />

        case "password":
            return <PasswordTypeInput<T> label={labelText} form={form} name={name} placeholder={placeholder} />
        case "phone":
            // return <PhoneTypeInput<T> label={labelText} form={form} name={name} />

        case "otp":
            // return <OTPTypeInput<T> form={form} name={name} />


        // case "checkbox":
        //     return (
        //         <div className={inputStyle}>
        //             <div className="flex items-center gap-2 mb-5">
        //                 <Controller
        //                     control={form.control}
        //                     name={props.name}
        //                     render={({ field }) => (
        //                         <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        //                     )}
        //                 />
        //                 <Label>{labelText}</Label>
        //             </div>
        //         </div>
        //     )

        default:
            return null;
    }

}


