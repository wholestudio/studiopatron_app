import type { ReactNode } from "react";

type FilterBarProps = {
  children?: ReactNode;
};

export function FilterBar({ children }: FilterBarProps) {
  return (
    <form
      className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-paper-elevated p-4 sm:flex-row sm:items-end"
      aria-label="Filters"
    >
      {children ?? (
        <p className="text-sm text-ink-muted">Filters will appear here when catalog data is available.</p>
      )}
    </form>
  );
}
