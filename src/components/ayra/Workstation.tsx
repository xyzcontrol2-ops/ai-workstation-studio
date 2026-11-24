import { useEffect, useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import {
  Files, Search, GitBranch, Bug, Blocks, Bot, Settings, UserCircle2, Paperclip, Image as ImageIcon,
  Send, Mic, Terminal, FileCode2, ChevronDown, CheckCircle2, Loader2, CircleDot, Maximize2, Minimize2, X, Cpu, Wifi,
} from "lucide-react";
import ayra from "@/assets/ayra.png.asset.json";
import { ThemeToggle } from "./ThemeToggle";

type Task = { id: number; title: string; progress: number; status: "running" | "done" };
type Msg = { from: "you" | "ayra"; text: string };

const files = ["src/app.tsx", "src/agent.ts", "README.md", "notes.txt"];
const tools = [
  { icon: Files, label: "Explorer" }, { icon: Search, label: "Search" }, { icon: GitBranch, label: "Source Control" },
  { icon: Bug, label: "Run & Debug" }, { icon: Blocks, label: "Extensions" }, { icon: Bot, label: "AYRA" },
];
const taskWords = /(bana|create|build|likh|write|fix|run|search|dhund|generate|analy|open|kar)/i;

function reply(t: string) {
  if (/^(hi|hello|hey|namaste)/i.test(t)) return "Namaste! 😊 Main AYRA hoon. Aaj kya karna hai?";
  if (/kaise ho|how are/i.test(t)) return "Main bilkul mast hoon! Aapke saath kaam karne ko ready ✨";
  if (taskWords.test(t)) return `Theek hai, "${t}" shuru kar rahi hoon. Main side me chali jaati hoon, aap workspace dekhiye 👉`;
  return "Samajh gayi. Aur bataiye, main sun rahi hoon 🎧";
}

// Drag handles (VS Code style sash). "col" = vertical bar between side-by-side panels, "row" = horizontal bar.
function Sash({ dir }: { dir: "col" | "row" }) {
  return (
    <Separator
      className={`group relative shrink-0 bg-border transition-colors hover:bg-glow data-[separator=active]:bg-glow ${dir === "col" ? "w-px cursor-col-resize" : "h-px cursor-row-resize"}`}
    >
      <span className={`absolute ${dir === "col" ? "inset-y-0 -left-1 w-2" : "inset-x-0 -top-1 h-2"}`} />
    </Separator>
  );
}

// The portrait always shows the whole face: a blurred copy fills the frame, the sharp portrait is
// "contain"-fitted on top, so any panel size / shape keeps the face fully visible and auto-scaled.
function Avatar({ big, speaking, text, onToggle }: { big: boolean; speaking: boolean; text?: string | undefined; onToggle: () => void }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-glow/40 bg-panel glow-ring scan animate-pop [container-type:size]">
      <img src={ayra.url} alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover object-top opacity-40 blur-2xl" />
      <img src={ayra.url} alt="AYRA AI agent" className={`absolute inset-0 h-full w-full object-contain object-top ${speaking ? "" : "animate-breathe"}`} />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent p-2" style={{ fontSize: "clamp(10px, 2.6cqw, 14px)" }}>
        <span className="flex items-center gap-1 rounded bg-background/70 px-1.5 font-mono text-glow"><CircleDot className="h-3 w-3 animate-pulse text-destructive" />LIVE · AYRA</span>
        <button onClick={onToggle} className="rounded bg-background/70 p-1 hover:bg-accent" aria-label="Toggle stage">
          {big ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/85 to-transparent p-3">
        <div className="mb-1.5 flex h-4 items-end gap-0.5">
          {Array.from({ length: big ? 32 : 18 }).map((_, i) => (
            <span key={i} className={`w-1 rounded-full bg-glow ${speaking ? "animate-wave" : "opacity-30"}`} style={{ height: "100%", animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <p className="line-clamp-2 text-foreground" style={{ fontSize: "clamp(11px, 3.4cqw, 22px)" }}>{speaking ? "soch rahi hoon…" : text}</p>
      </div>
    </div>
  );
}

export function Workstation() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [msgs, setMsgs] = useState<Msg[]>([{ from: "ayra", text: "Hello! Main AYRA. Koi bhi command, photo ya file bhejiye." }]);
  const [input, setInput] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [forceFull, setForceFull] = useState(false);
  const [activeFile, setActiveFile] = useState(files[0]!);
  const [log, setLog] = useState<string[]>(["AYRA kernel v1.0 booted", "All systems online"]);
  const fileRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);

  const running = tasks.some((t) => t.status === "running");
  const onStage = !running || forceFull; // full screen anchor mode

  useEffect(() => {
    if (!running) return;
    const iv = setInterval(() => {
      setTasks((ts) => ts.map((t) => {
        if (t.status !== "running") return t;
        const p = Math.min(100, t.progress + Math.random() * 12);
        if (p >= 100) setLog((l) => [...l, `✔ Done: ${t.title}`]);
        return { ...t, progress: p, status: p >= 100 ? "done" : "running" };
      }));
    }, 600);
    return () => clearInterval(iv);
  }, [running]);

  const say = (text: string) => {
    setSpeaking(true);
    setTimeout(() => { setMsgs((m) => [...m, { from: "ayra", text }]); setSpeaking(false); }, 700);
  };

  const send = (text = input) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { from: "you", text: t }]);
    setInput("");
    if (taskWords.test(t)) {
      setForceFull(false);
      setTasks((ts) => [{ id: idRef.current++, title: t, progress: 0, status: "running" as const }, ...ts].slice(0, 20));
      setLog((l) => [...l, `▶ Task started: ${t}`]);
    }
    say(reply(t));
  };

  const onFiles = (fl: FileList | null) => {
    if (!fl?.length) return;
    send(`analyze file: ${Array.from(fl).map((f) => f.name).join(", ")}`);
  };

  const lastAyra = [...msgs].reverse().find((m) => m.from === "ayra")?.text;
  const toggleStage = () => setForceFull((f) => !f);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-sans text-sm text-foreground">
      {/* title bar */}
      <div className="flex h-8 shrink-0 items-center justify-between border-b border-border bg-secondary px-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3"><span className="font-bold text-ai">◆ AYRA</span>{["File","Edit","View","Run","Terminal","Help"].map((m)=><span key={m} className="hidden hover:text-foreground lg:inline">{m}</span>)}</div>
        <a href="/admin" className="rounded border border-glow/40 px-2 font-mono text-glow hover:bg-accent">Super Admin →</a>
        <div className="flex items-center gap-2"><ThemeToggle /><Wifi className="h-3 w-3 text-success" /><Cpu className="h-3 w-3 text-glow" /></div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* activity bar */}
        <nav className="flex w-12 shrink-0 flex-col items-center gap-1 bg-activity py-2 text-activity-foreground">
          {tools.map(({ icon: I, label }, i) => (
            <button key={label} title={label} className={`rounded p-2 ${i === 0 ? "opacity-100" : "opacity-60"} hover:opacity-100`}><I className="h-5 w-5" /></button>
          ))}
          <div className="mt-auto flex flex-col gap-1">
            <button title="Account" className="p-2 opacity-60 hover:opacity-100"><UserCircle2 className="h-5 w-5" /></button>
            <button title="Settings" className="p-2 opacity-60 hover:opacity-100"><Settings className="h-5 w-5" /></button>
          </div>
        </nav>

        {/* all panels are drag-resizable */}
        <Group orientation="horizontal" className="min-w-0 flex-1">
          {/* explorer */}
          <Panel id="explorer" defaultSize="14%" minSize="8%" maxSize="30%" className="hidden sm:block">
            <aside className="flex h-full flex-col overflow-hidden bg-panel">
              <div className="px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">Explorer</div>
              <div className="flex items-center gap-1 px-2 text-xs font-semibold"><ChevronDown className="h-3 w-3" />WORKSPACE</div>
              {files.map((f) => (
                <button key={f} onClick={() => setActiveFile(f)} className={`flex items-center gap-2 truncate px-6 py-1 text-left font-mono text-xs ${activeFile === f ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
                  <FileCode2 className="h-3.5 w-3.5 shrink-0 text-glow" />{f}
                </button>
              ))}
            </aside>
          </Panel>
          <Sash dir="col" />

          {/* workspace + terminal */}
          <Panel id="workspace" defaultSize="56%" minSize="20%">
            <Group orientation="vertical">
              <Panel id="editor" defaultSize="75%" minSize="25%">
                <main className="flex h-full min-w-0 flex-col">
                  <div className="flex h-9 shrink-0 items-end border-b border-border bg-panel">
                    <div className="flex items-center gap-2 border-t-2 border-glow bg-background px-3 py-1.5 font-mono text-xs">{onStage ? "AYRA · Live Stage" : activeFile}<X className="h-3 w-3" /></div>
                  </div>
                  <div className="relative min-h-0 flex-1 p-3">
                    {onStage ? (
                      <div className="mx-auto h-full max-w-3xl"><Avatar big speaking={speaking} text={lastAyra} onToggle={toggleStage} /></div>
                    ) : (
                      <pre className="h-full overflow-auto font-mono text-xs leading-6 text-muted-foreground animate-pop">
{`// ${activeFile}
// AYRA is working on ${tasks.filter(t=>t.status==="running").length} task(s)

${tasks.map((t) => `▸ ${t.title.padEnd(40)} ${Math.round(t.progress)}%  ${t.status}`).join("\n")}`}
                      </pre>
                    )}
                  </div>
                </main>
              </Panel>
              <Sash dir="row" />
              <Panel id="terminal" defaultSize="25%" minSize="8%">
                <div className="flex h-full flex-col bg-panel">
                  <div className="flex shrink-0 items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"><Terminal className="h-3 w-3" />Terminal</div>
                  <div className="min-h-0 flex-1 overflow-auto px-3 font-mono text-xs">
                    {log.map((l, i) => <div key={i} className="text-success">$ {l}</div>)}
                  </div>
                </div>
              </Panel>
            </Group>
          </Panel>
          <Sash dir="col" />

          {/* agent sidebar: 70% AYRA/chat, 20% tasks, 10% command box (all resizable) */}
          <Panel id="agent" defaultSize="30%" minSize="18%" maxSize="60%">
            <aside className="h-full bg-panel">
              <Group orientation="vertical">
                <Panel id="agent-main" defaultSize="70%" minSize="25%">
                  <div className="h-full p-2">
                    {onStage ? (
                      <div className="flex h-full flex-col gap-2 overflow-auto p-1">
                        {msgs.map((m, i) => (
                          <div key={i} className={`max-w-[88%] rounded-lg px-3 py-2 text-xs ${m.from === "you" ? "self-end bg-primary text-primary-foreground" : "self-start border border-border bg-card"}`}>{m.text}</div>
                        ))}
                      </div>
                    ) : <Avatar big={false} speaking={speaking} text={lastAyra} onToggle={toggleStage} />}
                  </div>
                </Panel>
                <Sash dir="row" />
                <Panel id="agent-tasks" defaultSize="20%" minSize="8%">
                  <div className="h-full overflow-auto px-2 py-1">
                    <div className="mb-1 text-[11px] uppercase tracking-widest text-muted-foreground">Tasks ({tasks.length})</div>
                    {tasks.length === 0 && <p className="text-xs text-muted-foreground">Koi task nahi. AYRA idle hai.</p>}
                    {tasks.map((t) => (
                      <div key={t.id} className="mb-1.5">
                        <div className="flex items-center gap-1.5 text-xs">
                          {t.status === "done" ? <CheckCircle2 className="h-3 w-3 shrink-0 text-success" /> : <Loader2 className="h-3 w-3 shrink-0 animate-spin text-glow" />}
                          <span className="truncate">{t.title}</span>
                        </div>
                        <div className="mt-0.5 h-1 rounded bg-secondary"><div className="h-1 rounded bg-glow transition-all" style={{ width: `${t.progress}%` }} /></div>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Sash dir="row" />
                <Panel id="agent-input" defaultSize="10%" minSize={52}>
                  <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex h-full items-center gap-1 p-2">
                    <input ref={fileRef} type="file" multiple hidden onChange={(e) => onFiles(e.target.files)} />
                    <button type="button" onClick={() => fileRef.current?.click()} className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Attach file"><Paperclip className="h-4 w-4" /></button>
                    <button type="button" onClick={() => fileRef.current?.click()} className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Attach photo"><ImageIcon className="h-4 w-4" /></button>
                    <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="AYRA se baat karein ya command dein…" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1.5 text-xs outline-none focus:border-glow" autoFocus />
                    <button type="button" className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Voice"><Mic className="h-4 w-4" /></button>
                    <button type="submit" className="rounded bg-primary p-1.5 text-primary-foreground" aria-label="Send"><Send className="h-4 w-4" /></button>
                  </form>
                </Panel>
              </Group>
            </aside>
          </Panel>
        </Group>
      </div>

      {/* status bar */}
      <div className="flex h-6 shrink-0 items-center justify-between bg-primary px-3 font-mono text-[11px] text-primary-foreground">
        <span>⎇ main · AYRA {running ? "working…" : "online"}</span>
        <span>{tasks.filter((t) => t.status === "done").length}/{tasks.length} tasks · UTF-8</span>
      </div>
    </div>
  );
}
