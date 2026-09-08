"use client";

import type { ReactNode } from "react";
import { useFormContext } from "react-hook-form";

import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { cn } from "@/shared/utils";

type FormFieldProps = {
  name: string;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
};

export function FormField({
  name,
  label,
  type = "text",
  as = "input",
  autoComplete,
  required,
  disabled,
  description,
}: FormFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors[name];
  const errorId = `${name}-error`;
  const descriptionId = `${name}-description`;
  const describedBy = [
    description ? descriptionId : undefined,
    error ? errorId : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="flex flex-col">
      <Label htmlFor={name}>
        {label}
        {required ? (
          <span aria-hidden="true" className="text-danger">
            {" "}
            *
          </span>
        ) : null}
      </Label>
      {as === "textarea" ? (
        <Textarea
          id={name}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          disabled={disabled}
          {...register(name)}
        />
      ) : (
        <Input
          id={name}
          type={type}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          disabled={disabled}
          {...register(name)}
        />
      )}
      {description ? (
        <p id={descriptionId} className="mt-1 text-sm text-ink-muted">
          {description}
        </p>
      ) : null}
      {error?.message ? (
        <p id={errorId} role="alert" className={cn("mt-1 text-sm text-danger")}>
          {String(error.message)}
        </p>
      ) : null}
    </div>
  );
}

export function FormActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap gap-3">{children}</div>;
}
