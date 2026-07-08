import { FieldValues, Path, UseFormReturn, useFormState } from "react-hook-form";

export type FieldErrorProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
};

export default function FieldError<T extends FieldValues>({ form, name }: FieldErrorProps<T>) {
  // errors
  const { errors } = useFormState({
    control: form.control,
  });

  const error = errors[name];

  if (!error) return null;
  
  return (
    <p className="text-sm text-red-600">{String(error.message)}</p>
  );
}