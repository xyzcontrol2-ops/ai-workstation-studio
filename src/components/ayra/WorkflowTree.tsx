import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import type { Workflow } from "@/hooks/use-live-workflows";

export function LiveDots({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-label="working">
      {[0, 1, 2].map((i) => <span key={i} className="h-1 w-1 rounded-full bg-glow animate-dot" style={{ animationDelay: `${i * 0.18}s` }} />)}
    </span>
  );
}

/** Live tree: AYRA orchestrator → workflows → steps. Running steps show animated dots + flowing line. */
export function WorkflowTree({ workflows }: { workflows: Workflow[] }) {
  return (
    <div className="font-mono text-[11px] leading-5">
      <div className="flex items-center gap-1.5 font-semibold text-foreground">
        <Sparkles className="h-3.5 w-3.5 text-glow" />AYRA Orchestrator
        <span className="ml-auto flex items-center gap-1 text-success"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />live</span>
      </div>
      {workflows.length === 0 && <div className="pl-4 text-muted-foreground">connecting <LiveDots /></div>}
      {workflows.map((w) => {
        const done = w.steps.every((s) => s.status === "done");
        const doneCount = w.steps.filter((s) => s.status === "done").length;
        const pct = Math.round(((doneCount + (done ? 0 : w.progress / 100)) / w.steps.length) * 100);
        return (
          <div key={w.id} className="relative ml-1.5 border-l border-border pl-3 pt-1 animate-pop">
            {!done && <span className="absolute -left-px top-0 h-full w-px flow-line" />}
            <div className="flex items-center gap-1.5">
              {done ? <CheckCircle2 className="h-3 w-3 shrink-0 text-success" /> : <LiveDots />}
              <span className={`truncate ${done ? "text-muted-foreground" : "text-foreground"}`}>{w.title}</span>
              <span className="ml-auto shrink-0 text-muted-foreground">{pct}%</span>
            </div>
            <div className="truncate pl-4 text-[10px] text-glow">↳ {w.agent}</div>
            <div className="ml-1.5 border-l border-dashed border-border pl-3">
              {w.steps.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  {s.status === "done" ? <CheckCircle2 className="h-2.5 w-2.5 shrink-0 text-success" /> : s.status === "running" ? <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-glow" /> : <Circle className="h-2.5 w-2.5 shrink-0 text-muted-foreground/60" />}
                  <span className={`truncate ${s.status === "running" ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</span>
                  {s.status === "running" && <LiveDots className="ml-1" />}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
