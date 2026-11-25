import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { grantableRoles, roleLabels, type Role } from "@/lib/access";

type Person = { id: string; email: string | null; display_name: string | null; roles: Role[] };

/** Owner/Admin assign or remove roles. Database rules enforce the same limits. */
export function RoleManager() {
  const { roles, user, reloadRoles } = useAuth();
  const grantable = grantableRoles(roles);
  const [people, setPeople] = useState<Person[]>([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    const [{ data: ps }, { data: rs }] = await Promise.all([
      supabase.from("profiles").select("id,email,display_name").order("created_at"),
      supabase.from("user_roles").select("user_id,role"),
    ]);
    setPeople((ps ?? []).map((p) => ({ ...p, roles: (rs ?? []).filter((r) => r.user_id === p.id).map((r) => r.role as Role) })));
  };
  useEffect(() => { void load(); }, []);

  const toggle = async (p: Person, r: Role) => {
    setMsg("");
    const { error } = p.roles.includes(r)
      ? await supabase.from("user_roles").delete().eq("user_id", p.id).eq("role", r)
      : await supabase.from("user_roles").insert({ user_id: p.id, role: r });
    if (error) setMsg("Ye role badalne ki anumati nahi hai.");
    await load();
    if (p.id === user?.id) await reloadRoles();
  };

  if (!grantable.length) return null;
  return (
    <section className="mt-4 rounded-lg border border-border bg-panel p-3">
      <h2 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Users & roles</h2>
      {msg && <p className="mb-2 text-xs text-destructive">{msg}</p>}
      <div className="space-y-2">
        {people.map((p) => (
          <div key={p.id} className="rounded border border-border bg-card p-2 text-xs">
            <div className="font-semibold">{p.display_name || p.email} <span className="font-normal text-muted-foreground">{p.email}</span></div>
            <div className="mt-1 flex flex-wrap gap-1">
              {grantable.map((r) => (
                <button key={r} onClick={() => void toggle(p, r)} className={`rounded border px-2 py-0.5 ${p.roles.includes(r) ? "border-glow bg-glow/20 text-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}>{roleLabels[r]}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

type Approval = { id: string; title: string; agent: string; risk: string; status: string; decided_at: string | null };

/** Saved approvals; only Owner/Admin/Security can read or decide (database rule). */
export function ApprovalsPanel() {
  const [items, setItems] = useState<Approval[]>([]);
  const load = async () => {
    const { data } = await supabase.from("approvals").select("id,title,agent,risk,status,decided_at").order("created_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => { void load(); }, []);
  const decide = async (id: string, status: "approved" | "rejected") => {
    await supabase.from("approvals").update({ status }).eq("id", id);
    await load();
  };
  return (
    <section className="mt-4 rounded-lg border border-border bg-panel p-3">
      <h2 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Approval queue</h2>
      <div className="space-y-2">
        {items.map((a) => (
          <div key={a.id} className="flex flex-wrap items-center gap-2 rounded border border-border bg-card p-2 text-xs">
            <span className="flex-1 font-semibold">{a.title} <span className="font-normal text-muted-foreground">· {a.agent} · {a.risk}</span></span>
            {a.status === "pending" ? (
              <>
                <button onClick={() => void decide(a.id, "approved")} className="rounded bg-success px-2 py-0.5 text-primary-foreground">Approve</button>
                <button onClick={() => void decide(a.id, "rejected")} className="rounded bg-destructive px-2 py-0.5 text-destructive-foreground">Reject</button>
              </>
            ) : <span className={a.status === "approved" ? "text-success" : "text-destructive"}>{a.status}</span>}
          </div>
        ))}
        {!items.length && <p className="text-xs text-muted-foreground">Koi approval nahi.</p>}
      </div>
    </section>
  );
}
