import type { LabelHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...props }: LabelProps) {
  return <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />;
}
