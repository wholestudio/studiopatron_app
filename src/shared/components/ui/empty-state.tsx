import { cn } from "@/shared/utils";

type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export function EmptyState({ title, description, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-dashed border-ink/15 bg-paper-elevated px-6 py-12 text-center",
        className,
      )}
    >
      <p className="font-display text-xl text-ink">{title}</p>
      {description ? <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{description}</p> : null}
    </div>
  );
}
