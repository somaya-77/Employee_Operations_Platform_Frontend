"use client";

import { ReactElement } from "react";
import { Controller, ControllerRenderProps, FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FormControllerProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
    children: (field: ControllerRenderProps<T, Path<T>>) => ReactElement;
};

export default function FormController<T extends FieldValues>({
    form,
    name,
    children
}: FormControllerProps<T>) {
    return (
        <Controller
            control={form.control}
            name={name}
            render={({ field }) => children(field)}
        />
    );
}