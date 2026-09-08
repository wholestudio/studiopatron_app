export const imageSizes = {
  thumb: "96px",
  card: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  gallery: "(max-width: 768px) 100vw, 80vw",
  hero: "100vw",
  product: "(max-width: 768px) 100vw, 50vw",
} as const;

export const imageQuality = {
  thumbnail: 70,
  card: 75,
  gallery: 80,
  hero: 85,
} as const;
