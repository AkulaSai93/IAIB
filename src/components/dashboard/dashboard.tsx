"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import CodeEditor from "@/components/dashboard/code-editor";
import LangMascot from "@/components/dashboard/lang-mascot";
import ProfilePanel from "@/components/dashboard/profile-panel";
import ThemeBot from "@/components/dashboard/theme-bot";
import ThemeCharacters from "@/components/dashboard/theme-characters";
import { problemForToday } from "@/lib/problems";
import {
  lastSevenDays,
  loadStudent,
  saveStudent,
  streakOf,
  today,
  type Student,
} from "@/lib/student-store";
import { cssVars, themeById, type Theme } from "@/lib/themes";
import brandLogo from "../../../public/images/logo-upgrad-iaib.png";

/** Panels share the themed surface + hard border. */
const CARD =
  "rounded-[18px] border-[var(--dash-border)] bg-[var(--dash-surface)]";
const CARD_BORDER = { borderStyle: "solid", borderWidth: "2px 6px 6px 2px" };

export default function Dashboard() {
  const [student, setStudent] = useState<Student | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => setStudent(loadStudent()), []);

  const problem = useMemo(() => {
    const override =
      typeof window === "undefined"
        ? null
        : new URLSearchParams(window.location.search).get("p");
    return problemForToday(today(), override);
  }, []);

  if (!student) return <div className="min-h-screen bg-canvas" aria-busy />;

  const theme = themeById(student.themeId);
  const solvedToday = student.solved.includes(today());
  const streak = streakOf(student.solved);
  const week = lastSevenDays(student.solved);
  const firstName = student.name.trim().split(" ")[0] || "Builder";

  const update = (patch: Partial<Student>) => {
    const next = { ...student, ...patch };
    setStudent(next);
    saveStudent(next);
  };

  const claim = () => {
    if (solvedToday) return;
    update({
      solved: [...student.solved, today()],
      credits: student.credits + problem.credits,
    });
  };

  const avatar = student.avatarImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={student.avatarImage} alt="" className="size-full object-cover" />
  ) : (
    <span className="text-[18px]">{student.avatar}</span>
  );

  return (
    <main
      style={cssVars(theme)}
      className="min-h-screen bg-[var(--dash-bg)] pb-28 text-[var(--dash-ink)] transition-colors duration-500"
    >
      <header className="border-b border-current/10 bg-[var(--dash-surface)] transition-colors duration-500">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-5 py-4 lg:px-8">
          <Link href="/" aria-label="IAIB home">
            <Image
              src={brandLogo}
              alt="upGrad School of Technology x IAIB"
              width={167}
              height={32}
              className="h-[26px] w-auto object-contain"
            />
          </Link>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-current/[0.07] px-3.5 py-1.5 font-display text-[13px]">
              <span className="font-medium">{student.credits}</span> credits
            </span>
            <button
              type="button"
              onClick={() => setProfileOpen(true)}
              aria-label="Open your profile"
              className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-current/[0.07] transition-transform hover:scale-105"
            >
              {avatar}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1100px] px-5 pt-10 lg:px-8">
        <h1 className="font-ui text-[34px] font-bold tracking-[-1px] sm:text-[44px]">
          Hey {firstName}.
        </h1>
        <p className="mt-1.5 font-display text-[17px] opacity-60">
          {solvedToday
            ? "Today's problem is done. Come back tomorrow to keep the streak."
            : "One problem a day. Solve it, keep your streak, bank the credits."}
        </p>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className={`${CARD} p-6 sm:p-8`} style={CARD_BORDER}>
            <p className="font-display text-[12px] tracking-[0.07em] uppercase opacity-45">
              Today&rsquo;s problem
            </p>

            <div className="mt-5 flex flex-col items-center">
              <LangMascot
                lang={problem.lang}
                awake={revealed}
                onClick={() => setRevealed(true)}
                label={revealed ? problem.lang : "Tap to reveal"}
              />
            </div>

            {revealed ? (
              <div className="step-in mt-7 border-t border-current/10 pt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-current/[0.08] px-2.5 py-1 font-display text-[12px] opacity-75">
                    {problem.difficulty}
                  </span>
                  <span className="rounded-full bg-[var(--dash-accent)] px-2.5 py-1 font-display text-[12px] text-[var(--dash-on-accent)]">
                    +{problem.credits} credits
                  </span>
                  {solvedToday && (
                    <span className="rounded-full bg-current/[0.08] px-2.5 py-1 font-display text-[12px]">
                      Solved
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-ui text-[24px] font-bold">{problem.title}</h2>
                <p className="mt-2 font-display text-[15px] leading-[1.55] opacity-75">
                  {problem.prompt}
                </p>
                <button
                  type="button"
                  onClick={() => setEditorOpen(true)}
                  className="mt-5 rounded-[8px] bg-[var(--dash-accent)] px-6 py-3 font-ui text-[16px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85"
                >
                  {solvedToday ? "Open editor" : "Solve it"}
                </button>
              </div>
            ) : (
              <p className="mt-6 text-center font-display text-[14px] opacity-45">
                Today&rsquo;s challenge is hiding in there.
              </p>
            )}
          </section>

          <section className={`${CARD} h-fit p-6`} style={CARD_BORDER}>
            <div className="flex items-baseline justify-between">
              <p className="font-display text-[12px] tracking-[0.07em] uppercase opacity-45">
                Streak
              </p>
              <p className="font-ui text-[26px] font-bold">
                {streak}
                <span className="ml-1 font-display text-[13px] font-normal opacity-55">
                  {streak === 1 ? "day" : "days"}
                </span>
              </p>
            </div>
            <div className="mt-4 flex justify-between gap-1.5">
              {week.map((d) => (
                <div key={d.iso} className="flex flex-1 flex-col items-center gap-1.5">
                  <span
                    className={`grid h-9 w-full place-items-center rounded-[8px] text-[13px] ${
                      d.done
                        ? "bg-[var(--dash-accent)] text-[var(--dash-on-accent)]"
                        : "bg-current/[0.07] opacity-40"
                    }`}
                  >
                    {d.done ? "✓" : ""}
                  </span>
                  <span className="font-display text-[11px] opacity-45">{d.label}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {editorOpen && (
        <CodeEditor
          problem={problem}
          alreadySolved={solvedToday}
          onClose={() => setEditorOpen(false)}
          onSolved={() => {
            claim();
            setEditorOpen(false);
          }}
        />
      )}

      {profileOpen && (
        <ProfilePanel
          student={student}
          onSave={update}
          onClose={() => setProfileOpen(false)}
        />
      )}

      <ThemeCharacters themeId={student.themeId} />

      <ThemeBot
        currentId={student.themeId}
        onPick={(t: Theme) => update({ themeId: t.id })}
      />
    </main>
  );
}
