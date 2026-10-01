"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Problem } from "@/lib/problems";
import {
  loadPython,
  pythonReady,
  runSolution,
  type RunOutcome,
} from "@/lib/run-solution";

export default function CodeEditor({
  problem,
  onClose,
  onSolved,
  alreadySolved,
}: {
  problem: Problem;
  onClose: () => void;
  onSolved: () => void;
  alreadySolved: boolean;
}) {
  const [code, setCode] = useState(problem.starter);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadingPy, setLoadingPy] = useState(false);
  const [pyOk, setPyOk] = useState(pythonReady());
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const allPassed =
    outcome?.kind === "ok" && outcome.results.every((r) => r.passed);

  const run = useCallback(async () => {
    setBusy(true);
    setOutcome(await runSolution(problem, code));
    setBusy(false);
  }, [problem, code]);

  const getPython = useCallback(async () => {
    setLoadingPy(true);
    try {
      await loadPython();
      setPyOk(true);
      setOutcome(null);
    } catch {
      setOutcome({
        kind: "error",
        message:
          "Couldn't load the Python runtime. Check the connection, or run this on your own backend.",
      });
    }
    setLoadingPy(false);
  }, []);

  // Tab should indent, not leave the editor
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Tab") return;
    e.preventDefault();
    const el = e.currentTarget;
    const { selectionStart: s, selectionEnd: t } = el;
    const next = `${code.slice(0, s)}    ${code.slice(t)}`;
    setCode(next);
    requestAnimationFrame(() => el.setSelectionRange(s + 4, s + 4));
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-end justify-center bg-black/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`Solve: ${problem.title}`}
        className="flex max-h-[94vh] w-full max-w-[880px] flex-col overflow-hidden rounded-t-[18px] border-[var(--dash-border)] bg-[var(--dash-surface)] text-[var(--dash-ink)] sm:rounded-[18px]"
        style={{ borderStyle: "solid", borderWidth: "2px 6px 6px 2px" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-current/10 px-5 py-4 sm:px-7">
          <div>
            <p className="font-display text-[12px] tracking-[0.06em] uppercase opacity-45">
              {problem.lang} &middot; {problem.difficulty} &middot; +{problem.credits} credits
            </p>
            <h3 className="mt-1 font-ui text-[22px] font-bold">
              {problem.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close editor"
            className="grid size-8 shrink-0 place-items-center rounded-full opacity-60 transition-opacity hover:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="grid flex-1 overflow-y-auto lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)]">
          <div className="border-b border-current/10 px-5 py-5 sm:px-7 lg:border-r lg:border-b-0">
            <p className="font-display text-[15px] leading-[1.55] opacity-80">
              {problem.prompt}
            </p>
            <p className="mt-4 font-display text-[13px] opacity-55">
              Define <code className="font-code">{problem.fn}</code> and it&rsquo;ll
              be checked against {problem.tests.length} cases.
            </p>

            {outcome?.kind === "ok" && (
              <ul className="mt-5 flex flex-col gap-1.5">
                {outcome.results.map((r) => (
                  <li
                    key={r.name}
                    className="flex items-start gap-2 font-display text-[13px]"
                  >
                    <span className={r.passed ? "text-[#2ea44f]" : "text-[var(--dash-accent)]"}>
                      {r.passed ? "✓" : "✕"}
                    </span>
                    <span className="opacity-80">
                      {r.name}
                      {!r.passed && (
                        <span className="opacity-55">
                          {" "}
                          — expected {r.expected}, got {r.got}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {outcome?.kind === "error" && (
              <p className="mt-5 rounded-[8px] bg-current/[0.06] px-3 py-2 font-code text-[13px] text-[var(--dash-accent)]">
                {outcome.message}
              </p>
            )}

            {outcome?.kind === "runtime-missing" && (
              <div className="mt-5 rounded-[10px] bg-current/[0.06] px-4 py-3">
                <p className="font-display text-[13px] opacity-75">{outcome.message}</p>
                <button
                  type="button"
                  onClick={() => void getPython()}
                  disabled={loadingPy}
                  className="mt-2.5 rounded-[7px] bg-[var(--dash-accent)] px-3.5 py-2 font-display text-[13px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85 disabled:opacity-60"
                >
                  {loadingPy ? "Loading Python…" : "Load Python runtime (~10 MB)"}
                </button>
              </div>
            )}

            {allPassed && (
              <div className="mt-5 rounded-[10px] bg-[#2ea44f]/15 px-4 py-3">
                <p className="font-ui text-[15px] font-bold">
                  All tests passed.
                </p>
                <button
                  type="button"
                  onClick={onSolved}
                  disabled={alreadySolved}
                  className="mt-2 rounded-[8px] bg-[var(--dash-accent)] px-4 py-2 font-display text-[14px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85 disabled:opacity-60"
                >
                  {alreadySolved
                    ? "Already claimed today"
                    : `Claim +${problem.credits} credits`}
                </button>
              </div>
            )}
          </div>

          <div className="flex min-h-[300px] flex-col bg-[#0e0e11]">
            <textarea
              ref={taRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={onKeyDown}
              spellCheck={false}
              aria-label="Your solution"
              className="flex-1 resize-none bg-transparent p-5 font-code text-[13.5px] leading-[1.6] text-[#e6e6e6] outline-none sm:p-6"
            />
            <div className="flex items-center gap-3 border-t border-white/10 px-5 py-3 sm:px-6">
              <button
                type="button"
                onClick={() => void run()}
                disabled={busy || (problem.lang === "python" && !pyOk)}
                className="rounded-[8px] bg-[var(--dash-accent)] px-5 py-2.5 font-display text-[14px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85 disabled:opacity-50"
              >
                {busy ? "Running…" : "Run tests"}
              </button>
              {problem.lang === "python" && !pyOk && (
                <button
                  type="button"
                  onClick={() => void getPython()}
                  disabled={loadingPy}
                  className="font-display text-[13px] text-white/60 underline underline-offset-2 hover:text-white disabled:opacity-60"
                >
                  {loadingPy ? "Loading Python…" : "Load Python runtime"}
                </button>
              )}
              <button
                type="button"
                onClick={() => setCode(problem.starter)}
                className="ml-auto font-display text-[13px] text-white/45 hover:text-white/80"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
