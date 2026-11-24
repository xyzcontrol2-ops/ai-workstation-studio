export type DashGroup = "Command" | "Build" | "Run & Secure" | "Business" | "Intelligence";

export type DashboardSpec = {
  id: string;
  no: number;
  name: string;
  group: DashGroup;
  audience: string; // roles that can open it (role-isolated access)
  purpose: string;
  widgets: string[];
  depts: string[]; // agent departments shown live on it
};

export const groups: DashGroup[] = ["Command", "Build", "Run & Secure", "Business", "Intelligence"];

const d = (no: number, id: string, name: string, group: DashGroup, audience: string, purpose: string, widgets: string[], depts: string[]): DashboardSpec =>
  ({ no, id, name, group, audience, purpose, widgets, depts });

const ALL = ["eng", "devops", "blue", "red", "ai", "data", "qa", "design", "mgmt", "market", "gov"];

export const dashboards: DashboardSpec[] = [
  d(1, "super", "CEO Command Center", "Command", "Owner, CEO", "Poore AYRA platform ka ek jagah se control: agents, clients, paisa, security, kill-switch", ["Global KPIs", "Agent fleet", "Approvals queue", "Revenue", "Security guardrails", "Audit log"], ALL),
  d(2, "agents", "AI Agents Dashboard", "Command", "Owner, Admin, Ops", "100+ agents ki directory: department, risk, status, pause / retire", ["Search + filters", "Risk badges", "Assign to project", "Pause / retire"], ALL),
  d(15, "missions", "Agent Mission Control", "Command", "Admin, Ops", "Har agent ka live mission, step-by-step workflow aur progress", ["Active missions", "Mission timeline", "Blocked agents", "Retry queue", "Agent load"], ALL),
  d(20, "approvals", "Human Approval Center", "Command", "Owner, Admin, Security lead", "High-risk kaam ko insaan ki approval (approve / reject) ke baad hi chalne dena", ["Pending approvals", "Risk level", "Scope & consent", "Decision history", "Auto-expire"], ["red", "devops", "blue"]),
  d(12, "settings", "System Settings Dashboard", "Command", "Owner, Admin", "Roles, access, themes, API keys, notifications, backup", ["Roles & access", "Theme & branding", "API keys", "Notifications", "Backups"], ["mgmt"]),

  d(3, "factory", "Software Factory", "Build", "Admin, Managers, Clients", "Client requirement se delivery tak poora software banane ki assembly line", ["Requirements intake", "Build pipeline", "Agents assigned", "Delivery ETA", "Client sign-off"], ["eng", "design", "qa", "mgmt"]),
  d(4, "dev", "Development Dashboard", "Build", "Developers, Managers", "Code, pull requests, bugs, sprints aur releases", ["Open PRs", "Bug backlog", "Sprint burndown", "Code quality", "Release train"], ["eng", "qa"]),
  d(25, "testlab", "Product Testing Lab", "Build", "QA, Developers", "End-to-end, load, accessibility aur mobile testing ek jagah", ["E2E runs", "Load tests", "Accessibility score", "Device matrix", "Release gate"], ["qa"]),
  d(27, "devportal", "API & Developer Portal", "Build", "Partners, Developers", "API keys, docs, webhooks aur third-party agents publish karna", ["API keys", "Webhooks", "Agent SDK", "Usage & limits", "API docs"], ["eng", "design"]),
  d(21, "training", "AI Training & Fine-Tuning Lab", "Build", "AI engineers", "Agents ko train, evaluate, version aur rollback karna", ["Datasets", "Training runs", "Evals", "Prompt registry", "Model versions"], ["ai", "data"]),

  d(5, "devops", "DevOps & Kubernetes Dashboard", "Run & Secure", "DevOps, SRE", "Servers, clusters, deploys, uptime aur auto-repair", ["Cluster health", "Deploys", "Uptime / SLO", "Auto-heal log", "Cloud cost"], ["devops"]),
  d(6, "security", "Security & Audit Dashboard", "Run & Secure", "Security team, Auditors", "SOC alerts, vulnerabilities, authorized pentests aur audit trail", ["Live alerts", "Vuln backlog", "Threat map", "Authorized test lab", "Audit log"], ["blue", "red"]),
  d(26, "incident", "Incident & Recovery Center", "Run & Secure", "SRE, Security, Owner", "Incident aane par detect, contain, recover aur post-mortem", ["Active incidents", "Response timeline", "Backup & restore", "Recovery time", "Post-mortems"], ["blue", "devops"]),
  d(30, "governance", "Governance & Compliance Center", "Run & Secure", "Compliance, Auditors, Owner", "Policies, DPDP / GDPR / ISO / SOC2 evidence aur risk register", ["Controls", "Evidence", "Risk register", "Policy library", "Certifications"], ["gov", "blue"]),

  d(7, "bizops", "Business Operations Dashboard", "Business", "Managers, Ops", "Clients, projects, staff aur daily operations", ["Active clients", "Projects health", "Workload", "Tickets", "Vendors"], ["mgmt", "market"]),
  d(8, "marketing", "Marketing & SEO Dashboard", "Business", "Marketing", "SEO ranking, content, social media aur campaigns", ["Keyword ranks", "Content calendar", "Social posts", "Campaign ROI", "Traffic"], ["market", "design"]),
  d(9, "sales", "Sales & CRM Dashboard", "Business", "Sales", "Leads, deals, follow-ups aur client pipeline", ["Lead pipeline", "Deals won", "Follow-ups", "Quotes sent", "Forecast"], ["market", "mgmt"]),
  d(10, "finance", "Finance & Revenue Dashboard", "Business", "Finance, Owner", "MRR, invoices, usage billing, GST aur payouts", ["MRR", "Invoices", "Usage meter", "Refunds", "Payouts"], ["market", "data"]),
  d(11, "analytics", "Analytics & Reports Dashboard", "Business", "Owner, Managers", "Poore platform ke KPIs, trends aur auto reports", ["KPI trends", "Agent performance", "Client growth", "Scheduled reports", "Forecasts"], ["data"]),
  d(29, "marketplace", "AI Marketplace", "Business", "Clients, Owner", "Client agent chunta hai, hire karta hai, requirement se match hota hai", ["Agent catalog", "Requirement matcher", "Pricing plans", "Reviews", "Free trials"], ["market", "design"]),

  d(13, "memory", "Memory & Knowledge Center", "Intelligence", "Admin, AI engineers", "AYRA aur agents ki yaaddasht: client notes, docs, knowledge base", ["Knowledge bases", "Client memory", "Index health", "Recent learnings", "Forget / purge"], ["ai", "data"]),
  d(14, "models", "AI Model Control Center", "Intelligence", "Owner, AI engineers", "Kaun sa agent kaun sa AI model use kare: cost, speed, quality", ["Model routing", "Cost per task", "Latency", "Fallbacks", "Usage limits"], ["ai"]),
  d(16, "computer", "Browser & Computer Use Center", "Intelligence", "Admin, Ops", "Agents jo browser / computer chalate hain: live screen, permissions, replay", ["Live sessions", "Allowed sites", "Screen replay", "Permissions", "Stop session"], ["eng", "data", "qa"]),
  d(17, "research", "Research & Intelligence Center", "Intelligence", "Owner, Strategy", "Market, competitor aur technology research reports", ["Research tasks", "Competitor watch", "Trend alerts", "Reports", "Sources"], ["data", "market"]),
  d(22, "twin", "Digital Twin Center", "Intelligence", "Admin, DevOps", "Client system ki virtual copy par bina risk ke test aur simulation", ["Twin environments", "Simulations", "Drift vs production", "What-if runs", "Sync status"], ["devops", "qa", "red"]),
  d(23, "comms", "AI Communication Hub", "Intelligence", "Support, Sales, Ops", "Chat, voice, email aur WhatsApp par agents ki baatcheet", ["Live chats", "Voice calls", "Email queue", "Sentiment", "Handoff to human"], ["market", "ai"]),
  d(24, "docs", "Document Intelligence Center", "Intelligence", "Ops, Finance, Legal", "Documents padhna, samajhna, extract aur summarize karna", ["Upload queue", "Extracted fields", "Summaries", "Contracts review", "Accuracy"], ["data", "gov"]),
  d(18, "integrations", "Integration Hub", "Intelligence", "Admin, Developers", "GitHub, cloud, payment, email aur baaki tools jodna", ["Connected apps", "Sync status", "Webhooks", "Auth tokens", "Error log"], ["eng", "devops"]),
  d(19, "automation", "Workflow Automation Center", "Intelligence", "Admin, Ops", "Agents ke beech auto workflows: trigger, step, condition", ["Workflows", "Triggers", "Run history", "Failures", "Templates"], ["mgmt", "eng"]),
  d(28, "assets", "Digital Asset Manager", "Intelligence", "Design, Marketing", "Logo, images, GIFs, avatars aur agent photos ka library", ["Asset library", "Agent portraits", "Brand kit", "Versions", "Usage rights"], ["design"]),
].sort((a, b) => a.no - b.no);

/** Which agent departments show up live on each dashboard. Extra non-numbered screens included. */
export const dashDepts: Record<string, string[]> = {
  ...Object.fromEntries(dashboards.map((x) => [x.id, x.depts])),
  workstation: ALL, map: ALL,
};

export const architecture = [
  { n: "1", label: "Central AYRA Command Center" },
  { n: "29", label: "Connected dashboard modules" },
  { n: "Roles", label: "Role-isolated access" },
  { n: "AI", label: "Centralized AI control" },
  { n: "360°", label: "Unified monitoring & analytics" },
];

export const guardrails = [
  "Har offensive-security agent ko likhit scope + client consent chahiye",
  "High-risk agents ka har run human approval ke baad hi chalega",
  "Sab kaam sandbox lab me; production par direct attack nahi",
  "Har action ka audit log, Super Admin ke paas kill-switch",
];
