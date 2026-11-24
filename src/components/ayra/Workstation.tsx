import { useEffect, useRef, useState } from "react";
import {
  Files, Search, GitBranch, Bug, Blocks, Bot, Settings, UserCircle2, Paperclip, Image as ImageIcon,
  Send, Mic, Terminal, FileCode2, ChevronDown, CheckCircle2, Loader2, CircleDot, Maximize2, Minimize2, X, Cpu, Wifi,
} from "lucide-react";
import ayra from "@/assets/ayra.png.asset.json";

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
    const names = Array.from(fl).map((f) => f.name).join(", ");
    send(`analyze file: ${names}`);
  };

  const lastAyra = [...msgs].reverse().find((m) => m.from === "ayra")?.text;

  const Avatar = ({ big }: { big: boolean }) => (
    <div className={`relative h-full w-full overflow-hidden rounded-lg border border-glow/40 glow-ring scan animate-pop`}>
      <img src={ayra.url} alt="AYRA AI agent" className={`h-full w-full object-cover object-top ${speaking ? "" : "animate-breathe"}`} />
      <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-gradient-to-b from-background/80 to-transparent p-2 text-xs">
        <span className="flex items-center gap-1 font-mono text-glow"><CircleDot className="h-3 w-3 animate-pulse text-destructive" />LIVE · AYRA</span>
        <button onClick={() => setForceFull((f) => !f)} className="rounded p-1 hover:bg-accent" aria-label="Toggle stage">
          {big ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </button>
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent p-3">
        <div className="mb-2 flex h-5 items-end gap-0.5">
          {Array.from({ length: big ? 32 : 18 }).map((_, i) => (
            <span key={i} className={`w-1 rounded-full bg-glow ${speaking ? "animate-wave" : "opacity-30"}`} style={{ height: "100%", animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <p className={`${big ? "text-lg" : "text-xs"} line-clamp-3 text-foreground`}>{speaking ? "soch rahi hoon…" : lastAyra}</p>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen flex-col bg-background font-sans text-sm text-foreground">
      {/* title bar */}
      <div className="flex h-8 items-center justify-between border-b border-border bg-activity px-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-3"><span className="font-bold text-ai">◆ AYRA</span>{["File","Edit","View","Run","Terminal","Help"].map((m)=><span key={m} className="hidden hover:text-foreground sm:inline">{m}</span>)}</div>
        <a href="/admin" className="rounded border border-glow/40 px-2 font-mono text-glow hover:bg-accent">AYRA Workstation · Super Admin →</a>
        <div className="flex items-center gap-2"><Wifi className="h-3 w-3 text-success" /><Cpu className="h-3 w-3 text-glow" /></div>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* activity bar */}
        <nav className="flex w-12 flex-col items-center gap-1 bg-activity py-2">
          {tools.map(({ icon: I, label }, i) => (
            <button key={label} title={label} className={`rounded p-2 ${i === 0 ? "text-foreground" : "text-muted-foreground"} hover:text-glow`}><I className="h-5 w-5" /></button>
          ))}
          <div className="mt-auto flex flex-col gap-1">
            <button title="Account" className="p-2 text-muted-foreground hover:text-glow"><UserCircle2 className="h-5 w-5" /></button>
            <button title="Settings" className="p-2 text-muted-foreground hover:text-glow"><Settings className="h-5 w-5" /></button>
          </div>
        </nav>

        {/* explorer */}
        <aside className="hidden w-56 flex-col border-r border-border bg-panel md:flex">
          <div className="px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">Explorer</div>
          <div className="flex items-center gap-1 px-2 text-xs font-semibold"><ChevronDown className="h-3 w-3" />WORKSPACE</div>
          {files.map((f) => (
            <button key={f} onClick={() => setActiveFile(f)} className={`flex items-center gap-2 px-6 py-1 text-left font-mono text-xs ${activeFile === f ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-secondary"}`}>
              <FileCode2 className="h-3.5 w-3.5 text-glow" />{f}
            </button>
          ))}
        </aside>

        {/* workspace */}
        <main className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-9 items-end border-b border-border bg-panel">
            <div className="flex items-center gap-2 border-t-2 border-glow bg-background px-3 py-1.5 font-mono text-xs">{onStage ? "AYRA · Live Stage" : activeFile}<X className="h-3 w-3" /></div>
          </div>
          <div className="relative min-h-0 flex-1 p-4">
            {onStage ? (
              <div className="mx-auto h-full max-w-3xl"><Avatar big /></div>
            ) : (
              <pre className="h-full overflow-auto font-mono text-xs leading-6 text-muted-foreground animate-pop">
{`// ${activeFile}
// AYRA is working on ${tasks.filter(t=>t.status==="running").length} task(s)

${tasks.map((t) => `▸ ${t.title.padEnd(40)} ${Math.round(t.progress)}%  ${t.status}`).join("\n")}`}
              </pre>
            )}
          </div>
          {/* terminal */}
          <div className="h-32 border-t border-border bg-panel">
            <div className="flex items-center gap-2 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground"><Terminal className="h-3 w-3" />Terminal</div>
            <div className="h-24 overflow-auto px-3 font-mono text-xs">
              {log.map((l, i) => <div key={i} className="text-success">$ {l}</div>)}
            </div>
          </div>
        </main>

        {/* agent sidebar */}
        <aside className="flex w-80 flex-col border-l border-border bg-panel lg:w-96">
          <div className="flex h-[70%] min-h-0 flex-col p-2">
            {onStage ? (
              <div className="flex h-full flex-col gap-2 overflow-auto p-1">
                {msgs.map((m, i) => (
                  <div key={i} className={`max-w-[85%] rounded-lg px-3 py-2 text-xs ${m.from === "you" ? "self-end bg-primary text-primary-foreground" : "self-start border border-border bg-card"}`}>{m.text}</div>
                ))}
              </div>
            ) : <Avatar big={false} />}
          </div>
          <div className="h-[20%] min-h-0 overflow-auto border-t border-border px-2 py-1">
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
          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex h-[10%] min-h-14 items-center gap-1 border-t border-border p-2">
            <input ref={fileRef} type="file" multiple hidden onChange={(e) => onFiles(e.target.files)} />
            <button type="button" onClick={() => fileRef.current?.click()} className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Attach file"><Paperclip className="h-4 w-4" /></button>
            <button type="button" onClick={() => fileRef.current?.click()} className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Attach photo"><ImageIcon className="h-4 w-4" /></button>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="AYRA se baat karein ya command dein…" className="min-w-0 flex-1 rounded border border-input bg-background px-2 py-1.5 text-xs outline-none focus:border-glow" autoFocus />
            <button type="button" className="p-1.5 text-muted-foreground hover:text-glow" aria-label="Voice"><Mic className="h-4 w-4" /></button>
            <button type="submit" className="rounded bg-primary p-1.5 text-primary-foreground glow-ring" aria-label="Send"><Send className="h-4 w-4" /></button>
          </form>
        </aside>
      </div>

      {/* status bar */}
      <div className="flex h-6 items-center justify-between bg-primary px-3 font-mono text-[11px] text-primary-foreground">
        <span>⎇ main · AYRA {running ? "working…" : "online"}</span>
        <span>{tasks.filter((t) => t.status === "done").length}/{tasks.length} tasks · UTF-8</span>
      </div>
    </div>
  );
}
