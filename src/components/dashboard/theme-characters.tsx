"use client";

/**
 * Per-theme set dressing. Purely decorative, non-interactive and hidden
 * from assistive tech.
 *
 * The cat and mouse are original stylised characters, not the trademarked
 * ones — same gag, our own drawing.
 */

function Mouse() {
  return (
    <svg viewBox="0 0 64 44" className="h-[38px] w-auto sm:h-[46px]" aria-hidden>
      <g className="char-bob">
        <path
          className="char-tail"
          d="M13 28C3 28 3 15 11 17"
          stroke="#8a7263"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="28" cy="27" rx="17" ry="11" fill="#a8927f" />
        <circle cx="46" cy="25" r="10" fill="#bda694" />
        <circle cx="42" cy="15" r="6.5" fill="#e0b9b4" />
        <circle cx="50" cy="23" r="1.9" fill="#2b2118" />
        <circle cx="56.5" cy="27" r="2.2" fill="#e08a8a" />
        <g className="char-legs">
          <rect x="21" y="35" width="4.5" height="7" rx="2.2" fill="#8a7263" />
          <rect
            x="34"
            y="35"
            width="4.5"
            height="7"
            rx="2.2"
            fill="#8a7263"
            className="char-leg-b"
          />
        </g>
      </g>
    </svg>
  );
}

function Cat() {
  return (
    <svg viewBox="0 0 112 74" className="h-[58px] w-auto sm:h-[70px]" aria-hidden>
      <g className="char-bob">
        <path
          className="char-tail"
          d="M15 42C1 36 5 16 17 21"
          stroke="#7f93a8"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <ellipse cx="48" cy="44" rx="31" ry="18" fill="#93a7bd" />
        <path d="M70 21l2-15 13 11z" fill="#a3b6ca" />
        <path d="M93 17l8-12 3 16z" fill="#a3b6ca" />
        <circle cx="83" cy="33" r="17" fill="#a3b6ca" />
        <ellipse cx="91" cy="39" rx="9.5" ry="7.5" fill="#eaf1f7" />
        <circle cx="86" cy="28" r="2.4" fill="#22303d" />
        <circle cx="96" cy="35" r="2.4" fill="#22303d" />
        <path
          d="M98 41h11M98 44.5h10"
          stroke="#22303d"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.65"
        />
        <g className="char-legs">
          <rect x="66" y="54" width="9.5" height="15" rx="4.7" fill="#7f93a8" />
          <rect
            x="40"
            y="54"
            width="9.5"
            height="15"
            rx="4.7"
            fill="#7f93a8"
            className="char-leg-b"
          />
        </g>
      </g>
    </svg>
  );
}

function CatAndMouseChase() {
  return (
    <div className="chase-track" aria-hidden>
      <div className="chase-pair">
        <Cat />
        <Mouse />
      </div>
    </div>
  );
}

/** A handful of drifting specks, seeded so they don't all line up. */
function Drift({ kind }: { kind: "petal" | "ember" }) {
  const bits = [6, 18, 31, 44, 57, 70, 83, 92];
  return (
    <div className="drift-layer" aria-hidden>
      {bits.map((left, i) => (
        <span
          key={left}
          className={kind === "petal" ? "drift-petal" : "drift-ember"}
          style={{
            left: `${left}%`,
            animationDuration: `${9 + (i % 4) * 2.5}s`,
            animationDelay: `${-i * 1.7}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function ThemeCharacters({ themeId }: { themeId: string }) {
  if (themeId === "cat-mouse") return <CatAndMouseChase />;
  if (themeId === "sakura") return <Drift kind="petal" />;
  if (themeId === "wizarding") return <Drift kind="ember" />;
  return null;
}
