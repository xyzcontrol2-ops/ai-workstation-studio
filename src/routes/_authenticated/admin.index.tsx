import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Users, FolderKanban, ShieldAlert, IndianRupee, Server, Power, CheckCircle2, ShieldCheck } from "lucide-react";
import { agents, departments } from "@/data/agents";
import { guardrails } from "@/data/dashboards";
import { RoleIcon } from "@/components/ayra/RoleIcon";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "CEO Command Center — AYRA HQ" },
      { name: "description", content: "Super Admin control room for the AYRA AI agent marketplace: fleet, clients, security and approvals." },
      { property: "og:title", content: "CEO Command Center — AYRA HQ" },
      { property: "og:description", content: "Control room for 100+ AI agents, clients, servers and security." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SuperAdmin,
});

const online = agents.filter((a) => a.status === "online" || a.status === "busy").length;
const kpis = [
  { label: "Total Agents", value: agents.length, icon: Bot },
  { label: "Active now", value: online, icon: CheckCircle2 },
  { label: "Clients", value: 42, icon: Users },
  { label: "Live projects", value: 17, icon: FolderKanban },
  { label: "Open security alerts", value: 6, icon: ShieldAlert },
  { label: "MRR (sample)", value: "₹8.4L", icon: IndianRupee },
];
const approvals = [
  "Red Team Simulator → client “Acme Retail” staging scan",
  "Server Repair Agent → rollback prod-api to v2.3.1",
  "Patch Manager → roll out OpenSSL patch to 14 servers",
];
const activity = [
  "Backend Engineer shipped invoice API for client #12",
  "Threat Hunter flagged 3 odd logins — SOC ticket opened",
  "Agent Trainer finished persona update for L1 Support",
  "FinOps Optimizer cut cloud bill by 11% this week",
  "Backup & DR Agent verified restore drill: OK",
];
const health = [["API", 99], ["Agent runtime", 96], ["Servers", 92], ["Training queue", 71]] as const;

function SuperAdmin() {
  return (
    <main className="p-4 md:p-6">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">CEO <span className="text-ai">Command Center</span></h1>
          <p className="text-xs text-muted-foreground">Poore agent marketplace ka ek jagah se control. (Numbers abhi sample hain.)</p>
        </div>
        <button className="flex items-center gap-2 rounded border border-destructive/60 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10"><Power className="h-4 w-4" />Emergency kill-switch</button>
      </header>

      <section className="grid grid-cols-2 gap-3 lg:grid-cols-6">
        {kpis.map(({ label, value, icon: I }) => (
          <div key={label} className="rounded-lg border border-border bg-card p-3 glow-ring">
            <I className="mb-2 h-4 w-4 text-glow" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-[11px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="rounded-lg border border-border bg-panel p-4 lg:col-span-2">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Departments · agent fleet</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {departments.map((d) => (
              <Link key={d.id} to="/admin/agents" search={{ dept: d.id }} className="rounded border border-border bg-card p-3 hover:border-glow">
                <div className="flex items-center justify-between"><span className="font-semibold">{d.name}</span><span className="font-mono text-glow">{d.agents.length}</span></div>
                <p className="mt-1 text-xs text-muted-foreground">{d.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="flex flex-col gap-4">
          <section className="rounded-lg border border-border bg-panel p-4">
            <h2 className="mb-3 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><Server className="h-3 w-3" />System health</h2>
            {health.map(([n, v]) => (
              <div key={n} className="mb-2">
                <div className="flex justify-between text-xs"><span>{n}</span><span className="font-mono">{v}%</span></div>
                <div className="mt-1 h-1.5 rounded bg-secondary"><div className="h-1.5 rounded bg-success" style={{ width: `${v}%` }} /></div>
              </div>
            ))}
          </section>
          <section className="rounded-lg border border-warn/40 bg-panel p-4">
            <h2 className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-warn"><ShieldCheck className="h-3 w-3" />Safety guardrails</h2>
            <ul className="space-y-1.5 text-xs text-muted-foreground">{guardrails.map((g) => <li key={g}>• {g}</li>)}</ul>
          </section>
        </div>

        <section className="rounded-lg border border-border bg-panel p-4">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Approvals waiting ({approvals.length})</h2>
          {approvals.map((a) => (
            <div key={a} className="mb-2 rounded border border-border bg-card p-2 text-xs">
              <p>{a}</p>
              <div className="mt-2 flex gap-2"><button className="rounded bg-primary px-2 py-1 text-primary-foreground">Approve</button><button className="rounded border border-border px-2 py-1">Reject</button></div>
            </div>
          ))}
        </section>
        <section className="rounded-lg border border-border bg-panel p-4 lg:col-span-2">
          <h2 className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Recent activity</h2>
          <ul className="space-y-1.5 font-mono text-xs">{activity.map((a) => <li key={a} className="text-success">$ {a}</li>)}</ul>
        </section>
      </div>
    </main>
  );
}
