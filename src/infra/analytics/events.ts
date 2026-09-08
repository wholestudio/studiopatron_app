import type { AnalyticsEventName } from "@/shared/types/analytics";

export const analyticsEvents = {
  pageView: "page_view",
  productView: "product_view",
  projectView: "project_view",
  designIdeaView: "design_idea_view",
  serviceView: "service_view",
  quoteStarted: "quote_started",
  quoteSubmitted: "quote_submitted",
  calculatorStarted: "calculator_started",
  calculatorCompleted: "calculator_completed",
  leadSubmitted: "lead_submitted",
  addToCart: "add_to_cart",
  checkoutStarted: "checkout_started",
  purchase: "purchase",
} as const satisfies Record<string, AnalyticsEventName>;
