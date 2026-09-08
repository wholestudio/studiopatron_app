import { Card, CardBody } from "@/shared/components/ui/card";
import type { Service } from "@/shared/types/content";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card>
      <CardBody>
        <h3 className="font-display text-xl text-ink">{service.title}</h3>
        {service.excerpt ? <p className="text-sm text-ink-muted">{service.excerpt}</p> : null}
      </CardBody>
    </Card>
  );
}
