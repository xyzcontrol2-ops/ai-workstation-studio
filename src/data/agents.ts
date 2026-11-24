export type Agent = {
  id: string;
  name: string;
  specialty: string;
  dept: string;
  status: "online" | "busy" | "idle" | "training";
  risk: "low" | "medium" | "high";
};

export type Dept = { id: string; name: string; blurb: string; tools: string; agents: [string, string][] };

// risk "high" = needs human approval + scoped authorization before every run.
export const departments: Dept[] = [
  {
    id: "eng", name: "Software Engineering", blurb: "Client ke liye software banana, sudharna, modernize karna",
    tools: "Git, IDE, Docker, Package managers, API clients, Linters",
    agents: [
      ["Frontend Architect", "React/Next UI, design systems"], ["Backend Engineer", "APIs, microservices, queues"],
      ["Full-Stack Builder", "Idea se MVP tak end-to-end"], ["Mobile App Dev", "iOS/Android, Flutter, React Native"],
      ["API Designer", "REST/GraphQL, OpenAPI contracts"], ["Database Architect", "Schema, indexing, migrations"],
      ["Code Reviewer", "PR review, best practices"], ["Refactor Specialist", "Clean code, tech-debt reduction"],
      ["Bug Fixer", "Reproduce, root-cause, patch"], ["Legacy Modernizer", "COBOL/PHP/Java -> modern stack"],
      ["Game Developer", "Unity/Unreal/Godot gameplay"], ["Embedded & IoT Dev", "Firmware, sensors, MQTT"],
      ["Blockchain Dev", "Smart contracts, audits-ready code"], ["Low-Code Builder", "Automation, internal tools"],
    ],
  },
  {
    id: "devops", name: "DevOps & Server Ops", blurb: "Server banana, manage karna, repair karna",
    tools: "Terraform, Kubernetes, Ansible, SSH, Prometheus, Grafana",
    agents: [
      ["Cloud Architect", "AWS/GCP/Azure design"], ["Kubernetes Operator", "Clusters, scaling, Helm"],
      ["CI/CD Pipeline Agent", "Build, test, deploy automation"], ["Linux SysAdmin", "Hardening, tuning, cron, services"],
      ["Server Repair Agent", "Crash diagnosis, auto-heal, rollback"], ["Network Engineer", "DNS, VPN, firewall, routing"],
      ["SRE Monitor", "Uptime, SLOs, alerting"], ["Backup & DR Agent", "Snapshots, restore drills"],
      ["FinOps Optimizer", "Cloud cost cutting"], ["Database Admin", "Replication, tuning, recovery"],
      ["CDN & Edge Agent", "Caching, load balancing"], ["Container Builder", "Docker images, registries"],
    ],
  },
  {
    id: "blue", name: "Cyber Defense (Blue Team)", blurb: "Apni aur client ki safety — detect, respond, recover",
    tools: "SIEM, EDR, IDS/IPS, WAF, Vulnerability scanners, Secret scanners",
    agents: [
      ["SOC Analyst", "24x7 alert triage"], ["Incident Responder", "Contain, eradicate, recover"],
      ["Threat Hunter", "Proactive anomaly hunting"], ["Malware Analyst", "Sandbox analysis, IOCs"],
      ["Digital Forensics", "Evidence, timeline, chain of custody"], ["Vulnerability Manager", "Scan, prioritize, track fixes"],
      ["Patch Manager", "Safe patch rollout"], ["SIEM Log Analyst", "Correlation rules, log pipelines"],
      ["IAM Guardian", "Access reviews, least privilege"], ["Zero-Trust Architect", "Segmentation, device trust"],
      ["Phishing Defender", "Email filtering, takedowns"], ["DLP Agent", "Data leak prevention"],
      ["Cloud Posture Agent", "CSPM, misconfig detection"], ["Secrets Scanner", "Leaked keys in repos/CI"],
    ],
  },
  {
    id: "red", name: "Authorized Offensive Security", blurb: "White / gray / black-hat soch se — sirf apne ya likhit-anumati wale systems par",
    tools: "Scoped pentest suite, fuzzers, adversary emulation, isolated sandbox lab",
    agents: [
      ["White-Hat Pentester", "Scoped penetration tests"], ["Gray-Hat Bounty Triager", "Bug-bounty reports ko validate karna"],
      ["Red Team Simulator", "Adversary emulation (MITRE ATT&CK)"], ["Phishing Awareness Tester", "Staff training simulations"],
      ["Web App Security Tester", "OWASP Top 10 checks"], ["API Security Fuzzer", "Auth/rate-limit/logic flaws"],
      ["Network & Wi-Fi Auditor", "Own network exposure review"], ["Exploit Risk Validator", "Lab me patch effectiveness verify"],
    ],
  },
  {
    id: "ai", name: "AI & Agent Lab", blurb: "Agents ko develop, train, evaluate aur repair karna",
    tools: "Training pipelines, vector DBs, eval harness, prompt registry",
    agents: [
      ["ML Engineer", "Models train + deploy"], ["Prompt Engineer", "Prompt design, versioning"],
      ["Data Scientist", "Modeling, experiments"], ["Fine-Tuning Agent", "Domain-specific tuning"],
      ["Agent Trainer", "Behaviour, persona, tool-use training"], ["RAG Specialist", "Knowledge bases, retrieval"],
      ["Agent Evaluator", "Benchmarks, regression tests"], ["MLOps Agent", "Model registry, drift watch"],
      ["Computer Vision Agent", "Image/video understanding"], ["Voice & Speech Agent", "STT, TTS, call agents"],
    ],
  },
  {
    id: "data", name: "Data & Analytics", blurb: "Data ko insight me badalna",
    tools: "SQL, dbt, Airflow, BI dashboards, notebooks",
    agents: [
      ["Data Engineer", "Pipelines, ETL/ELT"], ["BI Analyst", "Dashboards, KPIs"], ["Data Quality Agent", "Validation, anomaly checks"],
      ["Web Scraper Agent", "Legal data collection"], ["Forecasting Agent", "Demand, revenue predictions"],
      ["Data Privacy Agent", "Masking, anonymization"], ["Report Writer", "Auto client reports"], ["Spreadsheet Wizard", "Excel/Sheets automation"],
    ],
  },
  {
    id: "qa", name: "QA & Testing", blurb: "Delivery se pehle quality",
    tools: "Playwright, Jest, k6, Selenium, device farm",
    agents: [
      ["E2E Test Agent", "Browser flows"], ["Unit Test Writer", "Coverage badhana"], ["Performance Tester", "Load & stress"],
      ["Accessibility Auditor", "WCAG checks"], ["Mobile QA Agent", "Device matrix"], ["Regression Guard", "Release gate"], ["UAT Coordinator", "Client sign-off"],
    ],
  },
  {
    id: "design", name: "Product & Design", blurb: "Kya banana hai aur kaisa dikhna hai",
    tools: "Figma-like canvas, research tools, docs",
    agents: [
      ["UI Designer", "Screens, components"], ["UX Researcher", "Flows, usability"], ["Product Manager", "Roadmap, priorities"],
      ["Business Analyst", "Requirements -> specs"], ["Technical Writer", "Docs, API guides"], ["Brand Designer", "Logo, identity"],
      ["Motion & GIF Artist", "Animations, icons"], ["Localization Agent", "Hindi + 40 languages"],
    ],
  },
  {
    id: "mgmt", name: "Project & Operations", blurb: "Client, team aur delivery manage karna",
    tools: "Kanban, time tracking, CRM, calendars",
    agents: [
      ["Project Manager", "Plans, milestones, risks"], ["Scrum Master", "Sprints, standups"], ["Client Onboarding Agent", "Requirement intake"],
      ["Requirement Analyst", "Scope clarity"], ["Estimator", "Time + cost quotes"], ["Recruiter Agent", "Human talent sourcing"],
      ["Resource Allocator", "Agent/human task matching"], ["Vendor Manager", "Third-party tracking"],
    ],
  },
  {
    id: "market", name: "Marketplace, Sales & Support", blurb: "Agents bechna, client sambhalna",
    tools: "CRM, billing, helpdesk, SEO suite, social schedulers",
    agents: [
      ["Marketplace Curator", "Agent listings quality"], ["Pricing Strategist", "Plans, usage pricing"], ["Billing Agent", "Invoices, subscriptions"],
      ["L1 Support Agent", "Instant answers"], ["L2 Technical Support", "Deep troubleshooting"], ["Sales Agent", "Leads -> deals"],
      ["SEO Specialist", "Ranking, content"], ["Social Media Manager", "Posts, replies"], ["Accounts Agent", "Bookkeeping, GST"],
    ],
  },
  {
    id: "gov", name: "Compliance & Governance", blurb: "Kanoon aur rules ke andar rehna",
    tools: "Policy library, audit logs, evidence collectors",
    agents: [
      ["DPDP / GDPR Agent", "Privacy law compliance"], ["ISO 27001 Auditor", "Controls, evidence"], ["SOC 2 Readiness Agent", "Trust criteria"],
      ["Risk Manager", "Risk register"], ["Policy Writer", "Internal policies, T&C"],
    ],
  },
];

const statuses: Agent["status"][] = ["online", "online", "busy", "online", "idle", "training"];

export const agents: Agent[] = departments.flatMap((d) =>
  d.agents.map(([name, specialty], i) => ({
    id: `${d.id}-${i + 1}`,
    name,
    specialty,
    dept: d.id,
    status: statuses[(i + d.id.length) % statuses.length]!,
    risk: d.id === "red" ? "high" : d.id === "devops" && i === 4 ? "medium" : d.id === "blue" && i === 1 ? "medium" : "low",
  })),
);
