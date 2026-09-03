export type AnalyticsEventName =
  | "page_view"
  | "product_view"
  | "project_view"
  | "design_idea_view"
  | "service_view"
  | "quote_started"
  | "quote_submitted"
  | "calculator_started"
  | "calculator_completed"
  | "lead_submitted"
  | "add_to_cart"
  | "checkout_started"
  | "purchase";

export type AnalyticsProperties = Record<string, string | number | boolean | null | undefined>;

export type AnalyticsPayload = {
  event: AnalyticsEventName;
  properties?: AnalyticsProperties;
  timestamp: number;
  path?: string;
};
