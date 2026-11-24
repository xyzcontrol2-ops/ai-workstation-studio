import { describe, expect, it } from "vitest";
import { themeForHour } from "@/hooks/use-theme";

describe("auto theme by time", () => {
  it("is light during the day (7am-5:59pm)", () => {
    expect(themeForHour(7)).toBe("light");
    expect(themeForHour(17)).toBe("light");
  });
  it("is dark in the evening and night", () => {
    expect(themeForHour(18)).toBe("dark");
    expect(themeForHour(6)).toBe("dark");
  });
});
