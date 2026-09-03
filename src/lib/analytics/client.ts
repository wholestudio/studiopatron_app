import { analyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import type { AnalyticsProperties } from "@/types/analytics";

export const analytics = {
  pageView: (properties?: AnalyticsProperties) => track(analyticsEvents.pageView, properties),
  productView: (properties?: AnalyticsProperties) => track(analyticsEvents.productView, properties),
  projectView: (properties?: AnalyticsProperties) => track(analyticsEvents.projectView, properties),
  designIdeaView: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.designIdeaView, properties),
  serviceView: (properties?: AnalyticsProperties) => track(analyticsEvents.serviceView, properties),
  quoteStarted: (properties?: AnalyticsProperties) => track(analyticsEvents.quoteStarted, properties),
  quoteSubmitted: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.quoteSubmitted, properties),
  calculatorStarted: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.calculatorStarted, properties),
  calculatorCompleted: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.calculatorCompleted, properties),
  leadSubmitted: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.leadSubmitted, properties),
  addToCart: (properties?: AnalyticsProperties) => track(analyticsEvents.addToCart, properties),
  checkoutStarted: (properties?: AnalyticsProperties) =>
    track(analyticsEvents.checkoutStarted, properties),
  purchase: (properties?: AnalyticsProperties) => track(analyticsEvents.purchase, properties),
};
