/**
 * Constrained Studio Patron layout vocabulary.
 * Spatial arrangement only — features own meaning/content; services own data.
 *
 * Derived from existing marketing/commerce compositions (container + section + grids).
 * Not an Indore PageRow/PageCol port.
 */
export const pageLayouts = {
  full: "full",
  split: "split",
  splitReverse: "split-reverse",
  threeColumn: "three-column",
  fourColumn: "four-column",
  feature: "feature",
  editorial: "editorial",
  gallery: "gallery",
} as const;

export type PageLayout = (typeof pageLayouts)[keyof typeof pageLayouts];

export const layoutColumns = {
  full: 1,
  split: 2,
  "split-reverse": 2,
  "three-column": 3,
  "four-column": 4,
  feature: 2,
  editorial: 1,
  gallery: 3,
} as const satisfies Record<PageLayout, number>;
