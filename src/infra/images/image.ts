import type { MediaImage } from "@/shared/types/media";

export type RemoteImageSource = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
};

export function toRemoteImage(image: MediaImage): RemoteImageSource {
  return {
    src: image.src,
    alt: image.alt,
    width: image.width,
    height: image.height,
    blurDataURL: image.blurDataUrl,
  };
}

export function isRemoteImageSrc(src: string): boolean {
  return src.startsWith("http://") || src.startsWith("https://");
}
