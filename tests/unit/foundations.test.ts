import { describe, expect, it } from "vitest";

import { queryKeys } from "@/infra/query/keys";
import { toCanonicalUrl } from "@/infra/seo/canonical";
import { breadcrumbJsonLd, productJsonLd } from "@/infra/seo/json-ld";
import { loginSchema } from "@/infra/validation/auth";
import { cn } from "@/shared/utils";
import { isProtectedPath } from "@/infra/auth/guards";
import { analyticsEvents } from "@/infra/analytics/events";

describe("query keys", () => {
  it("keeps product detail keys stable", () => {
    expect(queryKeys.products.detail("oak-chair")).toEqual(["products", "detail", "oak-chair"]);
  });
});

describe("seo helpers", () => {
  it("builds canonical URLs from a path", () => {
    expect(toCanonicalUrl("/projects")).toBe("http://localhost:3000/projects");
    expect(toCanonicalUrl("/")).toBe("http://localhost:3000/");
  });

  it("creates breadcrumb and product JSON-LD", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]);
    const product = productJsonLd({ name: "Product" });

    expect(crumbs["@type"]).toBe("BreadcrumbList");
    expect(product["@type"]).toBe("Product");
  });
});

describe("validation", () => {
  it("requires a valid login email and password", () => {
    const result = loginSchema.safeParse({ email: "invalid", password: "short" });
    expect(result.success).toBe(false);
  });
});

describe("utilities", () => {
  it("merges class names", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("protects account routes", () => {
    expect(isProtectedPath("/account")).toBe(true);
    expect(isProtectedPath("/account/orders")).toBe(true);
    expect(isProtectedPath("/login")).toBe(false);
  });

  it("exposes required analytics events", () => {
    expect(analyticsEvents.pageView).toBe("page_view");
    expect(analyticsEvents.purchase).toBe("purchase");
  });
});
