import type { InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, id, ...props }: InputProps) {
  return (
    <input
      id={id}
      className={cn(
        "h-11 w-full rounded-md border border-ink/15 bg-paper-elevated px-3 text-base text-ink placeholder:text-stone",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
