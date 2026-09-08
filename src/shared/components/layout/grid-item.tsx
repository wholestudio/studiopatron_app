import { cn } from "@/shared/utils";
import type { HTMLAttributes } from "react";

type GridItemProps = HTMLAttributes<HTMLDivElement>;

/** Spatial grid cell only — no business logic. */
export function GridItem({ className, ...props }: GridItemProps) {
  return <div className={cn("min-w-0", className)} {...props} />;
}
