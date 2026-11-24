import { createFileRoute } from "@tanstack/react-router";
import { Workstation } from "@/components/ayra/Workstation";

export const Route = createFileRoute("/_authenticated/workstation")({
  head: () => ({
    meta: [
      { title: "AYRA Workstation — Personal AI Agent" },
      { name: "description", content: "VS Code style workstation with AYRA, your human-like personal AI assistant." },
      { property: "og:title", content: "AYRA Workstation" },
      { property: "og:description", content: "VS Code style workstation with AYRA, your personal AI agent." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Workstation,
});
