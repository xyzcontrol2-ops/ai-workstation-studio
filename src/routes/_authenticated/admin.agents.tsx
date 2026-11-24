import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { agents, departments } from "@/data/agents";

export const Route = createFileRoute("/_authenticated/admin/agents")({
  validateSearch: (s: Record<string, unknown>): { dept?: string } => (typeof s["dept"] === "string" ? { dept: s["dept"] } : {}),
  head: () => ({
    meta: [
      { title: "AI Agents Dashboard — AYRA HQ" },
      { name: "description", content: "Directory of 100+ expert AI agents across engineering, DevOps, security, AI and more." },
      { property: "og:title", content: "AI Agents Dashboard — AYRA HQ" },
      { property: "og:description", content: "100+ expert AI agents with department, status and risk level." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Registry,
});

const dot = { online: "bg-success", busy: "bg-warn", idle: "bg-muted-foreground", training: "bg-glow" } as const;
const riskCls = { low: "text-success", medium: "text-warn", high: "text-destructive" } as const;

function Registry() {
  const { dept } = Route.useSearch();
  const nav = useNavigate({ from: "/admin/agents" });
  const [q, setQ] = useState("");
  const list = useMemo(
    () => agents.filter((a) => (!dept || a.dept === dept) && (a.name + a.specialty).toLowerCase().includes(q.toLowerCase())),
    [dept, q],
  );
  const cur = departments.find((d) => d.id === dept);

  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl font-bold">Agent <span className="text-ai">Registry</span> <span className="font-mono text-sm text-muted-foreground">({list.length}/{agents.length})</span></h1>
      <div className="my-4 flex flex-wrap items-center gap-2">
        <div className="relative"><Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Agent ya skill dhundhein…" className="w-64 rounded border border-input bg-background py-1.5 pl-8 pr-2 text-xs outline-none focus:border-glow" /></div>
        <button onClick={() => nav({ search: {} })} className={`rounded border px-2 py-1 text-xs ${!dept ? "border-glow text-glow" : "border-border text-muted-foreground"}`}>All</button>
        {departments.map((d) => (
          <button key={d.id} onClick={() => nav({ search: { dept: d.id } })} className={`rounded border px-2 py-1 text-xs ${dept === d.id ? "border-glow text-glow" : "border-border text-muted-foreground hover:text-foreground"}`}>{d.name}</button>
        ))}
      </div>
      {cur && (
        <div className="mb-4 rounded border border-border bg-panel p-3 text-xs">
          <p>{cur.blurb}</p><p className="mt-1 font-mono text-muted-foreground">Tools: {cur.tools}</p>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <div key={a.id} className="rounded-lg border border-border bg-card p-3 hover:border-glow">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{a.name}</span>
              <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><span className={`h-2 w-2 rounded-full ${dot[a.status]}`} />{a.status}</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">{a.specialty}</p>
            <div className="mt-2 flex items-center justify-between text-[11px]">
              <span className="font-mono text-muted-foreground">{departments.find((d) => d.id === a.dept)?.name}</span>
              <span className={riskCls[a.risk]}>risk: {a.risk}{a.risk === "high" ? " · approval" : ""}</span>
            </div>
          </div>
        ))}
        {list.length === 0 && <p className="text-muted-foreground">Koi agent nahi mila.</p>}
      </div>
    </main>
  );
}
