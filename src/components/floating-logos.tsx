/**
 * Decorative AI-tool marks that drift around the hero.
 *
 * ChatGPT / Gemini / Lovable are hand-built SVG renditions so the page has no
 * external brand dependencies; Claude uses the artwork supplied for it. Swap
 * in official brand files here if you need exact marks.
 */
import Image from "next/image";

import claudeLogo from "../../public/images/logo-claude.png";

function ChatGptMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#0f0f0f"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.4023-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.0379-.0568V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
    </svg>
  );
}

function ClaudeMark({ className }: { className?: string }) {
  return (
    <Image
      src={claudeLogo}
      alt=""
      aria-hidden
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

function GeminiMark({ className }: { className?: string }) {
  const wash = (id: string, cx: string, cy: string, r: string, color: string) => (
    <radialGradient key={id} id={id} cx={cx} cy={cy} r={r}>
      <stop offset="0%" stopColor={color} />
      <stop offset="100%" stopColor={color} stopOpacity="0" />
    </radialGradient>
  );
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden>
      <defs>
        <clipPath id="gemini-clip">
          <path d="M256 18 C256 160 352 256 494 256 C352 256 256 352 256 494 C256 352 160 256 18 256 C160 256 256 160 256 18 Z" />
        </clipPath>
        {wash("gemini-green", "50%", "92%", "48%", "#34a853")}
        {wash("gemini-yellow", "6%", "50%", "42%", "#f9ab00")}
        {wash("gemini-red", "50%", "8%", "44%", "#ea4335")}
      </defs>
      <g clipPath="url(#gemini-clip)">
        <rect width="512" height="512" fill="#4285f4" />
        <rect width="512" height="512" fill="url(#gemini-green)" />
        <rect width="512" height="512" fill="url(#gemini-yellow)" />
        <rect width="512" height="512" fill="url(#gemini-red)" />
      </g>
    </svg>
  );
}

function LovableMark({ className }: { className?: string }) {
  // Heart with the bottom-left quadrant squared off into an "L".
  return (
    <svg viewBox="0 0 600 600" className={className} aria-hidden>
      <defs>
        <linearGradient id="lovable-grad" x1="0.5" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#ff9500" />
          <stop offset="26%" stopColor="#ff6a00" />
          <stop offset="45%" stopColor="#fa4b53" />
          <stop offset="61%" stopColor="#f5307e" />
          <stop offset="72%" stopColor="#e340b8" />
          <stop offset="88%" stopColor="#9070f0" />
          <stop offset="100%" stopColor="#6d8cff" />
        </linearGradient>
      </defs>
      <path
        fill="url(#lovable-grad)"
        d="M130 468 V190 A113 113 0 0 1 356 190 V244 H387 A112 112 0 0 1 387 468 H130 Z"
      />
    </svg>
  );
}

type Floater = {
  name: string;
  Mark: (p: { className?: string }) => React.JSX.Element;
  /** Placement inside the hero, as percentages so it scales with the frame. */
  pos: React.CSSProperties;
  size: number;
  duration: number;
  delay: number;
  tilt: number;
};

const FLOATERS: Floater[] = [
  {
    name: "ChatGPT",
    Mark: ChatGptMark,
    pos: { left: "7%", top: "22%" },
    size: 60,
    duration: 7,
    delay: 0,
    tilt: -6,
  },
  {
    name: "Claude",
    Mark: ClaudeMark,
    pos: { left: "12%", top: "62%" },
    size: 68,
    duration: 9,
    delay: -2.5,
    tilt: 7,
  },
  {
    name: "Gemini",
    Mark: GeminiMark,
    pos: { right: "8%", top: "18%" },
    size: 58,
    duration: 8,
    delay: -1.2,
    tilt: 8,
  },
  {
    name: "Lovable",
    Mark: LovableMark,
    pos: { right: "12%", top: "58%" },
    size: 64,
    duration: 10,
    delay: -3.8,
    tilt: -7,
  },
];

export default function FloatingLogos() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {FLOATERS.map(({ name, Mark, pos, size, duration, delay, tilt }) => (
        <div
          key={name}
          className="float-soft absolute grid origin-center scale-[0.6] place-items-center rounded-[22px] border border-black/5 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.25)] md:scale-100"
          style={
            {
              ...pos,
              width: size + 28,
              height: size + 28,
              "--tilt": `${tilt}deg`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
            } as React.CSSProperties
          }
        >
          <div style={{ width: size, height: size }}>
            <Mark className="h-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
