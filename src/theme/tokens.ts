/**
 * Studio Patron design tokens.
 * Keep hex values aligned with `tokens.css` — CSS is what Tailwind and the UI read.
 * This module is for TypeScript contexts (OG images, canvas, inline styles).
 */
export const colors = {
  paper: "#f4efe8",
  paperElevated: "#fbf8f4",
  ink: "#1f1b16",
  inkMuted: "#5c564e",
  stone: "#8a8178",
  linen: "#e4ddd4",
  bronze: "#9a6242",
  bronzeHover: "#824f34",
  sage: "#4f5d50",
  danger: "#8f2d2d",
} as const;

export const fonts = {
  sans: "var(--font-figtree)",
  display: "var(--font-newsreader)",
} as const;

export const radii = {
  sm: "0.25rem",
  md: "0.5rem",
  lg: "0.75rem",
} as const;

export const shadows = {
  soft: "0 8px 24px rgb(31 27 22 / 0.08)",
} as const;

export type ColorToken = keyof typeof colors;
export type FontToken = keyof typeof fonts;
export type RadiusToken = keyof typeof radii;
