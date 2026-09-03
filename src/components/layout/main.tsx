import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

type MainProps = HTMLAttributes<HTMLElement>;

export function Main({ className, ...props }: MainProps) {
  return <main id="main-content" className={cn("flex-1", className)} {...props} />;
}
