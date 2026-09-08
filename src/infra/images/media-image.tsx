import Image from "next/image";

import { imageQuality } from "@/infra/config/images";
import type { MediaImage as MediaImageType } from "@/shared/types/media";

type MediaImageProps = {
  image: MediaImageType;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export function MediaImage({ image, sizes, priority = false, className }: MediaImageProps) {
  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width ?? 1600}
      height={image.height ?? 1066}
      sizes={sizes}
      quality={priority ? imageQuality.hero : imageQuality.card}
      placeholder={image.blurDataUrl ? "blur" : "empty"}
      blurDataURL={image.blurDataUrl}
      priority={priority}
      className={className}
    />
  );
}
