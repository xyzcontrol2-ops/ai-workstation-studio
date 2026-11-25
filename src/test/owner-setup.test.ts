import { it, expect } from "vitest";
import { checkOwnerPassword } from "@/lib/owner-setup";
const ok = "a".repeat(72);
it("accepts 72 characters", () => expect(checkOwnerPassword(ok, ok)).toBe(""));
it("rejects 73 characters", () => expect(checkOwnerPassword(ok + "b", ok + "b")).not.toBe(""));
it("rejects under 12", () => expect(checkOwnerPassword("short", "short")).not.toBe(""));
it("rejects mismatch", () => expect(checkOwnerPassword("a".repeat(20), "b".repeat(20))).not.toBe(""));
