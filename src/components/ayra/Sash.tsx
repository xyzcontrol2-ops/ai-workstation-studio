import { Separator } from "react-resizable-panels";

// Drag handle (VS Code sash). "col" = vertical bar between side-by-side panels, "row" = horizontal bar.
export function Sash({ dir }: { dir: "col" | "row" }) {
  return (
    <Separator
      className={`group relative shrink-0 bg-border transition-colors hover:bg-glow data-[separator=active]:bg-glow ${dir === "col" ? "w-px cursor-col-resize" : "h-px cursor-row-resize"}`}
    >
      <span className={`absolute ${dir === "col" ? "inset-y-0 -left-1 w-2" : "inset-x-0 -top-1 h-2"}`} />
    </Separator>
  );
}
