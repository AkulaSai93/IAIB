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
  scale,
  className,
}: {
  stickers: StickerSpec[];
  scale: number;
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
          className="float-soft absolute origin-center"
          style={
            {
              ...s.pos,
              scale: String(scale),
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
 */
export default function StickerField({
  stickers,
  mobile,
}: {
  stickers: StickerSpec[];
  mobile?: StickerSpec[];
}) {
  return (
    <>
      <Field stickers={mobile ?? stickers} scale={0.62} className="md:hidden" />
      <Field stickers={stickers} scale={1} className="hidden md:block" />
    </>
  );
}
