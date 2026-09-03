import { cn } from "@/lib/utils";

type PageHeaderProps = {
  title: string;
  description?: string;
  className?: string;
};

export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h1 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">{title}</h1>
      {description ? <p className="mt-4 text-base leading-7 text-ink-muted">{description}</p> : null}
    </div>
  );
}
