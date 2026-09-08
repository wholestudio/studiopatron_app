type ErrorStateProps = {
  title?: string;
  description?: string;
};

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again. If the problem continues, return to the home page.",
}: ErrorStateProps) {
  return (
    <div role="alert" className="rounded-lg border border-danger/30 bg-paper-elevated px-6 py-10 text-center">
      <p className="font-display text-xl text-ink">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{description}</p>
    </div>
  );
}
