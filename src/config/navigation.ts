import { routes } from "@/constants/routes";

export type NavItem = {
  href: string;
  label: string;
};

export const primaryNavigation: readonly NavItem[] = [
  { href: routes.projects, label: "Projects" },
  { href: routes.designIdeas, label: "Design ideas" },
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
