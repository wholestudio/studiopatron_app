import { EmptyState } from "@/shared/components/ui/empty-state";

type ContentPlaceholderProps = {
  title: string;
  description: string;
};

export function ContentPlaceholder({ title, description }: ContentPlaceholderProps) {
  return <EmptyState title={title} description={description} />;
}
