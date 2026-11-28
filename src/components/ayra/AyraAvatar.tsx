import { useEffect, useRef, useState } from "react";
import { CircleDot, Maximize2, Minimize2 } from "lucide-react";
import ayra from "@/assets/ayra.png.asset.json";

type RGB = [number, number, number];

/** Reads the photo's own backdrop colour from its edges so any agent portrait fills its frame seamlessly. */
function useEdgeColor(src: string) {
  const [rgb, setRgb] = useState<RGB | null>(null);
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const w = 64, h = Math.round((img.height / img.width) * 64);
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        const d = ctx.getImageData(0, 0, w, h).data;
        let r = 0, g = 0, b = 0, n = 0;
        const add = (x: number, y: number) => { const i = (y * w + x) * 4; r += d[i]!; g += d[i + 1]!; b += d[i + 2]!; n++; };
        for (let y = 0; y < h; y++) { add(0, y); add(1, y); add(w - 1, y); add(w - 2, y); }
        for (let x = 0; x < w; x++) add(x, 0);
        setRgb([Math.round(r / n), Math.round(g / n), Math.round(b / n)]);
      } catch { /* keep theme colour */ }
    };
    img.src = src;
  }, [src]);
  return rgb;
}

/** Head follows the mouse with smooth, slightly lazy human-like motion. */
function useLookAt(ref: React.RefObject<HTMLDivElement | null>) {
  const [t, setT] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      target.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2)));
      target.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.3)) / (window.innerHeight / 2)));
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06; cur.y += (target.y - cur.y) * 0.06;
      setT({ x: cur.x, y: cur.y });
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [ref]);
  return t;
}

export function AyraAvatar({ big = false, speaking, text, onToggle, src = ayra.url, name = "AYRA" }: {
  big?: boolean; speaking: boolean; text?: string | undefined; onToggle?: () => void; src?: string; name?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rgb = useEdgeColor(src);
  const look = useLookAt(ref);
  const bg = rgb ? `rgb(${rgb.join(",")})` : "var(--panel)";
  const light = rgb ? rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 > 150 : false;
  const ink = rgb ? (light ? "rgb(25,28,35)" : "rgb(240,242,245)") : "var(--foreground)";
  const chip = light ? "rgba(255,255,255,.75)" : "rgba(0,0,0,.45)";

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden rounded-lg border border-glow/40 glow-ring animate-pop [container-type:size]" style={{ background: bg, color: ink }}>
      <div
        className="absolute inset-0 flex justify-center"
        style={{ transform: `perspective(900px) rotateY(${look.x * 10}deg) rotateX(${-look.y * 6}deg) translate(${look.x * 8}px, ${look.y * 4}px)`, transformOrigin: "50% 35%" }}
      >
        <img
          src={src}
          alt={`${name} AI agent`}
          decoding="async"
          fetchPriority={big ? "high" : "auto"}
          draggable={false}
          className={`h-full w-auto max-w-full object-cover object-top ${speaking ? "animate-talk" : "animate-breathe"}`}
          style={{ maskImage: "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)" }}
        />
      </div>
      <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2" style={{ fontSize: "clamp(10px, 2.6cqw, 14px)" }}>
        <span className="flex items-center gap-1 rounded px-1.5 font-mono" style={{ background: chip }}><CircleDot className="h-3 w-3 animate-pulse text-destructive" />LIVE · {name}</span>
        {onToggle && (
          <button onClick={onToggle} className="rounded p-1" style={{ background: chip }} aria-label="Toggle stage">
            {big ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-3" style={{ background: `linear-gradient(to top, ${bg} 55%, transparent)` }}>
        <div className="mb-1.5 flex h-4 items-end gap-0.5">
          {Array.from({ length: big ? 32 : 18 }).map((_, i) => (
            <span key={i} className={`w-1 rounded-full bg-glow ${speaking ? "animate-wave" : "opacity-30"}`} style={{ height: "100%", animationDelay: `${i * 0.05}s` }} />
          ))}
        </div>
        <p className="line-clamp-2" style={{ fontSize: "clamp(11px, 3.4cqw, 22px)" }}>{speaking ? "soch rahi hoon…" : text}</p>
      </div>
    </div>
  );
}
