import { describe, expect, it } from "vitest";

import { colors, fonts, radii } from "@/shared/theme";

describe("theme tokens", () => {
  it("exposes the brand color set", () => {
    expect(Object.keys(colors)).toEqual([
      "paper",
      "paperElevated",
      "ink",
      "inkMuted",
      "stone",
      "linen",
      "bronze",
      "bronzeHover",
      "sage",
      "danger",
    ]);
  });

  it("keeps font tokens pointed at next/font variables", () => {
    expect(fonts.sans).toBe("var(--font-figtree)");
    expect(fonts.display).toBe("var(--font-newsreader)");
  });

  it("defines radius tokens", () => {
    expect(radii.md).toBe("0.5rem");
  });
});
