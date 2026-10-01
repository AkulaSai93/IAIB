/**
 * Floating code props for the hero gutters — a terminal mid-build and a
 * snippet of the kind of thing a student ships here.
 *
 * Built on the same motif as the "How does it work?" cards: white panel,
 * black hard edge, traffic lights, red as the only accent. Purely
 * decorative, so the whole layer is hidden from assistive tech.
 */

function Dots() {
  return (
    <span className="flex shrink-0 items-center gap-[5px]">
      <i className="size-[6px] rounded-full bg-ink" />
      <i className="size-[6px] rounded-full bg-ink" />
      <i className="size-[6px] rounded-full bg-ink" />
    </span>
  );
}

function Chrome({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="hard-edge overflow-hidden rounded-[12px] bg-white">
      <div className="flex items-center gap-2 border-b-2 border-solid border-black px-2.5 py-[7px]">
        <Dots />
        <span className="font-code text-[9px] leading-none tracking-[0.04em] text-muted">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

/** Terminal running the build, with the command typing itself out. */
export function TerminalCard() {
  return (
    <Chrome label="bash">
      <div className="px-2.5 py-[9px] font-code text-[11px] leading-[17px]">
        <p className="flex items-center whitespace-nowrap">
          <span className="text-brand">$&nbsp;</span>
          {/* steps() + a clipped width gives the typewriter */}
          <span
            className="type-cmd overflow-hidden text-ink"
            style={{ "--ch": "17ch" } as React.CSSProperties}
          >
            ignite ai --build
          </span>
          <span className="caret-blink ml-[1px] inline-block h-[11px] w-[6px] bg-ink" />
        </p>
        <p className="text-muted">compiling ideas&hellip;</p>
        <p className="whitespace-nowrap text-ink">
          <span className="text-brand">&#10003;</span> built in 36h
        </p>
      </div>
    </Chrome>
  );
}

/** A snippet in the language the dashboard mascot speaks. */
export function SnippetCard() {
  return (
    <Chrome label="app.py">
      <div className="px-2.5 py-[9px] font-code text-[11px] leading-[17px] whitespace-nowrap">
        <p>
          <span className="text-brand">def</span>{" "}
          <span className="text-ink">build</span>
          <span className="text-muted">(idea):</span>
        </p>
        <p className="pl-3">
          <span className="text-ink">model</span>
          <span className="text-muted"> = </span>
          <span className="text-ink">ignite</span>
          <span className="text-muted">(idea)</span>
        </p>
        <p className="pl-3">
          <span className="text-brand">return</span>{" "}
          <span className="text-ink">model</span>
          <span className="text-muted">.ship()</span>
        </p>
      </div>
    </Chrome>
  );
}

/** Small one-line chip — a tag, a command, a commit. */
export function CodeChip({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span className="hard-edge inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-[6px] font-code text-[11px] leading-none whitespace-nowrap text-ink">
      {accent && <i className="size-[7px] shrink-0 rounded-full bg-brand" />}
      {children}
    </span>
  );
}

type Spot = {
  node: React.ReactNode;
  pos: React.CSSProperties;
  tilt: number;
  duration: number;
  delay: number;
};

/*
 * Placed in the gutters either side of the 869px lockup. The whole layer is
 * gated at xl (1280px), the narrowest width where the gutter — (1280-869)/2,
 * about 205px — can hold a card without reaching the artwork.
 */
const SPOTS: Spot[] = [
  {
    node: <TerminalCard />,
    pos: { left: "1.5%", top: "20%", width: 170 },
    tilt: -4,
    duration: 11,
    delay: 0,
  },
  {
    node: <SnippetCard />,
    pos: { right: "1.5%", top: "15%", width: 172 },
    tilt: 4,
    duration: 12,
    delay: -3,
  },
  {
    node: <CodeChip accent>vibe coding</CodeChip>,
    pos: { left: "2%", top: "70%" },
    tilt: 6,
    duration: 9,
    delay: -5,
  },
  {
    node: <CodeChip>git push origin main</CodeChip>,
    pos: { right: "1.5%", top: "73%" },
    tilt: -5,
    duration: 10,
    delay: -2,
  },
];

export default function HeroCodeDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block"
    >
      {SPOTS.map((s, i) => (
        <div
          key={i}
          className="float-soft absolute origin-center"
          style={
            {
              ...s.pos,
              "--tilt": `${s.tilt}deg`,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            } as React.CSSProperties
          }
        >
          {s.node}
        </div>
      ))}
    </div>
  );
}
