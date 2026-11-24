import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LovableMark } from "@lovable.dev/cloud-auth-js/react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import ayra from "@/assets/ayra.png.asset.json";

const safe = (r: unknown) => (typeof r === "string" && r.startsWith("/") && !r.startsWith("//") ? r : undefined);

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { redirect?: string | undefined } => ({ redirect: safe(s["redirect"]) }),
  head: () => ({
    meta: [
      { title: "Sign in — AYRA HQ" },
      { name: "description", content: "Sign in to AYRA HQ to open the dashboards your role allows." },
      { property: "og:title", content: "Sign in — AYRA HQ" },
      { property: "og:description", content: "Role-based access to the AYRA AI agent platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const GoogleG = () => (
  <svg aria-hidden="true" width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.480-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.950-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.950 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>
);

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState<"in" | "up" | "forgot">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const target = redirect ?? "/workstation";

  useEffect(() => { if (user) navigate({ to: target, replace: true }); }, [user, target, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { toast.error("Email daaliye"); return; }
    setBusy(true);
    try {
      if (mode === "forgot") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        toast.success("Password reset link email par bhej diya");
      } else if (mode === "up") {
        const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + target } });
        if (error) throw error;
        toast.success("Account ban gaya! Email me confirm link dabaiye, phir sign in kariye.");
        setMode("in");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Kuch galat ho gaya");
    } finally { setBusy(false); }
  };

  const social = async (p: "google" | "lovable") => {
    if (redirect) sessionStorage.setItem("ayra-after-login", redirect);
    const r = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin + "/auth" });
    if (r.error) toast.error(r.error.message ?? "Sign-in fail hua");
  };

  useEffect(() => {
    const saved = sessionStorage.getItem("ayra-after-login");
    if (user && saved) { sessionStorage.removeItem("ayra-after-login"); navigate({ to: safe(saved) ?? "/workstation", replace: true }); }
  }, [user, navigate]);

  return (
    <main className="grid min-h-screen bg-background font-sans text-foreground md:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-panel md:block">
        <img src={ayra.url} alt="AYRA" className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-8">
          <p className="text-2xl font-bold">Namaste, main <span className="text-ai">AYRA</span> hoon.</p>
          <p className="text-sm text-muted-foreground">Sign in kijiye — aapke role ke hisaab se dashboards khulenge.</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-6">
        <form onSubmit={submit} className="w-full max-w-sm space-y-3">
          <h1 className="text-2xl font-bold">{mode === "up" ? "Naya account" : mode === "forgot" ? "Password bhool gaye" : "Sign in"} <span className="text-ai">AYRA HQ</span></h1>
          {mode !== "forgot" && (
            <div className="space-y-2">
              <Button type="button" onClick={() => social("google")} className="w-full gap-2.5 border border-[#747775] bg-[#FFFFFF] text-[#1F1F1F] hover:bg-[#F2F2F2]"><GoogleG />Continue with Google</Button>
              <Button type="button" variant="outline" onClick={() => social("lovable")} className="w-full gap-2.5"><LovableMark className="size-[18px]" />Continue with Lovable</Button>
              <div className="py-1 text-center text-xs text-muted-foreground">ya email se</div>
            </div>
          )}
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {mode !== "forgot" && <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === "up" ? "new-password" : "current-password"} />}
          <Button type="submit" disabled={busy} className="w-full">{mode === "up" ? "Account banayein" : mode === "forgot" ? "Reset link bhejein" : "Sign in"}</Button>
          <div className="flex justify-between text-xs text-muted-foreground">
            <button type="button" onClick={() => setMode(mode === "up" ? "in" : "up")} className="hover:text-foreground">{mode === "up" ? "Pehle se account hai? Sign in" : "Naya account banayein"}</button>
            <button type="button" onClick={() => setMode(mode === "forgot" ? "in" : "forgot")} className="hover:text-foreground">{mode === "forgot" ? "Wapas" : "Password bhool gaye?"}</button>
          </div>
          <p className="text-[11px] text-muted-foreground">Naye account ko role milne tak "pending" rehna hoga. Role Owner ya Admin deta hai. <Link to="/" className="underline">Home</Link></p>
        </form>
      </div>
    </main>
  );
}
