"use client";

import { useState } from "react";

/*
 * TODO: confirm the module split and session counts with the organisers.
 * The totals below add up to the 30 live sessions quoted elsewhere on the
 * page, and the arc (fundamentals -> LLMs -> agentic AI) matches the copy in
 * "How does it work?", but the topic lists are a reasonable reading of that
 * rather than a syllabus anyone has signed off.
 */
export type Module = {
  file: string;
  title: string;
  sessions: number;
  blurb: string;
  topics: string[];
};

export const MODULES: Module[] = [
  {
    file: "01_foundations.py",
    title: "AI Foundations",
    sessions: 5,
    blurb:
      "Start from zero. What AI actually is, how models learn, and where it already shapes your day.",
    topics: [
      "How machines learn from data",
      "Models, training and inference",
      "Your first prompts",
      "Bias, safety and ethics",
      "AI in the real world",
    ],
  },
  {
    file: "02_python.py",
    title: "Python for AI",
    sessions: 5,
    blurb:
      "Just enough code to be dangerous — the Python you need to build, not a full CS degree.",
    topics: [
      "Variables, logic and loops",
      "Lists, dicts and data shapes",
      "Functions and reusable code",
      "Reading and cleaning data",
      "Working in notebooks",
    ],
  },
  {
    file: "03_llms.py",
    title: "Large Language Models",
    sessions: 6,
    blurb:
      "Open the hood on the models behind ChatGPT and friends, then learn to steer them.",
    topics: [
      "Tokens, embeddings and context",
      "Prompt engineering that works",
      "Retrieval and grounding (RAG)",
      "Evaluating what a model returns",
      "Hallucination and its limits",
      "Building your first LLM app",
    ],
  },
  {
    file: "04_agents.py",
    title: "Agentic AI",
    sessions: 6,
    blurb:
      "Move from answering questions to getting things done — models that plan, use tools and act.",
    topics: [
      "Tools and function calling",
      "Planning and reasoning loops",
      "Giving an agent memory",
      "Multi-agent systems",
      "Guardrails and failure modes",
      "Ship a working agent",
    ],
  },
  {
    file: "05_vibecoding.py",
    title: "Vibe Coding",
    sessions: 5,
    blurb:
      "Build real products with AI as your pair programmer. This is what the screening round tests.",
    topics: [
      "Prototyping with AI tools",
      "Designing a usable interface",
      "Debugging alongside a model",
      "Shipping and deploying",
      "Demoing what you built",
    ],
  },
  {
    file: "06_finale.py",
    title: "Finale Prep",
    sessions: 3,
    blurb:
      "The last stretch before Bengaluru: sharpen the idea, the build plan and the pitch.",
    topics: [
      "Framing a problem worth solving",
      "Planning a 36-hour build",
      "Pitching to a room of VCs",
    ],
  },
];

const TOTAL = MODULES.reduce((n, m) => n + m.sessions, 0);

/** macOS traffic lights — shared language with the mentors window. */
function WindowDots() {
  return (
    <span className="flex shrink-0 items-center gap-2" aria-hidden>
      <span className="size-[13px] rounded-full bg-[#ff5f57]" />
      <span className="size-[13px] rounded-full bg-[#febc2e]" />
      <span className="size-[13px] rounded-full bg-[#28c840]" />
    </span>
  );
}

/** A tiny file glyph, filled when the file is the open one. */
function FileIcon({ open }: { open: boolean }) {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
      <path
        d="M8.2 1H3a1.6 1.6 0 0 0-1.6 1.6v10.8A1.6 1.6 0 0 0 3 15h8a1.6 1.6 0 0 0 1.6-1.6V5.4L8.2 1Z"
        fill={open ? "currentColor" : "none"}
        fillOpacity={open ? 0.22 : 0}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M8.2 1v4.4h4.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The curriculum as an editor: a file tree of modules on the left, the open
 * module on the right. Deliberately a different shape from the mentors
 * window, which is a gallery of people rather than a list of material.
 */
export default function CurriculumIde({
  modules = MODULES,
}: {
  modules?: Module[];
}) {
  const [active, setActive] = useState(0);
  const mod = modules[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-[12px] border-black bg-[#f5f0de] lg:w-[983px]"
      style={{ borderStyle: "solid", borderWidth: "2px 8px 8px 2px" }}
    >
      {/* window chrome */}
      <div className="relative flex h-[56px] items-center bg-white px-5 lg:h-[70px]">
        <WindowDots />
        <p className="pointer-events-none absolute inset-x-0 text-center font-code text-[14px] font-bold text-brand lg:text-[17px]">
          curriculum
        </p>
        <span className="ml-auto hidden font-code text-[12px] text-muted sm:block">
          {TOTAL} sessions
        </span>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* file tree — a scrolling chip row once there is no room for a column */}
        <div className="shrink-0 bg-[#111111] lg:w-[278px]">
          <p className="hidden px-4 pt-4 pb-2 font-code text-[10px] tracking-[0.12em] text-white/45 uppercase lg:block">
            Explorer
          </p>
          <ul
            role="tablist"
            aria-label="Curriculum modules"
            className="no-scrollbar flex gap-1 overflow-x-auto p-2 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-2 lg:pt-0 lg:pb-4"
          >
            {modules.map((m, i) => {
              const open = i === active;
              return (
                <li key={m.file} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    role="tab"
                    id={`curriculum-tab-${i}`}
                    aria-selected={open}
                    aria-controls="curriculum-panel"
                    onClick={() => setActive(i)}
                    className={`flex w-full items-center gap-2 rounded-[6px] px-2.5 py-2 text-left font-code text-[12px] whitespace-nowrap transition-colors lg:text-[13px] ${
                      open
                        ? "bg-brand text-white"
                        : "text-white/60 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <FileIcon open={open} />
                    {m.file}
                    <span
                      className={`ml-auto hidden pl-3 text-[11px] lg:block ${
                        open ? "text-white/75" : "text-white/35"
                      }`}
                    >
                      {m.sessions}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* open file */}
        <div
          role="tabpanel"
          id="curriculum-panel"
          aria-labelledby={`curriculum-tab-${active}`}
          className="min-w-0 flex-1 bg-white"
        >
          {/* editor tab strip */}
          <div className="flex items-end border-b-2 border-solid border-black/10 bg-[#faf7ec] px-4 pt-3">
            <span className="rounded-t-[6px] border-x border-t border-solid border-black/10 bg-white px-3 py-2 font-code text-[12px] text-ink">
              {mod.file}
            </span>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <p className="font-code text-[12px] text-muted">
              # module {String(active + 1).padStart(2, "0")} &middot;{" "}
              {mod.sessions} live sessions
            </p>
            <h3 className="mt-2 font-ui text-[28px] leading-[normal] font-bold text-ink sm:text-[36px]">
              {mod.title}
            </h3>
            <p className="mt-2 max-w-[520px] font-display text-[16px] leading-[26px] tracking-[-0.2px] text-muted sm:text-[18px]">
              {mod.blurb}
            </p>

            {/* topics, numbered like editor gutter lines */}
            <ol className="mt-6 flex flex-col">
              {mod.topics.map((t, i) => (
                <li
                  key={t}
                  className="flex items-baseline gap-4 border-t border-solid border-black/8 py-[9px] first:border-t-0"
                >
                  <span className="w-[18px] shrink-0 text-right font-code text-[12px] text-black/25 tabular-nums">
                    {i + 1}
                  </span>
                  <span className="font-display text-[15px] leading-[22px] text-ink sm:text-[17px]">
                    {t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
