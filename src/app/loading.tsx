import { Container } from "@/components/ui/container";
import { CardSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="grid gap-6 py-16 sm:grid-cols-2 lg:grid-cols-3">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Container>
  );
}
