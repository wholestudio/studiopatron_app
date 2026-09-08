import { EmptyState } from "@/shared/components/ui/empty-state";
import type { MediaImage } from "@/shared/types/media";

type GalleryProps = {
  items?: MediaImage[];
  label?: string;
};

export function Gallery({ items = [], label = "Gallery" }: GalleryProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title={label}
        description="Gallery images will render here from the CMS media system. Business images are not stored in this repository."
      />
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label={label}>
      {items.map((item) => (
        <li key={item.src} className="overflow-hidden rounded-lg bg-linen">
          {/* next/image is wired when a remote media host is configured. */}
          <div className="aspect-[4/3]" role="img" aria-label={item.alt} />
        </li>
      ))}
    </ul>
  );
}
