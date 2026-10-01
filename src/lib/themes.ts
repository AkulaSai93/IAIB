export type Theme = {
  id: string;
  name: string;
  blurb: string;
  /** Words the bot matches against, lowercase. */
  keywords: string[];
  vars: {
    bg: string;
    surface: string;
    ink: string;
    muted: string;
    accent: string;
    onAccent: string;
    border: string;
    shadow: string;
  };
};

export const THEMES: Theme[] = [
  {
    id: "default",
    name: "IAIB",
    blurb: "The house look.",
    keywords: ["default", "iaib", "reset", "normal", "original", "red"],
    vars: {
      bg: "#fcfcfa",
      surface: "#ffffff",
      ink: "#131313",
      muted: "rgba(19,19,19,0.55)",
      accent: "#e7000b",
      onAccent: "#ffffff",
      border: "#000000",
      shadow: "rgba(0,0,0,0.08)",
    },
  },
  {
    id: "wizarding",
    name: "Wizarding",
    blurb: "Candlelit common room.",
    keywords: ["harry", "potter", "hogwarts", "wizard", "magic", "gryffindor", "wand"],
    vars: {
      bg: "#17100e",
      surface: "#241a16",
      ink: "#f4ead4",
      muted: "rgba(244,234,212,0.6)",
      accent: "#c9a227",
      onAccent: "#1a1209",
      border: "#0b0705",
      shadow: "rgba(0,0,0,0.5)",
    },
  },
  {
    id: "cat-mouse",
    name: "Cat & Mouse",
    blurb: "Saturday-morning cartoon.",
    keywords: ["tom", "jerry", "cartoon", "cat", "mouse", "looney", "toon"],
    vars: {
      bg: "#fff6e2",
      surface: "#ffffff",
      ink: "#2a1f16",
      muted: "rgba(42,31,22,0.6)",
      accent: "#2f7fd1",
      onAccent: "#ffffff",
      border: "#2a1f16",
      shadow: "rgba(42,31,22,0.14)",
    },
  },
  {
    id: "midnight",
    name: "Midnight",
    blurb: "Late-night editor glow.",
    keywords: ["dark", "midnight", "night", "black", "hacker", "terminal"],
    vars: {
      bg: "#0d0e12",
      surface: "#171921",
      ink: "#e9ebf3",
      muted: "rgba(233,235,243,0.55)",
      accent: "#6ea8fe",
      onAccent: "#0d0e12",
      border: "#05060a",
      shadow: "rgba(0,0,0,0.6)",
    },
  },
  {
    id: "sakura",
    name: "Sakura",
    blurb: "Soft spring afternoon.",
    keywords: ["pink", "sakura", "anime", "cherry", "blossom", "pastel", "cute"],
    vars: {
      bg: "#fff1f5",
      surface: "#ffffff",
      ink: "#3a2430",
      muted: "rgba(58,36,48,0.58)",
      accent: "#e5548a",
      onAccent: "#ffffff",
      border: "#3a2430",
      shadow: "rgba(58,36,48,0.14)",
    },
  },
];

export const themeById = (id: string) =>
  THEMES.find((t) => t.id === id) ?? THEMES[0];

/**
 * Keyword match, not a language model — it looks for a theme's keywords in
 * what the student typed and returns the best overlap.
 */
export function matchTheme(text: string): Theme | null {
  const words = text.toLowerCase().split(/[^a-z]+/).filter(Boolean);
  let best: { theme: Theme; score: number } | null = null;
  for (const theme of THEMES) {
    const score = theme.keywords.filter((k) => words.includes(k)).length;
    if (score > 0 && (!best || score > best.score)) best = { theme, score };
  }
  return best?.theme ?? null;
}

export const cssVars = (t: Theme): React.CSSProperties =>
  ({
    "--dash-bg": t.vars.bg,
    "--dash-surface": t.vars.surface,
    "--dash-ink": t.vars.ink,
    "--dash-muted": t.vars.muted,
    "--dash-accent": t.vars.accent,
    "--dash-on-accent": t.vars.onAccent,
    "--dash-border": t.vars.border,
    "--dash-shadow": t.vars.shadow,
  }) as React.CSSProperties;
