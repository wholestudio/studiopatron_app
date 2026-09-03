import Link from "next/link";

import { Card, CardBody } from "@/components/ui/card";
import { routes } from "@/constants/routes";
import type { Project } from "@/types/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      <div className="aspect-[4/3] bg-linen" aria-hidden="true" />
      <CardBody>
        <h3 className="font-display text-xl text-ink">
          <Link href={routes.project(project.slug)} className="hover:text-bronze">
            {project.title}
          </Link>
        </h3>
        {project.excerpt ? <p className="text-sm text-ink-muted">{project.excerpt}</p> : null}
      </CardBody>
    </Card>
  );
}
