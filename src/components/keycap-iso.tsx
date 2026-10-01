/**
 * Isometric key cluster — a decorative 2x2 keypad with a raised `{ }` key
 * and a `</>` key. Drawn with a 2:1 isometric projection so it stays crisp
 * at any size.
 */

const S = 40; // unit size
const COS = 0.866;

/** Project a point in iso space to screen space. */
const iso = (x: number, y: number, z: number): [number, number] => [
  (x - y) * COS * S,
  (x + y) * 0.5 * S - z * S,
];

const poly = (pts: [number, number, number][]) =>
  pts.map(([x, y, z]) => iso(x, y, z).join(",")).join(" ");

const STROKE = "#16182e";

type BoxProps = {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
  h: number;
  /** Top-face inset, giving the keycap its taper. */
  taper?: number;
  top: string;
  left: string;
  right: string;
  rx?: number;
};

function IsoBox({ x0, y0, x1, y1, h, taper = 0, top, left, right }: BoxProps) {
  const a0 = x0 + taper;
  const b0 = y0 + taper;
  const a1 = x1 - taper;
  const b1 = y1 - taper;
  return (
    <g stroke={STROKE} strokeWidth={2} strokeLinejoin="round">
      {/* +y face reads as the lower-left side */}
      <polygon
        points={poly([
          [x0, y1, 0],
          [x1, y1, 0],
          [a1, b1, h],
          [a0, b1, h],
        ])}
        fill={left}
      />
      {/* +x face reads as the lower-right side */}
      <polygon
        points={poly([
          [x1, y0, 0],
          [x1, y1, 0],
          [a1, b1, h],
          [a1, b0, h],
        ])}
        fill={right}
      />
      <polygon
        points={poly([
          [a0, b0, h],
          [a1, b0, h],
          [a1, b1, h],
          [a0, b1, h],
        ])}
        fill={top}
      />
    </g>
  );
}

/** Lay a glyph flat on a key's top face. */
function OnKeyTop({
  cx,
  cy,
  h,
  children,
}: {
  cx: number;
  cy: number;
  h: number;
  children: React.ReactNode;
}) {
  const [tx, ty] = iso(cx, cy, h);
  // maps local (u,v) onto the isometric top plane
  const m = `matrix(${COS * S},${0.5 * S},${-COS * S},${0.5 * S},${tx},${ty})`;
  return <g transform={m}>{children}</g>;
}

export default function KeycapIso({ className }: { className?: string }) {
  const KEY = 0.82; // key footprint
  const GAP = 0.18;
  const keyAt = (gx: number, gy: number) => ({
    x0: gx * (KEY + GAP),
    y0: gy * (KEY + GAP),
    x1: gx * (KEY + GAP) + KEY,
    y1: gy * (KEY + GAP) + KEY,
  });

  const green = { top: "#7fe3b0", left: "#35c07d", right: "#1f9c60" };
  const blue = { top: "#8aa9f8", left: "#4470e0", right: "#2b54c4" };
  const pale = { top: "#f2f4ff", left: "#d3d8f4", right: "#c1c8ef" };

  const back = keyAt(0, 0); // raised { } key
  const right = keyAt(1, 0);
  const left = keyAt(0, 1);
  const front = keyAt(1, 1); // </> key

  const H_BACK = 0.58; // the raised { } key
  const H_SIDE = 0.3;
  const H_FRONT = 0.44;

  return (
    <svg
      viewBox="-120 -78 240 200"
      className={className}
      role="img"
      aria-label="Isometric keypad with code keys"
    >
      {/* base slab */}
      <IsoBox
        x0={-0.34}
        y0={-0.34}
        x1={2.34}
        y1={2.34}
        h={0.34}
        top="#e4e8fb"
        left="#b9c1ec"
        right="#a7b0e4"
      />
      {/* inner well, so the keys look seated */}
      <g stroke={STROKE} strokeWidth={2} strokeLinejoin="round">
        <polygon
          points={poly([
            [-0.14, -0.14, 0.34],
            [2.14, -0.14, 0.34],
            [2.14, 2.14, 0.34],
            [-0.14, 2.14, 0.34],
          ])}
          fill="#ccd2f3"
        />
      </g>

      {/* keys, painted back to front */}
      <g transform={`translate(0,${-0.34 * S})`}>
        <IsoBox {...back} h={H_BACK} taper={0.07} {...green} />
        <OnKeyTop cx={back.x0 + KEY / 2} cy={back.y0 + KEY / 2} h={H_BACK}>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={0.34}
            fontFamily="ui-monospace, Menlo, monospace"
            fontWeight={700}
            fill={STROKE}
          >
            {"{ }"}
          </text>
        </OnKeyTop>

        <IsoBox {...right} h={H_SIDE} taper={0.07} {...pale} />
        <IsoBox {...left} h={H_SIDE} taper={0.07} {...pale} />

        <IsoBox {...front} h={H_FRONT} taper={0.07} {...blue} />
        <OnKeyTop cx={front.x0 + KEY / 2} cy={front.y0 + KEY / 2} h={H_FRONT}>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={0.26}
            fontFamily="ui-monospace, Menlo, monospace"
            fontWeight={700}
            fill="#ffffff"
          >
            {"</>"}
          </text>
        </OnKeyTop>
      </g>
    </svg>
  );
}
