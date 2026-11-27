import mark from "@/assets/ayra-brand.png.asset.json";
import signal from "@/assets/ayra-signal.gif.asset.json";

export function BrandMark() {
  return <span className="flex shrink-0 items-center gap-2" aria-label="AYRA HQ">
    <picture><source media="(prefers-reduced-motion: reduce)" srcSet={mark.url} /><img src={signal.url} alt="" width={24} height={24} className="h-6 w-6 rounded" /></picture>
    <span className="font-semibold text-foreground">AYRA <span className="font-mono text-[10px] text-glow">HQ</span></span>
  </span>;
}