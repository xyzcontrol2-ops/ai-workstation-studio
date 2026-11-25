import { ChevronDown, LogOut } from "lucide-react";
import { dashboards, groups } from "@/data/dashboards";
import { useAuth } from "@/hooks/use-auth";
import { canOpen, roleLabels } from "@/lib/access";
import { DashLink } from "./DashLink";

/** Explorer list of the dashboards the signed-in user's roles allow. */
export function DashboardList() {
  const { user, roles, loading, signOut } = useAuth();
  const mine = dashboards.filter((d) => canOpen(roles, d.id));
  return (
    <div className="py-2">
      <div className="px-4 pb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Dashboards ({mine.length}/30)</div>
      {!loading && mine.length === 0 && <p className="px-4 text-xs text-muted-foreground">Aapko abhi koi role nahi mila. Owner/Admin se role maangein.</p>}
      {groups.map((g) => {
        const list = mine.filter((d) => d.group === g);
        if (!list.length) return null;
        return (
          <div key={g} className="mb-2">
            <div className="flex items-center gap-1 px-2 text-[11px] font-semibold uppercase"><ChevronDown className="h-3 w-3" />{g}</div>
            {list.map((d) => (
              <DashLink key={d.id} id={d.id} className="flex gap-1.5 truncate px-5 py-1 text-xs text-muted-foreground hover:bg-secondary"><span className="font-mono text-glow/70">{String(d.no).padStart(2, "0")}</span><span className="truncate">{d.name}</span></DashLink>
            ))}
          </div>
        );
      })}
      {roles.length > 0 && <DashLink id="map" className="block px-4 py-1 text-xs text-glow hover:bg-secondary">▸ Full dashboard map</DashLink>}
      <div className="mt-3 border-t border-border px-4 pt-2 text-[11px] text-muted-foreground">
        <div className="truncate">{user?.email}</div>
        <div className="truncate">{roles.map((r) => roleLabels[r]).join(", ") || "pending"}</div>
        <button onClick={() => void signOut()} className="mt-1 flex items-center gap-1 text-destructive hover:underline"><LogOut className="h-3 w-3" />Sign out</button>
      </div>
    </div>
  );
}

/** Blocks content when the user's roles do not allow this dashboard. */
export function AccessGate({ id, children }: { id: string; children: React.ReactNode }) {
  const { roles, loading } = useAuth();
  if (loading) return <p className="p-6 text-xs text-muted-foreground">Checking access…</p>;
  if (!canOpen(roles, id)) return (
    <div className="p-6"><h1 className="text-lg font-bold">🔒 Access nahi hai</h1><p className="text-xs text-muted-foreground">Aapke role ko ye dashboard dekhne ki anumati nahi hai. Owner/Admin se role maangein.</p></div>
  );
  return <>{children}</>;
}
