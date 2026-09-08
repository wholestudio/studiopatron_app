import Link from "next/link";

import { cn } from "@/shared/utils";
import type { BreadcrumbItem } from "@/shared/types/seo";

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("text-sm text-ink-muted", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-ink">
                  {item.name}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="text-stone">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
