import { dashboards } from "@/data/dashboards";

export type Role =
  | "owner" | "admin" | "manager" | "developer" | "devops" | "security"
  | "ai_engineer" | "finance" | "marketing_sales" | "support" | "compliance" | "client";

export const roleLabels: Record<Role, string> = {
  owner: "Owner / CEO", admin: "Admin", manager: "Manager", developer: "Developer", devops: "DevOps / SRE",
  security: "Security", ai_engineer: "AI Engineer", finance: "Finance", marketing_sales: "Marketing & Sales",
  support: "Support", compliance: "Compliance", client: "Client",
};
export const allRoles = Object.keys(roleLabels) as Role[];

// Owner sees everything. Every other role sees only the dashboards listed for it here.
export const dashboardRoles: Record<string, Role[]> = {
  super: ["admin"], agents: ["admin", "manager"], missions: ["admin", "manager"], approvals: ["admin", "security"],
  settings: ["admin"], factory: ["admin", "manager", "developer", "client"], dev: ["admin", "manager", "developer"],
  testlab: ["admin", "developer"], devportal: ["admin", "developer"], training: ["admin", "ai_engineer"],
  devops: ["admin", "devops"], security: ["admin", "security", "compliance"], incident: ["admin", "devops", "security"],
  governance: ["admin", "compliance"], bizops: ["admin", "manager", "support"], marketing: ["admin", "marketing_sales"],
  sales: ["admin", "marketing_sales"], finance: ["finance"], analytics: ["admin", "manager", "finance"],
  marketplace: ["admin", "marketing_sales", "client"], memory: ["admin", "ai_engineer"], models: ["ai_engineer"],
  computer: ["admin", "devops"], research: ["admin", "manager"], twin: ["admin", "devops"],
  comms: ["admin", "support", "marketing_sales"], docs: ["admin", "finance", "compliance", "support"],
  integrations: ["admin", "developer", "devops"], automation: ["admin", "manager", "devops"], assets: ["admin", "marketing_sales"],
};

export function canOpen(roles: Role[], id: string): boolean {
  if (roles.includes("owner")) return true;
  if (id === "map" || id === "workstation") return roles.length > 0;
  return (dashboardRoles[id] ?? []).some((r) => roles.includes(r));
}

export function allowedDashboards(roles: Role[]) {
  return dashboards.filter((d) => canOpen(roles, d.id));
}

/** Who may grant a role: owner any; admin anything except owner/admin. Mirrors the database rules. */
export function grantableRoles(roles: Role[]): Role[] {
  if (roles.includes("owner")) return allRoles;
  if (roles.includes("admin")) return allRoles.filter((r) => r !== "owner" && r !== "admin");
  return [];
}
