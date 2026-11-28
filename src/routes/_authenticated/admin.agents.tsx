import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { agents, departments } from "@/data/agents";
import { RoleIcon } from "@/components/ayra/RoleIcon";
import { Button } from "@/components/ui/button";

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
      <div className="flex items-center gap-3">
        <RoleIcon dashboard="agents" dept="ai" badge />
        <h1 className="text-xl font-bold">Agent <span className="text-ai">Registry</span> <span className="font-mono text-sm text-muted-foreground">({list.length}/{agents.length})</span></h1>
      </div>
      <div className="my-4 flex flex-wrap items-center gap-2">
        <div className="relative"><Search className="absolute left-2 top-2 h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Agent ya skill dhundhein…" className="w-full max-w-64 rounded border border-input bg-background py-1.5 pl-8 pr-2 text-xs outline-none focus:border-glow" /></div>
        <Button variant="outline" size="sm" onClick={() => nav({ search: {} })} className={!dept ? "border-glow text-glow" : "text-muted-foreground"}>All</Button>
        {departments.map((d) => (
          <Button variant="outline" size="sm" key={d.id} onClick={() => nav({ search: { dept: d.id } })} className={`h-auto whitespace-normal py-1.5 text-left ${dept === d.id ? "border-glow text-glow" : "text-muted-foreground"}`}><RoleIcon dept={d.id} />{d.name}</Button>
        ))}
      </div>
      {cur && (
        <div className="mb-4 rounded border border-border bg-panel p-3 text-xs">
          <p>{cur.blurb}</p><p className="mt-1 font-mono text-muted-foreground">Tools: {cur.tools}</p>
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((a) => (
          <div key={a.id} className="agent-card hud-card rounded-lg border border-border p-4">
            <div className="mb-3 flex items-center gap-3"><RoleIcon name={a.name} dept={a.dept} badge /><span className="font-mono text-[10px] uppercase text-muted-foreground">{a.id}</span></div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold leading-5">{a.name}</span>
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
