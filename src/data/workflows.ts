export type WorkTemplate = { title: string; steps: string[] };

// What agents of each department typically do. Used for the live workflow tree (simulated for now).
export const workTemplates: Record<string, WorkTemplate[]> = {
  eng: [
    { title: "Build invoice API", steps: ["Read requirement", "Design schema", "Write endpoints", "Run tests", "Open pull request"] },
    { title: "Fix login bug #482", steps: ["Reproduce bug", "Find root cause", "Patch code", "Verify fix"] },
  ],
  devops: [
    { title: "Deploy api v2.4", steps: ["Build image", "Run smoke tests", "Roll out 10%", "Roll out 100%"] },
    { title: "Repair web-03 server", steps: ["Read crash logs", "Isolate failing service", "Auto-heal", "Confirm uptime"] },
  ],
  blue: [
    { title: "Triage 3 odd logins", steps: ["Collect logs", "Correlate events", "Block suspicious IP", "Write incident note"] },
    { title: "Patch OpenSSL fleet", steps: ["Scan servers", "Stage patch", "Get approval", "Roll out"] },
  ],
  red: [
    { title: "Staging web test (scoped)", steps: ["Check consent + scope", "Wait for approval", "Run in sandbox lab", "Draft findings"] },
    { title: "Retest fixed API flaws", steps: ["Load previous findings", "Retest in sandbox", "Update report"] },
  ],
  ai: [
    { title: "Train support persona", steps: ["Prepare dataset", "Fine-tune", "Run evals", "Publish version"] },
    { title: "Refresh knowledge base", steps: ["Ingest documents", "Build index", "Test retrieval"] },
  ],
  data: [
    { title: "Weekly revenue report", steps: ["Pull data", "Clean + validate", "Build charts", "Send to client"] },
    { title: "Fix data pipeline lag", steps: ["Find slow job", "Optimize query", "Backfill"] },
  ],
  qa: [
    { title: "Release gate: checkout", steps: ["Run E2E suite", "Run load test", "Check accessibility", "Sign off"] },
    { title: "Write unit tests", steps: ["Scan coverage", "Generate tests", "Run suite"] },
  ],
  design: [
    { title: "Design onboarding flow", steps: ["Research users", "Wireframe", "Hi-fi screens", "Share for review"] },
    { title: "Write API docs", steps: ["Read code", "Draft guide", "Publish"] },
  ],
  mgmt: [
    { title: "Plan sprint 14", steps: ["Collect backlog", "Estimate", "Assign agents", "Kick off"] },
    { title: "Onboard new client", steps: ["Intake call notes", "Clarify scope", "Quote", "Create project"] },
  ],
  market: [
    { title: "Answer 12 support tickets", steps: ["Read tickets", "Find answers", "Reply", "Close"] },
    { title: "Generate monthly invoices", steps: ["Meter usage", "Create invoices", "Email clients"] },
  ],
  gov: [
    { title: "ISO 27001 evidence sweep", steps: ["List controls", "Collect evidence", "Flag gaps"] },
    { title: "Update privacy policy", steps: ["Review law changes", "Draft", "Send for approval"] },
  ],
};
