import mark from "@/assets/ayra-brand.png.asset.json";
import signal from "@/assets/ayra-signal.gif.asset.json";

export function BrandMark() {
  return (
    <span className="flex shrink-0 items-center gap-2.5" aria-label="AYRA HQ">
      <span className="brand-symbol">
        <picture>
          <source media="(prefers-reduced-motion: reduce)" srcSet={mark.url} />
          <img src={signal.url} alt="" width={30} height={30} decoding="async" className="h-7 w-7 rounded-[0.3rem]" />
        </picture>
      </span>
      <span className="flex items-baseline gap-1.5 font-semibold tracking-tight text-foreground">
        AYRA <span className="font-mono text-[10px] font-medium text-glow">HQ</span>
        <span className="hidden font-mono text-[8px] font-normal uppercase tracking-[0.18em] text-muted-foreground xl:inline">AI operations</span>
      </span>
    </span>
  );
}
