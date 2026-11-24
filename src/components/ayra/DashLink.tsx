import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** Typed link to any dashboard by id. */
export function DashLink({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const active = { className: "bg-accent text-foreground" };
  if (id === "super") return <Link to="/admin" activeOptions={{ exact: true }} className={className} activeProps={active}>{children}</Link>;
  if (id === "agents") return <Link to="/admin/agents" className={className} activeProps={active}>{children}</Link>;
  if (id === "map") return <Link to="/admin/dashboards" className={className} activeProps={active}>{children}</Link>;
  if (id === "workstation") return <Link to="/" className={className}>{children}</Link>;
  return <Link to="/admin/d/$id" params={{ id }} className={className} activeProps={active}>{children}</Link>;
}
