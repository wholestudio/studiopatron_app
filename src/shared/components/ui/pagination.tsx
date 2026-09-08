import Link from "next/link";

import { cn } from "@/shared/utils";

type PaginationProps = {
  page: number;
  pageCount: number;
  hrefForPage: (page: number) => string;
  className?: string;
};

export function Pagination({ page, pageCount, hrefForPage, className }: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  const previous = page > 1 ? hrefForPage(page - 1) : undefined;
  const next = page < pageCount ? hrefForPage(page + 1) : undefined;

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center gap-4", className)}>
      {previous ? (
        <Link href={previous} className="text-sm text-ink hover:underline">
          Previous
        </Link>
      ) : (
        <span className="text-sm text-stone">Previous</span>
      )}
      <p className="text-sm text-ink-muted">
        Page {page} of {pageCount}
      </p>
      {next ? (
        <Link href={next} className="text-sm text-ink hover:underline">
          Next
        </Link>
      ) : (
        <span className="text-sm text-stone">Next</span>
      )}
    </nav>
  );
}
