import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — AYRA HQ" },
      { name: "description", content: "Set a new password for your AYRA HQ account." },
      { property: "og:title", content: "Reset password — AYRA HQ" },
      { property: "og:description", content: "Set a new password for your AYRA HQ account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [ok, setOk] = useState(false);
  const [pw, setPw] = useState("");
  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) setOk(true);
    const { data } = supabase.auth.onAuthStateChange((e) => { if (e === "PASSWORD_RECOVERY") setOk(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) { toast.error(error.message); return; }
    toast.success("Naya password set ho gaya");
    navigate({ to: "/workstation" });
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 font-sans text-foreground">
      <form onSubmit={save} className="w-full max-w-sm space-y-3">
        <h1 className="text-xl font-bold">Naya password</h1>
        {ok ? (<><Input type="password" placeholder="Naya password" value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="new-password" /><Button type="submit" className="w-full">Save</Button></>)
          : <p className="text-sm text-muted-foreground">Email me aaye reset link se is page par aaiye.</p>}
      </form>
    </main>
  );
}
