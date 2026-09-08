import type { AnalyticsEventName, AnalyticsPayload, AnalyticsProperties } from "@/shared/types/analytics";

export type AnalyticsProvider = {
  track(event: AnalyticsEventName, properties?: AnalyticsProperties): void;
  page?(path: string, properties?: AnalyticsProperties): void;
  identify?(userId: string, traits?: AnalyticsProperties): void;
};

const queue: AnalyticsPayload[] = [];

const noopProvider: AnalyticsProvider = {
  track() {
    // Provider is registered when an analytics vendor is connected.
  },
};

let provider: AnalyticsProvider = noopProvider;

export function registerAnalyticsProvider(nextProvider: AnalyticsProvider): void {
  provider = nextProvider;

  for (const payload of queue.splice(0)) {
    provider.track(payload.event, payload.properties);
  }
}

export function track(event: AnalyticsEventName, properties?: AnalyticsProperties): void {
  const payload: AnalyticsPayload = {
    event,
    properties,
    timestamp: Date.now(),
    path: typeof window === "undefined" ? undefined : window.location.pathname,
  };

  if (provider === noopProvider) {
    queue.push(payload);
    return;
  }

  provider.track(event, properties);
}
