import { useCallback, useEffect, useState } from "react";
import { agents } from "@/data/agents";
import { workTemplates } from "@/data/workflows";

export type StepStatus = "done" | "running" | "queued";
export type Workflow = { id: number; title: string; agent: string; steps: { label: string; status: StepStatus }[]; progress: number; idle: number };
type State = { wfs: Workflow[]; log: string[] };

let seq = 1;
const pick = <T,>(a: T[]): T => a[Math.floor(Math.random() * a.length)]!;

function make(depts: string[]): Workflow {
  const dept = pick(depts.filter((d) => workTemplates[d]));
  const t = pick(workTemplates[dept]!);
  const agent = pick(agents.filter((a) => a.dept === dept)).name;
  return { id: seq++, title: t.title, agent, progress: 0, idle: 0, steps: t.steps.map((label, i) => ({ label, status: i === 0 ? "running" : "queued" })) };
}

/** Simulated live agent activity (no real backend yet). Advances steps every tick. */
export function useLiveWorkflows(depts: string[], count = 4) {
  const key = depts.join(",");
  const [state, setState] = useState<State>({ wfs: [], log: [] });

  useEffect(() => {
    const ds = key.split(",");
    setState({ wfs: Array.from({ length: count }, () => make(ds)), log: ["AYRA orchestrator connected"] });
    const iv = setInterval(() => {
      setState(({ wfs, log }) => {
        const newLog: string[] = [];
        const next = wfs.map((w) => {
          const cur = w.steps.findIndex((s) => s.status === "running");
          if (cur === -1) {
            // finished: linger a few ticks, then AYRA picks up new work
            return w.idle > 4 && w.agent !== "AYRA" ? make(ds) : { ...w, idle: w.idle + 1 };
          }
          const p = w.progress + 10 + Math.random() * 25;
          if (p < 100) return { ...w, progress: p };
          newLog.push(`✔ ${w.agent}: ${w.steps[cur]!.label}`);
          const steps = w.steps.map((s, i) => (i === cur ? { ...s, status: "done" as const } : i === cur + 1 ? { ...s, status: "running" as const } : s));
          if (cur + 1 >= steps.length) newLog.push(`★ Completed: ${w.title}`);
          return { ...w, steps, progress: 0 };
        });
        return { wfs: next, log: [...log, ...newLog].slice(-60) };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [key, count]);

  const addTask = useCallback((title: string) => {
    setState(({ wfs, log }) => ({
      wfs: [{ id: seq++, title, agent: "AYRA", progress: 0, idle: 0, steps: ["Understand request", "Pick best agent", "Execute", "Report back"].map((label, i) => ({ label, status: (i === 0 ? "running" : "queued") as StepStatus })) }, ...wfs].slice(0, 6),
      log: [...log, `▶ New task: ${title}`],
    }));
  }, []);

  return { workflows: state.wfs, log: state.log, addTask };
}
