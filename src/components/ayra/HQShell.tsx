import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Group, Panel } from "react-resizable-panels";
import { LayoutDashboard, Bot, Map, MonitorPlay, ChevronDown, Terminal, Send, Mic, Paperclip, Wifi, Cpu, X } from "lucide-react";
import { dashboards, dashDepts } from "@/data/dashboards";
import { useLiveWorkflows } from "@/hooks/use-live-workflows";
import { AyraAvatar } from "./AyraAvatar";
import { WorkflowTree } from "./WorkflowTree";
import { ThemeToggle } from "./ThemeToggle";
import { DashLink } from "./DashLink";
import { Sash } from "./Sash";

function currentId(path: string) {
  if (path.startsWith("/admin/d/")) return path.split("/")[3] ?? "super";
  if (path.startsWith("/admin/agents")) return "agents";
  if (path.startsWith("/admin/dashboards")) return "map";
  return "super";
}
const phaseName = { 1: "Phase 1 · Core", 2: "Phase 2 · Business", 3: "Phase 3 · Scale" } as const;

/** Shared VS Code-style frame for every dashboard: explorer, tabs, live terminal and AYRA with the live workflow tree. */
export function HQShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const id = currentId(path);
  const name = id === "map" ? "Dashboard Map" : dashboards.find((d) => d.id === id)?.name ?? "Dashboard";
  const { workflows, log, addTask } = useLiveWorkflows(dashDepts[id] ?? dashDepts["super"]!);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [said, setSaid] = useState<string>();
  const logEnd = useRef<HTMLDivElement>(null);

  useEffect(() => { logEnd.current?.scrollIntoView({ block: "end" }); }, [log]);
  useEffect(() => setSaid(undefined), [id]);

  const running = workflows.filter((w) => w.steps.some((s) => s.status === "running")).length;
  const line = said ?? `${name}: ${running} kaam live chal rahe hain. Main sab dekh rahi hoon 👀`;

  const submit = () => {
    const t = input.trim();
    if (!t) return;
    addTask(t); setInput(""); setSpeaking(true);
    setTimeout(() => { setSaid(`Theek hai, "${t}" shuru kar rahi hoon ✨`); setSpeaking(false); }, 700);
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-sm text-foreground">
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-secondary px-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3"><span className="font-bold text-ai">◆ AYRA HQ</span><span className="hidden font-mono sm:inline">/ {name}</span></div>
        <div className="flex items-center gap-2"><ThemeToggle /><Wifi className="h-3 w-3 text-success" /><Cpu className="h-3 w-3 text-glow" /></div>
      </div>

      <div className="flex min-h-0 flex-1">
        <nav className="flex w-12 shrink-0 flex-col items-center gap-1 bg-activity py-2 text-activity-foreground">
          {[
            { id: "super", icon: LayoutDashboard, label: "Super Admin" },
            { id: "agents", icon: Bot, label: "Agent Registry" },
            { id: "map", icon: Map, label: "Dashboard Map" },
            { id: "workstation", icon: MonitorPlay, label: "Workstation" },
          ].map(({ id: i, icon: I, label }) => (
            <DashLink key={i} id={i} className={`rounded p-2 hover:opacity-100 ${i === id ? "opacity-100" : "opacity-60"}`}><span title={label}><I className="h-5 w-5" /></span></DashLink>
          ))}
        </nav>

        <Group orientation="horizontal" className="min-w-0 flex-1">
          <Panel id="hq-explorer" defaultSize="16%" minSize="8%" maxSize="30%" className="hidden sm:block">
            <aside className="h-full overflow-auto bg-panel py-2">
              <div className="px-4 pb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Dashboards</div>
              {([1, 2, 3] as const).map((p) => (
                <div key={p} className="mb-2">
                  <div className="flex items-center gap-1 px-2 text-[11px] font-semibold"><ChevronDown className="h-3 w-3" />{phaseName[p]}</div>
                  {dashboards.filter((d) => d.phase === p).map((d) => (
                    <DashLink key={d.id} id={d.id} className="block truncate px-6 py-1 text-xs text-muted-foreground hover:bg-secondary">{d.name}</DashLink>
                  ))}
                </div>
              ))}
              <DashLink id="map" className="block px-4 py-1 text-xs text-glow hover:bg-secondary">▸ Full dashboard map</DashLink>
            </aside>
          </Panel>
          <Sash dir="col" />

          <Panel id="hq-work" defaultSize="52%" minSize="25%">
            <Group orientation="vertical">
              <Panel id="hq-main" defaultSize="75%" minSize="25%">
                <div className="flex h-full min-w-0 flex-col">
                  <div className="flex h-9 shrink-0 items-end border-b border-border bg-panel">
                    <div className="flex items-center gap-2 border-t-2 border-glow bg-background px-3 py-1.5 font-mono text-xs">{name}<X className="h-3 w-3" /></div>
                  </div>
                  <div className="min-h-0 flex-1 overflow-auto">{children}</div>
                </div>
              </Panel>
              <Sash dir="row" />
              <Panel id="hq-terminal" defaultSize="25%" minSize="8%">
                <div className="flex h-full flex-col bg-panel">
                  <div className="flex shrink-0 items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"><Terminal className="h-3 w-3" />Live feed</div>
                  <div className="min-h-0 flex-1 overflow-auto px-3 font-mono text-xs">
                    {log.map((l, i) => <div key={i} className="text-success">$ {l}</div>)}
                    <div ref={logEnd} />
                  </div>
                </div>
              </Panel>
            </Group>
          </Panel>
          <Sash dir="col" />

          {/* AYRA is on every dashboard: face, live workflow tree, command box */}
          <Panel id="hq-ayra" defaultSize="32%" minSize="18%" maxSize="60%">
            <aside className="h-full bg-panel">
              <Group orientation="vertical">
                <Panel id="hq-ayra-face" defaultSize="42%" minSize="15%"><div className="h-full p-2"><AyraAvatar speaking={speaking} text={line} /></div></Panel>
                <Sash dir="row" />
                <Panel id="hq-ayra-tree" defaultSize="48%" minSize="10%">
                  <div className="h-full overflow-auto px-3 py-2">
                    <div className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Agent workflow · live</div>
                    <WorkflowTree workflows={workflows} />
                  </div>
                </Panel>
                <Sash dir="row" />
                <Panel id="hq-ayra-input" defaultSize="10%" minSize={52}>
                  <form onSubmit={(e) => { e.preventDefault(); submit(); }} className="flex h-full items-center gap-1 p-2">
                    <span className="p-1.5 text-muted-foreground"><Paperclip className="h-4 w-4" /></span>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="AYRA ko kaam dein…" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1.5 text-xs outline-none focus:border-glow" />
                    <span className="p-1.5 text-muted-foreground"><Mic className="h-4 w-4" /></span>
                    <button type="submit" className="rounded bg-primary p-1.5 text-primary-foreground" aria-label="Send"><Send className="h-4 w-4" /></button>
                  </form>
                </Panel>
              </Group>
            </aside>
          </Panel>
        </Group>
      </div>

      <div className="flex h-6 shrink-0 items-center justify-between bg-primary px-3 font-mono text-[11px] text-primary-foreground">
        <span>⎇ main · AYRA {running ? "working…" : "online"}</span>
        <span>{running} live workflows · <Link to="/" className="underline">Workstation</Link></span>
      </div>
    </div>
  );
}
