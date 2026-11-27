import {
  Accessibility, Activity, AppWindow, ArchiveRestore, AudioLines, BadgeIndianRupee, Blocks,
  BookOpen, BookOpenCheck, Bot, BrainCircuit, BriefcaseBusiness, Bug, Cable, Calculator,
  ChartColumnIncreasing, ChartNoAxesCombined, ChartSpline, CheckCheck, ClipboardCheck,
  ClipboardList, Cloud, CloudCog, CloudDownload, Code2, Container, Cpu, Crosshair, Crown,
  Database, DatabaseZap, EyeOff, FileChartColumn, FileCode2, FileKey, FileSearch,
  FileSpreadsheet, Figma, FlaskConical, Gamepad2, Gauge, Globe, GraduationCap, HandCoins,
  Headphones, Headset, Image, ImagePlay, KeyRound, Languages, Link2, ListChecks, ListTodo,
  LockKeyhole, MailWarning, Megaphone, MessageSquareCode, MonitorCheck, MonitorSmartphone,
  Network, NotebookPen, Palette, PenTool, Radar, RadioTower, ReceiptText, RefreshCcw, Scale,
  ScanEye, ScanLine, ScanSearch, Search, SearchCheck, Server, ServerCog, Settings, Share2,
  ShieldAlert, ShieldCheck, ShieldEllipsis, SlidersHorizontal, Smartphone, SquareCode,
  SquareKanban, SquareTerminal, Store, Tags, TrendingUp, UserPlus, UserRoundCheck, UsersRound,
  Wallet, Waypoints, Wifi, Workflow, Wrench, type LucideIcon,
} from "lucide-react";
import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";

export const departmentIcons: Record<string, LucideIcon> = {
  eng: Code2, devops: Server, blue: ShieldCheck, red: ShieldAlert, ai: BrainCircuit,
  data: ChartNoAxesCombined, qa: FlaskConical, design: Palette, mgmt: BriefcaseBusiness,
  market: Megaphone, gov: Scale,
};

/** Every specialist has an intentional icon; adding an agent without one breaks the registry test. */
export const roleIcons: Record<string, LucideIcon> = {
  "Frontend Architect": AppWindow,
  "Backend Engineer": SquareCode,
  "Full-Stack Builder": Blocks,
  "Mobile App Dev": Smartphone,
  "API Designer": Cable,
  "Database Architect": Database,
  "Code Reviewer": GitPullRequestIcon,
  "Refactor Specialist": RefreshCcw,
  "Bug Fixer": Bug,
  "Legacy Modernizer": ArchiveRestore,
  "Game Developer": Gamepad2,
  "Embedded & IoT Dev": Cpu,
  "Blockchain Dev": Link2,
  "Low-Code Builder": Blocks,

  "Cloud Architect": Cloud,
  "Kubernetes Operator": Container,
  "CI/CD Pipeline Agent": Workflow,
  "Linux SysAdmin": SquareTerminal,
  "Server Repair Agent": ServerCog,
  "Network Engineer": Network,
  "SRE Monitor": Activity,
  "Backup & DR Agent": CloudDownload,
  "FinOps Optimizer": HandCoins,
  "Database Admin": DatabaseZap,
  "CDN & Edge Agent": RadioTower,
  "Container Builder": Container,

  "SOC Analyst": Radar,
  "Incident Responder": SirenIcon,
  "Threat Hunter": Crosshair,
  "Malware Analyst": ScanSearch,
  "Digital Forensics": FileSearch,
  "Vulnerability Manager": ShieldEllipsis,
  "Patch Manager": Wrench,
  "SIEM Log Analyst": ScrollTextIcon,
  "IAM Guardian": KeyRound,
  "Zero-Trust Architect": LockKeyhole,
  "Phishing Defender": MailWarning,
  "DLP Agent": ShieldCheck,
  "Cloud Posture Agent": CloudCog,
  "Secrets Scanner": FileKey,

  "White-Hat Pentester": ShieldCheck,
  "Gray-Hat Bounty Triager": SearchCheck,
  "Red Team Simulator": Crosshair,
  "Phishing Awareness Tester": MailWarning,
  "Web App Security Tester": AppWindow,
  "API Security Fuzzer": FlaskConical,
  "Network & Wi-Fi Auditor": Wifi,
  "Exploit Risk Validator": ShieldAlert,

  "ML Engineer": BrainCircuit,
  "Prompt Engineer": MessageSquareCode,
  "Data Scientist": ChartSpline,
  "Fine-Tuning Agent": SlidersHorizontal,
  "Agent Trainer": GraduationCap,
  "RAG Specialist": BookOpenCheck,
  "Agent Evaluator": ListChecks,
  "MLOps Agent": Workflow,
  "Computer Vision Agent": ScanEye,
  "Voice & Speech Agent": AudioLines,

  "Data Engineer": Workflow,
  "BI Analyst": ChartColumnIncreasing,
  "Data Quality Agent": ListChecks,
  "Web Scraper Agent": Globe,
  "Forecasting Agent": TrendingUp,
  "Data Privacy Agent": EyeOff,
  "Report Writer": FileChartColumn,
  "Spreadsheet Wizard": FileSpreadsheet,

  "E2E Test Agent": MonitorCheck,
  "Unit Test Writer": SquareCode,
  "Performance Tester": Gauge,
  "Accessibility Auditor": Accessibility,
  "Mobile QA Agent": MonitorSmartphone,
  "Regression Guard": ShieldCheck,
  "UAT Coordinator": UserRoundCheck,

  "UI Designer": PenTool,
  "UX Researcher": Search,
  "Product Manager": SquareKanban,
  "Business Analyst": ClipboardList,
  "Technical Writer": NotebookPen,
  "Brand Designer": Figma,
  "Motion & GIF Artist": ImagePlay,
  "Localization Agent": Languages,

  "Project Manager": SquareKanban,
  "Scrum Master": RefreshCcw,
  "Client Onboarding Agent": UserPlus,
  "Requirement Analyst": ListTodo,
  "Estimator": Calculator,
  "Recruiter Agent": UsersRound,
  "Resource Allocator": Waypoints,
  "Vendor Manager": BriefcaseBusiness,

  "Marketplace Curator": Store,
  "Pricing Strategist": Tags,
  "Billing Agent": ReceiptText,
  "L1 Support Agent": Headphones,
  "L2 Technical Support": Headset,
  "Sales Agent": TrendingUp,
  "SEO Specialist": SearchCheck,
  "Social Media Manager": Share2,
  "Accounts Agent": BadgeIndianRupee,

  "DPDP / GDPR Agent": LockKeyhole,
  "ISO 27001 Auditor": ClipboardCheck,
  "SOC 2 Readiness Agent": ShieldCheck,
  "Risk Manager": ShieldAlert,
  "Policy Writer": ScrollTextIcon,
};

