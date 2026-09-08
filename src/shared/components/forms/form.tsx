"use client";

import { useForm, FormProvider, type FieldValues, type UseFormProps } from "react-hook-form";
import type { ReactNode } from "react";

type FormProps<TFieldValues extends FieldValues> = {
  formOptions?: UseFormProps<TFieldValues>;
  onSubmit: (values: TFieldValues) => void | Promise<void>;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

export function Form<TFieldValues extends FieldValues>({
  formOptions,
  onSubmit,
  children,
  className,
  ariaLabel,
}: FormProps<TFieldValues>) {
  const methods = useForm<TFieldValues>(formOptions);

  return (
    <FormProvider {...methods}>
      <form
        className={className}
        aria-label={ariaLabel}
        onSubmit={methods.handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
