import { cn } from "@/shared/utils";
import type { HTMLAttributes } from "react";

type LayoutSectionProps = HTMLAttributes<HTMLElement> & {
  as?: "section" | "div";
};

/**
 * Spatial page section wrapper (padding rhythm only).
 * For titled content blocks, prefer `@/shared/components/sections` Section.
 */
export function LayoutSection({ as: Component = "section", className, ...props }: LayoutSectionProps) {
  return <Component className={cn("py-12 sm:py-16", className)} {...props} />;
}
