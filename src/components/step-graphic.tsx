/**
 * Small code-flavoured illustrations for the "How does it work?" cards —
 * one per step, all built on the same little app-window motif so the four
 * read as a set.
 */

const INK = "#131313";
const RED = "#e7000b";
const FILL = "#ffffff";
const BAR = "#dedede";

type Props = { variant: 1 | 2 | 3 | 4; className?: string };

function Window({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <rect
        x={2}
        y={2}
        width={250}
        height={114}
        rx={11}
        fill={FILL}
        stroke={INK}
        strokeWidth={3}
      />
      <path d="M2 32 H252" stroke={INK} strokeWidth={3} />
      <circle cx={17} cy={17} r={3.6} fill={INK} />
      <circle cx={30} cy={17} r={3.6} fill={INK} />
      <circle cx={43} cy={17} r={3.6} fill={INK} />
      {children}
    </g>
  );
}

export default function StepGraphic({ variant, className }: Props) {
  return (
    <svg
      viewBox="0 0 254 118"
      className={className}
      role="img"
      aria-hidden
      fill="none"
    >
      {/* 01 — Registration: a sign-up form */}
      {variant === 1 && (
        <Window>
          <text
            x={236}
            y={22}
            textAnchor="end"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize={12}
            fontWeight={700}
            fill={RED}
          >
            &lt;form/&gt;
          </text>
          <rect x={18} y={44} width={150} height={19} rx={6} fill="#f3f3f3" stroke={INK} strokeWidth={2.5} />
          <rect x={26} y={51} width={54} height={5} rx={2.5} fill={BAR} />
          <rect x={18} y={70} width={150} height={19} rx={6} fill="#f3f3f3" stroke={INK} strokeWidth={2.5} />
          <rect x={26} y={77} width={78} height={5} rx={2.5} fill={BAR} />
          <rect x={18} y={95} width={84} height={16} rx={8} fill={RED} stroke={INK} strokeWidth={2.5} />
          <rect x={186} y={52} width={48} height={48} rx={10} fill="#f3f3f3" stroke={INK} strokeWidth={2.5} />
          <circle cx={210} cy={68} r={8} fill="none" stroke={INK} strokeWidth={2.5} />
          <path d="M197 90c0-7 6-12 13-12s13 5 13 12" stroke={INK} strokeWidth={2.5} strokeLinecap="round" />
        </Window>
      )}

      {/* 02 — Live Learning: a live session over code */}
      {variant === 2 && (
        <Window>
          <circle cx={200} cy={17} r={4.5} fill={RED} />
          <text
            x={212}
            y={21}
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize={11}
            fontWeight={700}
            fill={RED}
          >
            LIVE
          </text>
          <circle cx={58} cy={76} r={24} fill={RED} stroke={INK} strokeWidth={3} />
          <path d="M52 66l16 10-16 10z" fill={FILL} />
          <rect x={100} y={54} width={124} height={7} rx={3.5} fill={BAR} />
          <rect x={100} y={70} width={92} height={7} rx={3.5} fill={BAR} />
          <rect x={100} y={86} width={112} height={7} rx={3.5} fill={BAR} />
        </Window>
      )}

      {/* 03 — Screening + Vibecoding: a prompt building something */}
      {variant === 3 && (
        <Window>
          <text
            x={236}
            y={22}
            textAnchor="end"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize={12}
            fontWeight={700}
            fill={RED}
          >
            ~/build
          </text>
          <path d="M20 52l9 8-9 8" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
          <rect x={38} y={55} width={96} height={7} rx={3.5} fill={BAR} />
          <rect x={20} y={74} width={128} height={7} rx={3.5} fill={BAR} />
          <rect x={154} y={71} width={11} height={14} rx={2} fill={RED} />
          <rect x={20} y={93} width={68} height={7} rx={3.5} fill={BAR} />
          <circle cx={208} cy={78} r={22} fill="#e2f8ef" stroke={INK} strokeWidth={3} />
          <path d="M197 78l8 8 15-16" stroke={INK} strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round" />
        </Window>
      )}

      {/* 04 — Grand Finale: ship it */}
      {variant === 4 && (
        <Window>
          <text
            x={236}
            y={22}
            textAnchor="end"
            fontFamily="ui-monospace, Menlo, monospace"
            fontSize={12}
            fontWeight={700}
            fill={RED}
          >
            $ ship
          </text>
          <rect x={20} y={52} width={104} height={7} rx={3.5} fill={BAR} />
          <rect x={20} y={68} width={76} height={7} rx={3.5} fill={BAR} />
          <rect x={20} y={84} width={94} height={7} rx={3.5} fill={BAR} />
          {/* rocket */}
          <g transform="rotate(20 196 74)">
            <path
              d="M196 44c11 11 15 26 12 40h-24c-3-14 1-29 12-40z"
              fill={RED}
              stroke={INK}
              strokeWidth={3}
              strokeLinejoin="round"
            />
            <circle cx={196} cy={62} r={6} fill={FILL} stroke={INK} strokeWidth={2.5} />
            <path d="M184 76l-10 12h12z" fill={FILL} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M208 76l10 12h-12z" fill={FILL} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
            <path d="M191 90c2 7 3 11 5 13 2-2 3-6 5-13z" fill="#ffb020" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          </g>
        </Window>
      )}
    </svg>
  );
}
