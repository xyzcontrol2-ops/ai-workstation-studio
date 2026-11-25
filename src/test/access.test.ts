import { describe, it, expect } from "vitest";
import { canOpen, grantableRoles } from "@/lib/access";

describe("role access", () => {
  it("owner opens every dashboard", () => expect(canOpen(["owner"], "finance")).toBe(true));
  it("finance role opens finance", () => expect(canOpen(["finance"], "finance")).toBe(true));
  it("developer cannot open finance", () => expect(canOpen(["developer"], "finance")).toBe(false));
  it("user with no role opens nothing", () => expect(canOpen([], "dev")).toBe(false));
  it("admin cannot grant owner or admin", () => {
    const g = grantableRoles(["admin"]);
    expect(g).not.toContain("owner"); expect(g).not.toContain("admin"); expect(g).toContain("developer");
  });
  it("developer cannot grant roles", () => expect(grantableRoles(["developer"])).toEqual([]));
});
