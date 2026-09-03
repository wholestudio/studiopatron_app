import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, id, ...props }: TextareaProps) {
  return (
    <textarea
      id={id}
      className={cn(
        "min-h-32 w-full rounded-md border border-ink/15 bg-paper-elevated px-3 py-2 text-base text-ink placeholder:text-stone",
        "disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
