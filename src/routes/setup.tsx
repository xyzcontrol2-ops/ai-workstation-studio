import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkOwnerPassword } from "@/lib/owner-setup";

export const Route = createFileRoute("/setup")({
  head: () => ({
    meta: [
      { title: "Owner setup — AYRA HQ" },
      { name: "description", content: "One-time private setup for the first AYRA HQ Owner account." },
      { property: "og:title", content: "Owner setup — AYRA HQ" },
      { property: "og:description", content: "One-time Owner account setup for AYRA HQ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SetupPage,
});

function SetupPage() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [email, setEmail] = useState("softwarevala@admim.com");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState<"" | "signed-in" | "confirm">("");
  const [busy, setBusy] = useState(false);

  useEffect(() => { void supabase.rpc("owner_exists").then(({ data }) => setOpen(data === false)); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const problem = checkOwnerPassword(pw, pw2);
    if (problem) { setErr(problem); return; }
    setBusy(true); setErr("");
    const { data, error } = await supabase.auth.signUp({ email, password: pw, options: { emailRedirectTo: window.location.origin + "/admin" } });
    setBusy(false); setPw(""); setPw2("");
    if (error) { setErr(error.message); return; }
    setDone(data.session ? "signed-in" : "confirm");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 text-foreground">
      <div className="w-full max-w-sm rounded-lg border border-border bg-panel p-6">
        <h1 className="text-lg font-bold text-ai">◆ Owner setup</h1>
        {open === null && <p className="mt-2 text-xs text-muted-foreground">Checking…</p>}
        {open === false && !done && (
          <p className="mt-2 text-xs text-muted-foreground">Owner account pehle se bana hua hai, isliye ye setup band hai. <Link to="/auth" search={{ redirect: "/admin" }} className="text-glow underline">Sign in</Link></p>
        )}
        {done === "signed-in" && <p className="mt-2 text-sm">✅ Owner account ban gaya aur aap sign in hain. <Link to="/admin" className="text-glow underline">CEO Command Center kholein</Link></p>}
        {done === "confirm" && <p className="mt-2 text-sm">✅ Owner account ban gaya. Email me aaye confirm link par click karein, phir <Link to="/auth" search={{ redirect: "/admin" }} className="text-glow underline">sign in</Link> karein.</p>}
        {open && !done && (
          <form onSubmit={submit} className="mt-4 space-y-3">
            <p className="text-xs text-muted-foreground">Ye screen sirf ek baar chalegi. Pehla account Owner (super admin) banega. Password sirf yahin daalein, chat me nahi.</p>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" aria-label="Email" />
            <Input type="password" placeholder="Password (12–72 characters)" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" />
            <Input type="password" placeholder="Password dobara" value={pw2} onChange={(e) => setPw2(e.target.value)} autoComplete="new-password" />
            <p className="text-[11px] text-muted-foreground">{pw.length}/72</p>
            {err && <p className="text-xs text-destructive">{err}</p>}
            <Button type="submit" disabled={busy} className="w-full">Owner account banayein</Button>
          </form>
        )}
      </div>
    </main>
  );
}
