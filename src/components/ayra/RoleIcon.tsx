import { Code2, Server, ShieldCheck, ShieldAlert, BrainCircuit, ChartNoAxesCombined, FlaskConical, Palette, BriefcaseBusiness, Megaphone, Scale, Database, FileCode2, Bug, Smartphone, Cloud, Network, KeyRound, Search, BookOpen, Headphones, Wallet, Globe, Workflow, Bot, Cpu, ScanEye, GraduationCap, Boxes, FileText, Plug, Image, Store, Crown, Settings, CheckCheck, type LucideIcon } from "lucide-react";
import { agents } from "@/data/agents";
import { cn } from "@/lib/utils";

const departments: Record<string, LucideIcon> = { eng: Code2, devops: Server, blue: ShieldCheck, red: ShieldAlert, ai: BrainCircuit, data: ChartNoAxesCombined, qa: FlaskConical, design: Palette, mgmt: BriefcaseBusiness, market: Megaphone, gov: Scale };
const roleMatchers: [RegExp, LucideIcon][] = [
  [/database|sql|spreadsheet/i, Database], [/mobile/i, Smartphone], [/cloud|cdn/i, Cloud], [/network|wi-fi|zero-trust/i, Network],
  [/secret|iam/i, KeyRound], [/bug|regression|patch/i, Bug], [/code review|refactor|frontend|full-stack|backend|api/i, FileCode2],
  [/vision/i, ScanEye], [/voice|speech|support/i, Headphones], [/train|fine-tun|eval/i, GraduationCap], [/research|hunter|forensic/i, Search],
  [/writer|rag|knowledge/i, BookOpen], [/bill|price|pricing|account|finops/i, Wallet], [/scraper|seo|localization/i, Globe], [/pipeline|automation|mlops/i, Workflow],
];
const dashboardIcons: Record<string, LucideIcon> = { super: Crown, agents: Bot, factory: Boxes, dev: Code2, devops: Server, security: ShieldCheck, bizops: BriefcaseBusiness, marketing: Megaphone, sales: Headphones, finance: Wallet, analytics: ChartNoAxesCombined, settings: Settings, memory: BookOpen, models: BrainCircuit, missions: Cpu, computer: Globe, research: Search, integrations: Plug, automation: Workflow, approvals: CheckCheck, training: GraduationCap, twin: Boxes, comms: Headphones, docs: FileText, testlab: FlaskConical, incident: ShieldAlert, devportal: FileCode2, assets: Image, marketplace: Store, governance: Scale };
const tones: Record<string, string> = { eng: "text-glow", devops: "text-success", blue: "text-glow", red: "text-destructive", ai: "text-signal", data: "text-success", qa: "text-warn", design: "text-creative", mgmt: "text-warn", market: "text-creative", gov: "text-success" };

export function RoleIcon({ name, dept, dashboard, className, badge = false }: { name?: string; dept?: string; dashboard?: string; className?: string; badge?: boolean }) {
  const resolvedDept = dept ?? agents.find((a) => a.name === name)?.dept ?? "ai";
  const Icon = dashboard ? dashboardIcons[dashboard] ?? Bot : roleMatchers.find(([pattern]) => pattern.test(name ?? ""))?.[1] ?? departments[resolvedDept] ?? Bot;
  return <span title={name ?? dashboard ?? resolvedDept} className={cn("inline-flex shrink-0 items-center justify-center", tones[resolvedDept], badge && "role-badge h-10 w-10 rounded-md", className)}><Icon className={badge ? "h-5 w-5" : "h-3.5 w-3.5"} strokeWidth={1.7} aria-hidden="true" /></span>;
}