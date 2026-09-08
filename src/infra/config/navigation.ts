import { routes } from "@/shared/constants/routes";

export type NavItem = {
  href: string;
  label: string;
  children?: readonly NavItem[];
};

export const primaryNavigation: readonly NavItem[] = [
  { href: routes.projects, label: "Projects" },
  {
    href: routes.designIdeas,
    label: "Design ideas",
    children: [
      { href: `${routes.designIdeas}/kitchen-designs`, label: "Modular kitchen designs" },
      { href: `${routes.designIdeas}/wardrobe-designs`, label: "Wardrobe designs" },
      { href: `${routes.designIdeas}/bedroom-designs`, label: "Bedroom designs" },
      { href: `${routes.designIdeas}/bathroom-designs`, label: "Bathroom designs" },
      { href: `${routes.designIdeas}/living-room-designs`, label: "Living room designs" },
    ],
  },
  { href: routes.services, label: "Services" },
  { href: routes.products, label: "Products" },
  { href: routes.about, label: "About" },
  { href: routes.blog, label: "Journal" },
  { href: routes.contact, label: "Contact" },
];

export const conversionNavigation: readonly NavItem[] = [
  { href: routes.quote, label: "Request a quote" },
  { href: routes.calculator, label: "Price calculator" },
];

export const commerceNavigation: readonly NavItem[] = [
  { href: routes.cart, label: "Cart" },
  { href: routes.checkout, label: "Checkout" },
  { href: routes.orders, label: "Orders" },
];

export const accountNavigation: readonly NavItem[] = [
  { href: routes.account, label: "Overview" },
  { href: routes.accountProfile, label: "Profile" },
  { href: routes.accountAddresses, label: "Addresses" },
  { href: routes.accountOrders, label: "Orders" },
];

export const footerNavigation = {
  explore: primaryNavigation,
  services: conversionNavigation,
  account: [
    { href: routes.login, label: "Sign in" },
    { href: routes.register, label: "Create account" },
    { href: routes.account, label: "Account" },
  ],
} as const;
