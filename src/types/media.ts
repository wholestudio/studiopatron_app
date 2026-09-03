export type MediaImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  blurDataUrl?: string;
  caption?: string;
  mimeType?: string;
};

export type MediaGallery = {
  items: MediaImage[];
};
