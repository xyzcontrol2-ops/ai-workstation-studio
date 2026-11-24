export type DashboardSpec = {
  id: string;
  name: string;
  audience: string;
  purpose: string;
  widgets: string[];
  phase: 1 | 2 | 3;
  href?: string;
};

export const dashboards: DashboardSpec[] = [
  { id: "super", name: "Super Admin", audience: "Owner / founders", phase: 1, href: "/admin",
    purpose: "Poore platform ka control — agents, clients, security, paisa, kill-switch",
    widgets: ["Global KPIs", "Agent fleet status", "Security guardrails", "Approvals queue", "Revenue", "Audit log"] },
  { id: "agents", name: "Agent Registry", audience: "Super admin, Ops", phase: 1, href: "/admin/agents",
    purpose: "100+ agents ki directory — department, risk level, status",
    widgets: ["Search + filters", "Risk badges", "Assign to project", "Pause / retire"] },
  { id: "workstation", name: "Agent Workstation", audience: "Operators, Clients", phase: 1, href: "/",
    purpose: "VS Code jaisa kaam karne ka screen, AYRA live stage ke saath",
    widgets: ["Chat + live avatar", "Tasks 20%", "Command box 10%", "Terminal", "File explorer"] },
  { id: "marketplace", name: "Agent Marketplace", audience: "Clients (public)", phase: 2,
    purpose: "Client agent chunta hai, hire karta hai, requirement se match hota hai",
    widgets: ["Agent catalog", "Requirement matcher", "Pricing plans", "Reviews", "Hire / trial"] },
  { id: "client", name: "Client Portal", audience: "Clients", phase: 2,
    purpose: "Apne projects, agents, invoices aur reports dekhna",
    widgets: ["My projects", "My agents", "Invoices", "Tickets", "Reports"] },
  { id: "dev", name: "Project & Delivery", audience: "Managers", phase: 2,
    purpose: "Software projects ko plan se delivery tak manage karna",
    widgets: ["Kanban", "Sprints", "Estimates", "Release gates", "Client sign-off"] },
  { id: "server", name: "Server & Infra Ops", audience: "DevOps, Repair agents", phase: 2,
    purpose: "Servers banana, monitor karna, auto-repair aur rollback",
    widgets: ["Fleet map", "Uptime / SLO", "Deploys", "Auto-heal log", "Cost"] },
  { id: "soc", name: "Security Operations (SOC)", audience: "Security team", phase: 2,
    purpose: "Alerts, incidents, vulnerabilities, threat hunting",
    widgets: ["Live alerts", "Incident timeline", "Vuln backlog", "Threat map", "Patch status"] },
  { id: "offsec", name: "Authorized Testing Lab", audience: "Security leads", phase: 2,
    purpose: "White/gray/black-hat style tests — sirf scope + likhit permission ke saath, sandbox me",
    widgets: ["Scope & consent forms", "Approval gate", "Isolated lab", "Findings report", "Retest tracker"] },
  { id: "lab", name: "AI Training Lab", audience: "AI engineers", phase: 3,
    purpose: "Agents ko train, evaluate, version aur repair karna",
    widgets: ["Datasets", "Training runs", "Evals", "Prompt registry", "Rollback"] },
  { id: "billing", name: "Billing & Finance", audience: "Finance", phase: 3,
    purpose: "Subscriptions, usage metering, invoices, GST",
    widgets: ["MRR", "Usage meter", "Invoices", "Refunds", "Payouts"] },
  { id: "support", name: "Support Desk", audience: "Support agents", phase: 3,
    purpose: "Client tickets, SLAs, knowledge base",
    widgets: ["Ticket queue", "SLA timers", "KB", "CSAT"] },
  { id: "people", name: "Workforce (Human + AI)", audience: "HR / Managers", phase: 3,
    purpose: "Insaan aur agents dono ka kaam, load aur performance",
    widgets: ["Roster", "Workload", "Performance", "Hiring"] },
  { id: "compliance", name: "Compliance & Audit", audience: "Compliance, Auditors", phase: 3,
    purpose: "Policies, evidence, audit trails, certifications",
    widgets: ["Controls", "Evidence", "Audit log", "Risk register"] },
  { id: "dev-api", name: "Developer & API", audience: "Partners, Devs", phase: 3,
    purpose: "Third-party agents publish karna, API keys, webhooks",
    widgets: ["API keys", "Webhooks", "Agent SDK", "Usage"] },
];

export const guardrails = [
  "Har offensive-security agent ko likhit scope + client consent chahiye",
  "High-risk agents ka har run human approval ke baad hi chalega",
  "Sab kaam sandbox lab me; production par direct attack nahi",
  "Har action ka audit log, Super Admin ke paas kill-switch",
];
