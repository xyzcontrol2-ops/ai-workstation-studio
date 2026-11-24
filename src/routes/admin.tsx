import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HQShell } from "@/components/ayra/HQShell";

export const Route = createFileRoute("/admin")({ component: AdminLayout });

function AdminLayout() {
  return (
    <HQShell>
      <Outlet />
    </HQShell>
  );
}
