import { cn } from "@/shared/utils";
import type { HTMLAttributes } from "react";

type GridProps = HTMLAttributes<HTMLDivElement> & {
  columns?: 1 | 2 | 3 | 4;
};

const columnClass: Record<NonNullable<GridProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

/** Spatial grid only — no business logic. */
export function Grid({ columns = 3, className, ...props }: GridProps) {
  return <div className={cn("grid gap-6", columnClass[columns], className)} {...props} />;
}
