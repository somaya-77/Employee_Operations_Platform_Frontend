import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FieldErrorProps<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>;
};

export default function FieldError<T extends FieldValues>({ form, name }: FieldErrorProps<T>) {
  return (
    <p className="text-sm text-red-600">
      {form.formState.errors[name]?.message as string}
    </p>
  );
}