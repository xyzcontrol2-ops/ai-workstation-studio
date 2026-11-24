import { createFileRoute } from "@tanstack/react-router";
import { DashLink } from "@/components/ayra/DashLink";
import { dashboards } from "@/data/dashboards";

export const Route = createFileRoute("/admin/dashboards")({
  head: () => ({
    meta: [
      { title: "Dashboard Map — AYRA HQ" },
      { name: "description", content: "All 15 dashboards of the AYRA agent marketplace, who uses them and the build phases." },
      { property: "og:title", content: "Dashboard Map — AYRA HQ" },
      { property: "og:description", content: "Every dashboard planned for the AI agent marketplace, by phase." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: DashMap,
});

const phaseName = { 1: "Phase 1 · Core", 2: "Phase 2 · Business", 3: "Phase 3 · Scale" } as const;

function DashMap() {
  return (
    <main className="p-4 md:p-6">
      <h1 className="text-xl font-bold">Dashboard <span className="text-ai">Map</span> <span className="font-mono text-sm text-muted-foreground">({dashboards.length})</span></h1>
      <p className="mt-1 text-xs text-muted-foreground">Kitne dashboard honge aur kaun use karega. Super Admin se shuru, phir baaki phase-wise.</p>
      {([1, 2, 3] as const).map((p) => (
        <section key={p} className="mt-5">
          <h2 className="mb-2 text-xs uppercase tracking-widest text-glow">{phaseName[p]}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {dashboards.filter((d) => d.phase === p).map((d) => (
              <div key={d.id} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{d.name}</span>
                  <DashLink id={d.id} className="rounded bg-primary px-2 py-0.5 text-[11px] text-primary-foreground">Open</DashLink>
                </div>
                <p className="text-[11px] text-muted-foreground">👤 {d.audience}</p>
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
