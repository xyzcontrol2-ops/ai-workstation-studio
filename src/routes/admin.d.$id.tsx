import { createFileRoute, notFound } from "@tanstack/react-router";
import { agents } from "@/data/agents";
import { dashboards, dashDepts } from "@/data/dashboards";
import { LiveDots } from "@/components/ayra/WorkflowTree";

export const Route = createFileRoute("/admin/d/$id")({
  loader: ({ params }) => {
    const d = dashboards.find((x) => x.id === params.id);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Dashboard"} — AYRA HQ` },
      { name: "description", content: loaderData?.purpose ?? "AYRA HQ dashboard" },
      { property: "og:title", content: `${loaderData?.name ?? "Dashboard"} — AYRA HQ` },
      { property: "og:description", content: loaderData?.purpose ?? "AYRA HQ dashboard" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashboardPage,
});

// Deterministic sample numbers so widgets look alive without a backend.
function hash(s: string) { let h = 7; for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 100003; return h; }
const dot = { online: "bg-success", busy: "bg-warn", idle: "bg-muted-foreground", training: "bg-glow" } as const;

function DashboardPage() {
  const d = Route.useLoaderData();
  const depts = dashDepts[d.id] ?? [];
  const onDuty = agents.filter((a) => depts.includes(a.dept)).slice(0, 8);

  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl font-bold">{d.name} <span className="ml-2 align-middle text-xs font-normal text-glow">live <LiveDots className="ml-1" /></span></h1>
      <p className="text-xs text-muted-foreground">👤 {d.audience} · {d.purpose}</p>

      <section className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {d.widgets.map((w) => {
          const h = hash(d.id + w);
          const bars = Array.from({ length: 12 }, (_, i) => 20 + ((h * (i + 3)) % 80));
          return (
            <div key={w} className="rounded-lg border border-border bg-card p-3">
              <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{w}</div>
              <div className="mt-1 text-2xl font-bold">{(h % 90) + 10}</div>
              <div className="mt-2 flex h-8 items-end gap-0.5">{bars.map((b, i) => <span key={i} className="flex-1 rounded-sm bg-glow/60" style={{ height: `${b}%` }} />)}</div>
            </div>
          );
        })}
      </section>

      <section className="mt-4 rounded-lg border border-border bg-panel p-3">
        <h2 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Agents on duty here</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {onDuty.map((a) => (
            <div key={a.id} className="flex items-center gap-2 rounded border border-border bg-card p-2 text-xs">
              <span className={`h-2 w-2 rounded-full ${dot[a.status]} ${a.status === "busy" || a.status === "online" ? "animate-pulse" : ""}`} />
              <span className="font-semibold">{a.name}</span><span className="truncate text-muted-foreground">{a.specialty}</span>
            </div>
          ))}
        </div>
      </section>
      <p className="mt-4 text-[11px] text-muted-foreground">Sample numbers — asli data tab judega jab backend (login + database) lagega. Live workflow right side me AYRA ke neeche chal raha hai.</p>
    </main>
  );
}
