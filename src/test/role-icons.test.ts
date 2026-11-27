import { describe, expect, it } from "vitest";
import { Smartphone, Radar, ImagePlay, ReceiptText } from "lucide-react";
import { agents } from "@/data/agents";
import { dashboards } from "@/data/dashboards";
import { dashboardIcons, getRoleIcon, roleIcons } from "@/components/ayra/RoleIcon";

describe("AYRA role icon registry", () => {
  it("assigns an explicit role icon to every one of the 103 agents", () => {
    expect(agents).toHaveLength(103);
    expect(Object.keys(roleIcons)).toHaveLength(agents.length);
    for (const agent of agents) expect(roleIcons[agent.name], agent.name).toBeDefined();
  });

  it("assigns an explicit icon to every one of the 30 dashboards", () => {
    expect(dashboards).toHaveLength(30);
    for (const dashboard of dashboards) expect(dashboardIcons[dashboard.id], dashboard.name).toBeDefined();
  });

  it("uses the specialist icon instead of a generic department fallback", () => {
    expect(getRoleIcon("Mobile App Dev", "eng")).toBe(Smartphone);
    expect(getRoleIcon("SOC Analyst", "blue")).toBe(Radar);
    expect(getRoleIcon("Motion & GIF Artist", "design")).toBe(ImagePlay);
    expect(getRoleIcon("Billing Agent", "market")).toBe(ReceiptText);
  });
});
