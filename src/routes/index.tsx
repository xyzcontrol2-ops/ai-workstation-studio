import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, LockKeyhole } from "lucide-react";
import { dashboards, groups, architecture } from "@/data/dashboards";
import { useAuth } from "@/hooks/use-auth";
import { canOpen } from "@/lib/access";
import { DashLink } from "@/components/ayra/DashLink";
import { ThemeToggle } from "@/components/ayra/ThemeToggle";
import { BrandMark } from "@/components/ayra/BrandMark";
import { AyraAvatar } from "@/components/ayra/AyraAvatar";
import { RoleIcon } from "@/components/ayra/RoleIcon";

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
      <header className="ayra-titlebar sticky top-0 z-10 flex items-center justify-between border-b border-border bg-secondary/95 px-4 py-2.5 text-xs backdrop-blur md:px-8">
        <BrandMark />
        <div className="flex items-center gap-2">
          <ThemeToggle className="text-muted-foreground" />
          {user ? <Link to="/workstation" className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground">Workstation kholein</Link>
            : <Link to="/auth" search={{ redirect: undefined }} className="rounded-md bg-primary px-3 py-1.5 font-medium text-primary-foreground">Sign in</Link>}
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-8 md:grid-cols-[1fr_320px] md:px-8 md:py-12">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-glow/30 bg-glow/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-glow">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" /> Neural operations system
          </div>
          <h1 className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] md:text-5xl">
            Ek AI team.<br /><span className="text-ai">Poora software business.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">
            103 specialist agents, 30 connected dashboards aur ek central AYRA—development se security, operations aur growth tak.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {architecture.map((a) => (
              <div key={a.label} className="hud-card rounded-lg border border-border p-3">
                <div className="font-mono text-lg font-bold text-glow">{a.n}</div>
                <div className="mt-1 text-[10px] leading-4 text-muted-foreground">{a.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden h-[340px] md:block">
          <AyraAvatar speaking={false} text="Namaste. Main AYRA hoon—aapki AI operations team." />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        {groups.map((g) => (
          <div key={g} className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-glow">{g}</h2>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] text-muted-foreground">{String(dashboards.filter((d) => d.group === g).length).padStart(2, "0")} modules</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {dashboards.filter((d) => d.group === g).map((d) => {
                const open = Boolean(user && canOpen(roles, d.id));
                const body = (
                  <>
                    <RoleIcon dashboard={d.id} dept={d.depts[0] ?? "ai"} badge />
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[9px] text-muted-foreground">MODULE {String(d.no).padStart(2, "0")}</span>
                      <span className="mt-0.5 block text-sm font-semibold leading-5">{d.name}</span>
                    </span>
                    {open ? <ArrowUpRight className="h-4 w-4 shrink-0 text-glow" /> : <LockKeyhole className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />}
                  </>
                );
                return open
                  ? <DashLink key={d.id} id={d.id} className="hud-card agent-card flex items-center gap-3 rounded-lg border border-border p-3">{body}</DashLink>
                  : <div key={d.id} className="hud-card flex items-center gap-3 rounded-lg border border-border p-3 opacity-75">{body}</div>;
              })}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