export const dashboardIcons: Record<string, LucideIcon> = {
  super: Crown, agents: Bot, factory: Blocks, dev: Code2, devops: Server,
  security: ShieldCheck, bizops: BriefcaseBusiness, marketing: Megaphone, sales: Headphones,
  finance: Wallet, analytics: ChartNoAxesCombined, settings: Settings, memory: BookOpen,
  models: BrainCircuit, missions: Cpu, computer: Globe, research: Search, integrations: Cable,
  automation: Workflow, approvals: CheckCheck, training: GraduationCap, twin: Blocks,
  comms: Headphones, docs: FileChartColumn, testlab: FlaskConical, incident: ShieldAlert,
  devportal: FileCode2, assets: Image, marketplace: Store, governance: Scale,
};

const tones: Record<string, string> = {
  eng: "text-dept-eng", devops: "text-dept-devops", blue: "text-dept-blue",
  red: "text-dept-red", ai: "text-dept-ai", data: "text-dept-data", qa: "text-dept-qa",
  design: "text-dept-design", mgmt: "text-dept-mgmt", market: "text-dept-market",
  gov: "text-dept-gov",
};

export function getRoleIcon(name?: string, dept = "ai"): LucideIcon {
  return (name ? roleIcons[name] : undefined) ?? departmentIcons[dept] ?? Bot;
}

export function RoleIcon({ name, dept, dashboard, className, badge = false }: {
  name?: string; dept?: string; dashboard?: string; className?: string; badge?: boolean;
}) {
  const resolvedDept = dept ?? agents.find((a) => a.name === name)?.dept ?? "ai";
  const Icon = dashboard ? dashboardIcons[dashboard] ?? Bot : getRoleIcon(name, resolvedDept);
  const label = name ?? dashboard ?? resolvedDept;
  return (
    <span
      title={label}
      role="img"
      aria-label={`${label} role icon`}
      className={cn("inline-flex shrink-0 items-center justify-center", tones[resolvedDept], badge && "role-badge h-10 w-10 rounded-lg", className)}
    >
      <Icon className={badge ? "h-5 w-5" : "h-3.5 w-3.5"} strokeWidth={1.8} aria-hidden="true" />
    </span>
  );
}

// Aliases keep the registry readable while using the same crisp Lucide vector set.
import { GitPullRequest as GitPullRequestIcon, Siren as SirenIcon, ScrollText as ScrollTextIcon } from "lucide-react";
