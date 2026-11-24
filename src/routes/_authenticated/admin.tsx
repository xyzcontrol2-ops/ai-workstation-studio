import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HQShell } from "@/components/ayra/HQShell";

export const Route = createFileRoute("/_authenticated/admin")({ component: AdminLayout });

function AdminLayout() {
  return (
    <HQShell>
      <Outlet />
    </HQShell>
  );
}
