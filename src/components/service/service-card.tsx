import { Card, CardBody } from "@/components/ui/card";
import type { Service } from "@/types/content";

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
