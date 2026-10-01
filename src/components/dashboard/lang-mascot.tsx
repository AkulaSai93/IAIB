"use client";

/**
 * The daily problem's language *is* the mascot — the logo itself breathes,
 * its halves counter-rotate, and it blinks. Clicking it opens the problem.
 *
 * These are stylised renditions of each language mark, drawn as SVG so they
 * can be animated; swap in official brand SVGs if you need exact marks.
 */

type Props = {
  lang: "python" | "javascript";
  onClick: () => void;
  awake: boolean;
  label: string;
};

function PythonMark() {
  // Each half is two overlapping rounded bars forming a hook; the second is
  // the first rotated 180°, which is what makes them interlock.
  const Hook = ({ fill }: { fill: string }) => (
    <g fill={fill}>
      <rect x={38} y={10} width={54} height={36} rx={15} />
      <rect x={20} y={36} width={54} height={36} rx={15} />
    </g>
  );

  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden>
      <g className="mascot-half-a">
        <Hook fill="#3776AB" />
        <circle className="mascot-eye" cx={78} cy={26} r={5} fill="#fff" />
      </g>
      <g className="mascot-half-b" transform="rotate(180 60 60)">
        <Hook fill="#FFD43B" />
        <circle className="mascot-eye" cx={78} cy={26} r={5} fill="#fff" />
      </g>
    </svg>
  );
}

function JsMark() {
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden>
      <g className="mascot-half-a">
        <rect x={10} y={10} width={100} height={100} rx={18} fill="#F7DF1E" />
      </g>
      <g className="mascot-half-b">
        <text
          x={62}
          y={88}
          textAnchor="middle"
          fontFamily="ui-monospace, Menlo, monospace"
          fontSize={52}
          fontWeight={700}
          fill="#12121a"
        >
          JS
        </text>
        <circle className="mascot-eye" cx={34} cy={36} r={4.5} fill="#12121a" />
        <circle className="mascot-eye" cx={86} cy={36} r={4.5} fill="#12121a" />
      </g>
    </svg>
  );
}

export default function LangMascot({ lang, onClick, awake, label }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative grid place-items-center rounded-full outline-none"
    >
      <span
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full bg-brand/10 blur-2xl transition-opacity duration-500"
        style={{ opacity: awake ? 1 : 0.45 }}
      />
      <span
        className={`mascot block size-[132px] cursor-pointer sm:size-[164px] ${
          awake ? "mascot-awake" : ""
        }`}
      >
        {lang === "python" ? <PythonMark /> : <JsMark />}
      </span>
      <span className="mt-3 font-display text-[14px] opacity-55 transition-opacity group-hover:opacity-100">
        {label}
      </span>
    </button>
  );
}
