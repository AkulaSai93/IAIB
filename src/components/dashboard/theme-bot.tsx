"use client";

import { useEffect, useRef, useState } from "react";

import { matchTheme, THEMES, type Theme } from "@/lib/themes";

type Line = { from: "bot" | "you"; text: string };

/**
 * Sidekick that re-skins the dashboard on request.
 *
 * It matches keywords against the theme list — there's no model behind it,
 * so it answers honestly when it doesn't recognise something.
 */
export default function ThemeBot({
  currentId,
  onPick,
}: {
  currentId: string;
  onPick: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [lines, setLines] = useState<Line[]>([
    {
      from: "bot",
      text: "Want a different look? Tell me a vibe — Harry Potter, Tom & Jerry, dark mode — or tap one below.",
    },
  ]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [lines, open]);

  const apply = (t: Theme, said?: string) => {
    onPick(t);
    setLines((l) => [
      ...l,
      ...(said ? [{ from: "you" as const, text: said }] : []),
      { from: "bot", text: `Done — that's the ${t.name} look. ${t.blurb}` },
    ]);
  };

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setDraft("");
    const hit = matchTheme(text);
    if (hit) return apply(hit, text);
    setLines((l) => [
      ...l,
      { from: "you", text },
      {
        from: "bot",
        text: "I don't have that one yet — I only know the themes below. Pick one of those?",
      },
    ]);
  };

  return (
    <>
      {open && (
        <div className="fixed right-4 bottom-24 z-[115] w-[calc(100vw-2rem)] max-w-[340px] overflow-hidden rounded-[16px] border-2 border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-ink)] shadow-2xl sm:right-6">
          <div className="flex items-center justify-between border-b border-current/10 px-4 py-3">
            <p className="font-ui text-[15px] font-bold">Sidekick</p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close sidekick"
              className="grid size-7 place-items-center rounded-full opacity-55 hover:opacity-100"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div ref={logRef} className="max-h-[220px] overflow-y-auto px-4 py-3">
            {lines.map((l, i) => (
              <p
                key={i}
                className={`mb-2 max-w-[85%] rounded-[12px] px-3 py-2 font-display text-[13.5px] leading-[1.45] ${
                  l.from === "bot"
                    ? "bg-current/[0.07]"
                    : "ml-auto bg-[var(--dash-accent)] text-[var(--dash-on-accent)]"
                }`}
              >
                {l.text}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t border-current/10 px-4 py-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => apply(t)}
                aria-pressed={currentId === t.id}
                className={`rounded-full px-3 py-1.5 font-display text-[12.5px] transition-colors ${
                  currentId === t.id
                    ? "bg-[var(--dash-accent)] text-[var(--dash-on-accent)]"
                    : "bg-current/[0.07] hover:bg-current/[0.14]"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-current/10 px-3 py-2.5">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Try “make it Hogwarts”"
              aria-label="Ask for a theme"
              className="min-w-0 flex-1 bg-transparent px-2 py-1.5 font-display text-[14px] outline-none placeholder:opacity-40"
            />
            <button
              type="button"
              onClick={send}
              aria-label="Send"
              className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--dash-accent)] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85"
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M2 8h10M8 3.5L12.5 8 8 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Hide sidekick" : "Open sidekick to change the theme"}
        aria-expanded={open}
        className="fixed right-4 bottom-5 z-[115] flex items-center gap-2.5 rounded-full border-2 border-[var(--dash-border)] bg-[var(--dash-surface)] py-2 pr-4 pl-2 text-[var(--dash-ink)] shadow-xl transition-transform hover:scale-[1.03] sm:right-6"
      >
        <span className="bot-bob grid size-9 place-items-center rounded-full bg-[var(--dash-accent)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
            <rect x="4" y="7.5" width="16" height="12" rx="4" fill="var(--dash-on-accent)" />
            <circle className="bot-eye" cx="9.5" cy="13.5" r="1.7" fill="var(--dash-accent)" />
            <circle className="bot-eye" cx="14.5" cy="13.5" r="1.7" fill="var(--dash-accent)" />
            <path d="M12 7.5V4M12 4h-.01" stroke="var(--dash-on-accent)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="3.4" r="1.6" fill="var(--dash-on-accent)" />
          </svg>
        </span>
        <span className="font-display text-[14px] font-medium">Sidekick</span>
      </button>
    </>
  );
}
