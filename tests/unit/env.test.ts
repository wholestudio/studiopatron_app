import { describe, expect, it } from "vitest";

import { parseEnv } from "@/infra/config/env";

describe("parseEnv", () => {
  it("uses local defaults when optional values are empty", () => {
    const env = parseEnv({
      NEXT_PUBLIC_API_URL: "",
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_MEDIA_HOST: "",
    });

    expect(env.NEXT_PUBLIC_API_URL).toBeUndefined();
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("http://localhost:3000");
    expect(env.NEXT_PUBLIC_MEDIA_HOST).toBeUndefined();
    expect(env.NEXT_PUBLIC_APP_ENV).toBe("development");
  });

  it("accepts a configured API origin", () => {
    const env = parseEnv({
      NEXT_PUBLIC_API_URL: "http://localhost:8000",
      NEXT_PUBLIC_SITE_URL: "https://studiopatron.example",
      NEXT_PUBLIC_APP_ENV: "production",
    });

    expect(env.NEXT_PUBLIC_API_URL).toBe("http://localhost:8000");
    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://studiopatron.example");
    expect(env.NEXT_PUBLIC_APP_ENV).toBe("production");
  });

  it("rejects an invalid API URL", () => {
    expect(() => parseEnv({ NEXT_PUBLIC_API_URL: "not-a-url" })).toThrow(/Invalid environment/);
  });
});
