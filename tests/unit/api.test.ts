import { describe, expect, it } from "vitest";

import { ApiConfigError, ApiError, isApiError } from "@/infra/api/errors";
import { apiRequest } from "@/infra/api/request";

describe("api client errors", () => {
  it("identifies ApiError instances", () => {
    const error = new ApiError("Not found", 404, { code: "NOT_FOUND" });

    expect(isApiError(error)).toBe(true);
    expect(error.status).toBe(404);
    expect(error.code).toBe("NOT_FOUND");
  });

  it("throws when the API origin is missing", async () => {
    await expect(apiRequest("/api/v1/public/products")).rejects.toBeInstanceOf(ApiConfigError);
  });
});
