import { createFileRoute, Link } from "@tanstack/react-router";
import { dashboards, groups, architecture } from "@/data/dashboards";
import { useAuth } from "@/hooks/use-auth";
import { canOpen } from "@/lib/access";
import { DashLink } from "@/components/ayra/DashLink";
import { ThemeToggle } from "@/components/ayra/ThemeToggle";
import ayra from "@/assets/ayra.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AYRA HQ — AI Agent Platform with 30 Dashboards" },
      { name: "description", content: "AYRA: one central command center and 29 connected dashboards to build, run and secure software with 100+ AI agents." },
      { property: "og:title", content: "AYRA HQ — AI Agent Platform" },
      { property: "og:description", content: "One central AYRA command center and 29 role-isolated dashboard modules." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const { user, roles } = useAuth();
  return (
    <main className="min-h-screen bg-background font-sans text-foreground">
      <header className="flex items-center justify-between border-b border-border bg-secondary px-4 py-2 text-xs">
        <span className="font-bold text-ai">◆ AYRA HQ</span>
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-muted-foreground" />
          {user ? <Link to="/workstation" className="rounded bg-primary px-3 py-1 text-primary-foreground">Workstation kholein</Link>
            : <Link to="/auth" search={{ redirect: undefined }} className="rounded bg-primary px-3 py-1 text-primary-foreground">Sign in</Link>}
        </div>
      </header>
      <section className="mx-auto grid max-w-6xl items-center gap-6 p-6 md:grid-cols-[1fr_260px]">
        <div>
          <h1 className="text-3xl font-bold">AYRA <span className="text-ai">30 Dashboard</span> Master List</h1>
          <p className="mt-2 text-sm text-muted-foreground">1 central Command Center + 29 connected modules. Har user ko sirf uske role ke dashboards khulte hain.</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {architecture.map((a) => <div key={a.label} className="rounded border border-border bg-card p-2 text-center"><div className="font-mono font-bold text-glow">{a.n}</div><div className="text-[11px] text-muted-foreground">{a.label}</div></div>)}
          </div>
        </div>
        <img src={ayra.url} alt="AYRA AI agent" className="hidden h-64 w-full rounded-lg border border-glow/40 object-cover object-top md:block" />
      </section>
      <section className="mx-auto max-w-6xl px-6 pb-10">
        {groups.map((g) => (
          <div key={g} className="mb-5">
            <h2 className="mb-2 text-xs uppercase tracking-widest text-glow">{g}</h2>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {dashboards.filter((d) => d.group === g).map((d) => {
                const open = user && canOpen(roles, d.id);
                const body = (<><span className="mr-2 font-mono text-glow">{String(d.no).padStart(2, "0")}</span><span className="font-semibold">{d.name}</span><span className="ml-auto pl-2 text-[11px] text-muted-foreground">{open ? "Open →" : "🔒"}</span></>);
                return open
                  ? <DashLink key={d.id} id={d.id} className="flex items-center rounded border border-border bg-card p-3 text-sm hover:border-glow">{body}</DashLink>
                  : <div key={d.id} className="flex items-center rounded border border-border bg-card p-3 text-sm opacity-80">{body}</div>;
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
