import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ThemeToggle } from "@/components/ayra/ThemeToggle";
import { LayoutDashboard, Bot, Map, MonitorPlay, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

const nav = [
  { to: "/admin", label: "Super Admin", icon: LayoutDashboard, exact: true },
  { to: "/admin/agents", label: "Agent Registry", icon: Bot, exact: false },
  { to: "/admin/dashboards", label: "Dashboard Map", icon: Map, exact: false },
  { to: "/", label: "Workstation", icon: MonitorPlay, exact: true },
] as const;

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-background font-sans text-sm text-foreground">
      <aside className="sticky top-0 hidden h-screen w-56 flex-col border-r border-border bg-panel p-3 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 pt-1"><ShieldCheck className="h-5 w-5 text-glow" /><span className="font-bold text-ai">AYRA HQ</span></div>
        {nav.map(({ to, label, icon: I, exact }) => (
          <Link key={to} to={to} activeOptions={{ exact }} className="mb-1 flex items-center gap-2 rounded px-2 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground" activeProps={{ className: "bg-accent text-foreground" }}>
            <I className="h-4 w-4" />{label}
          </Link>
        ))}
        <ThemeToggle className="mt-auto mb-2 text-xs text-muted-foreground" />
        <p className="px-2 text-[11px] text-muted-foreground">Demo data · login abhi nahi</p>
      </aside>
      <div className="min-w-0 flex-1">
        <nav className="flex gap-3 overflow-x-auto border-b border-border bg-panel p-2 md:hidden">
          {nav.map(({ to, label, exact }) => <Link key={to} to={to} activeOptions={{ exact }} className="whitespace-nowrap text-xs text-muted-foreground" activeProps={{ className: "text-glow" }}>{label}</Link>)}
        </nav>
        <Outlet />
      </div>
    </div>
  );
}
