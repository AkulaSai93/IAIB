type StickerProps = {
  children: string;
  /** Font size in px. */
  size?: number;
  rotate?: number;
  className?: string;
};

export function CodeSticker({
  children,
  size = 34,
  rotate = 0,
  className,
}: StickerProps) {
  return (
    <span
      className={`sticker ${className ?? ""}`}
      style={{ fontSize: size, transform: `rotate(${rotate}deg)` }}
    >
      <span className="sticker-cut" aria-hidden>
        {children}
      </span>
      <span className="sticker-face">{children}</span>
    </span>
  );
}

export type StickerSpec = {
  text: string;
  /** Placement within the host section. */
  pos: React.CSSProperties;
  size?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
};

function Field({
  stickers,
  scaleClass,
  className,
}: {
  stickers: StickerSpec[];
  scaleClass: string;
  className: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      {stickers.map((s, i) => (
        <div
          key={`${s.text}-${i}`}
          className={`float-soft absolute origin-center ${scaleClass}`}
          style={
            {
              ...s.pos,
              "--tilt": "0deg",
              animationDuration: `${s.duration ?? 8}s`,
              animationDelay: `${s.delay ?? 0}s`,
            } as React.CSSProperties
          }
        >
          <CodeSticker size={s.size} rotate={s.rotate}>
            {s.text}
          </CodeSticker>
        </div>
      ))}
    </div>
  );
}

/**
 * Decorative layer of code stickers. Purely ornamental, so it is hidden from
 * assistive tech.
 *
 * Narrow screens get their own placements: the content column runs almost
 * edge to edge there, so the only reliably empty space is the padding band
 * under a section rather than the side gutters desktop can use.
 *
 * `from` is where the gutter placements take over. Sections whose content
 * column leaves gutters at tablet width keep the default "md"; the hero sets
 * "xl", because its 869px lockup only clears the sides past 1280.
 */
export default function StickerField({
  stickers,
  mobile,
  from = "md",
}: {
  stickers: StickerSpec[];
  mobile?: StickerSpec[];
  from?: "md" | "xl";
}) {
  const compact =
    from === "xl"
      ? { hide: "xl:hidden", scale: "scale-[0.62] md:scale-[0.85]" }
      : { hide: "md:hidden", scale: "scale-[0.62]" };
  const gutter = from === "xl" ? "hidden xl:block" : "hidden md:block";

  return (
    <>
      <Field
        stickers={mobile ?? stickers}
        scaleClass={compact.scale}
        className={compact.hide}
      />
      <Field stickers={stickers} scaleClass="" className={gutter} />
    </>
  );
}
