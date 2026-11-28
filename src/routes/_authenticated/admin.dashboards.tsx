import { createFileRoute } from "@tanstack/react-router";
import { DashLink } from "@/components/ayra/DashLink";
import { architecture, dashboards, groups } from "@/data/dashboards";
import { RoleIcon } from "@/components/ayra/RoleIcon";

export const Route = createFileRoute("/_authenticated/admin/dashboards")({
  head: () => ({
    meta: [
      { title: "30 Dashboard Map — AYRA HQ" },
      { name: "description", content: "All 30 AYRA dashboards: one central command center and 29 connected modules with role-isolated access." },
      { property: "og:title", content: "30 Dashboard Map — AYRA HQ" },
      { property: "og:description", content: "One central AYRA Command Center and 29 connected dashboard modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashMap,
});

function DashMap() {
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl font-bold">AYRA <span className="text-ai">30 Dashboard</span> Master List</h1>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
        {architecture.map((a) => (
          <div key={a.label} className="rounded border border-border bg-card p-2 text-center">
            <div className="font-mono text-lg font-bold text-glow">{a.n}</div>
            <div className="text-[11px] text-muted-foreground">{a.label}</div>
          </div>
        ))}
      </div>
      {groups.map((g) => (
        <section key={g} className="mt-5">
          <h2 className="mb-2 text-xs uppercase tracking-widest text-glow">{g}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {dashboards.filter((d) => d.group === g).map((d) => (
              <div key={d.id} className={`hud-card rounded-lg border p-3 ${d.no === 1 ? "border-glow glow-ring" : "border-border"}`}>
                <div className="flex items-center gap-2">
                  <RoleIcon dashboard={d.id} dept={d.depts[0] ?? "ai"} badge />
                  <span className="min-w-0 flex-1 font-semibold"><span className="mr-1.5 font-mono text-glow">{String(d.no).padStart(2, "0")}</span>{d.name}</span>
                  <DashLink id={d.id} className="shrink-0 rounded bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">Open</DashLink>
                </div>
                <p className="text-[11px] text-muted-foreground">🔒 {d.audience}</p>
                <p className="mt-1 text-xs">{d.purpose}</p>
                <div className="mt-2 flex flex-wrap gap-1">{d.widgets.map((w) => <span key={w} className="rounded bg-secondary px-1.5 py-0.5 text-[10px] text-muted-foreground">{w}</span>)}</div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
