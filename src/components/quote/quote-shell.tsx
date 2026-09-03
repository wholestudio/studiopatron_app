import { EmptyState } from "@/components/ui/empty-state";

export function QuoteShell() {
  return (
    <EmptyState
      title="Quote request"
      description="Quote fields will be submitted to the lead and quote APIs when those endpoints are connected."
    />
  );
}
