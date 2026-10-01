/**
 * Chunky 90s-style word sticker: heavy slanted caps with a magenta and black
 * hard offset, a white die-cut edge, and speed lines behind.
 */

export type HypeStickerProps = {
  lines: string[];
  /** Font size in px. */
  size?: number;
  rotate?: number;
  /** Fill colour per line; cycles if there are more lines than colours. */
  colors?: string[];
  className?: string;
};

type Streak = {
  top: string;
  left?: string;
  right?: string;
  w: number;
  color: string;
  rotate?: number;
};

const STREAKS: Streak[] = [
  { top: "-14%", left: "6%", w: 54, color: "#35b6e0" },
  { top: "-6%", right: "4%", w: 38, color: "#9ccb3b" },
  { top: "4%", left: "-9%", w: 30, color: "#d6228c" },
  { top: "30%", right: "-8%", w: 46, color: "#7b5ea8" },
  { top: "52%", left: "-11%", w: 34, color: "#35b6e0" },
  { top: "84%", left: "10%", w: 58, color: "#9ccb3b" },
  { top: "96%", right: "8%", w: 40, color: "#d6228c" },
  { top: "108%", left: "22%", w: 30, color: "#7b5ea8" },
];

export default function HypeSticker({
  lines,
  size = 44,
  rotate = 0,
  colors = ["#35b6e0", "#9ccb3b"],
  className,
}: HypeStickerProps) {
  return (
    <span
      className={`hype ${className ?? ""}`}
      style={{ fontSize: size, transform: `rotate(${rotate}deg)` }}
    >
      <span className="hype-streaks" aria-hidden>
        {STREAKS.map((s, i) => (
          <i
            key={i}
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              width: s.w,
              background: s.color,
              transform: `rotate(${s.rotate ?? 0}deg)`,
            }}
          />
        ))}
      </span>

      {/* die-cut layer sits behind every line, so line 2 can't clip line 1 */}
      <span className="hype-cutstack" aria-hidden>
        {lines.map((l, i) => (
          <span className="hype-line hype-cut" key={i}>
            {l}
          </span>
        ))}
      </span>

      <span className="hype-faces">
        {lines.map((l, i) => (
          <span
            className="hype-line hype-face"
            key={i}
            style={{ color: colors[i % colors.length] }}
          >
            {l}
          </span>
        ))}
      </span>
    </span>
  );
}
