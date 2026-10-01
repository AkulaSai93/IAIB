"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import MemberCard from "@/components/member-card";
import { loadStudent, saveStudent } from "@/lib/student-store";

/* ------------------------------------------------------------------ *
 * Steps
 * ------------------------------------------------------------------ */

type Path = "individual" | "school";

type Step =
  | {
      id: string;
      kind: "text" | "email" | "tel" | "number";
      question: string;
      hint?: string;
      placeholder: string;
      validate: (v: string) => string | null;
    }
  | { id: string; kind: "choice"; question: string; hint?: string; options: string[] }
  | { id: "otp"; kind: "otp"; question: string; hint?: string };

const required = (label: string) => (v: string) =>
  v.trim().length < 2 ? `Please enter ${label}.` : null;

const isEmail = (v: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "That email doesn't look right.";

const isPhone = (v: string) =>
  /^[6-9]\d{9}$/.test(v.replace(/\D/g, "")) ? null : "Enter a 10-digit mobile number.";

const isCount = (v: string) =>
  Number(v) >= 1 && Number(v) <= 5000 ? null : "Enter a number between 1 and 5000.";

const OTP_STEP: Step = {
  id: "otp",
  kind: "otp",
  question: "Verify your number",
  hint: "We've sent a 6-digit code to your phone.",
};

const INDIVIDUAL: Step[] = [
  {
    id: "name",
    kind: "text",
    question: "First up — what's your name?",
    placeholder: "Your full name",
    validate: required("your name"),
  },
  {
    id: "email",
    kind: "email",
    question: "Where can we reach you?",
    hint: "We'll send your confirmation here.",
    placeholder: "you@school.edu",
    validate: isEmail,
  },
  {
    id: "phone",
    kind: "tel",
    question: "And your mobile number?",
    hint: "Used only for updates about the buildathon.",
    placeholder: "98765 43210",
    validate: isPhone,
  },
  OTP_STEP,
  {
    id: "grade",
    kind: "choice",
    question: "Which class are you in?",
    options: ["Class 9", "Class 10", "Class 11", "Class 12"],
  },
  {
    id: "school",
    kind: "text",
    question: "Which school do you go to?",
    placeholder: "School name",
    validate: required("your school"),
  },
  {
    id: "city",
    kind: "text",
    question: "And which city?",
    placeholder: "City",
    validate: required("your city"),
  },
];

const SCHOOL: Step[] = [
  {
    id: "school",
    kind: "text",
    question: "What's your school called?",
    placeholder: "School name",
    validate: required("the school name"),
  },
  {
    id: "name",
    kind: "text",
    question: "Who's coordinating this?",
    hint: "The teacher or staff member we should talk to.",
    placeholder: "Coordinator's full name",
    validate: required("a name"),
  },
  {
    id: "email",
    kind: "email",
    question: "Official school email?",
    placeholder: "coordinator@school.edu",
    validate: isEmail,
  },
  {
    id: "phone",
    kind: "tel",
    question: "A number we can call?",
    placeholder: "98765 43210",
    validate: isPhone,
  },
  OTP_STEP,
  {
    id: "students",
    kind: "number",
    question: "Roughly how many students?",
    hint: "You can change this later.",
    placeholder: "e.g. 60",
    validate: isCount,
  },
  {
    id: "city",
    kind: "text",
    question: "Which city is the school in?",
    placeholder: "City",
    validate: required("a city"),
  },
];

/* ------------------------------------------------------------------ *
 * Backend stubs — wire these to the real API
 * ------------------------------------------------------------------ */

/** TODO: POST to the real "send OTP" endpoint. */
async function requestOtp(phone: string) {
  await new Promise((r) => setTimeout(r, 400));
  return { sent: true, phone };
}

/**
 * TODO: verify against the real endpoint. Until that exists this only
 * checks the shape of the code — it does NOT prove the number is owned.
 */
async function verifyOtp(code: string) {
  await new Promise((r) => setTimeout(r, 500));
  return /^\d{6}$/.test(code);
}

/** TODO: POST the completed registration. */
async function submitRegistration(path: Path, answers: Record<string, string>) {
  await new Promise((r) => setTimeout(r, 600));
  return { ok: true, path, answers };
}

/* ------------------------------------------------------------------ *
 * Context
 * ------------------------------------------------------------------ */

const RegisterCtx = createContext<{ open: () => void }>({ open: () => {} });
export const useRegister = () => useContext(RegisterCtx);

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <RegisterCtx.Provider value={value}>
      {children}
      {isOpen && <RegisterModal onClose={() => setOpen(false)} />}
    </RegisterCtx.Provider>
  );
}

/* ------------------------------------------------------------------ *
 * Modal
 * ------------------------------------------------------------------ */

function RegisterModal({ onClose }: { onClose: () => void }) {
  const [path, setPath] = useState<Path>("individual");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [value, setValue] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const steps = path === "individual" ? INDIVIDUAL : SCHOOL;
  const step = steps[index];
  const total = steps.length;

  // lock the page behind the dialog
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // focus the field as each question appears
  useEffect(() => {
    if (!step) return;
    if (step.kind === "otp") otpRefs.current[0]?.focus();
    else inputRef.current?.focus();
  }, [step, index]);

  // ask for a code as soon as the OTP step opens
  useEffect(() => {
    if (step?.kind === "otp" && answers.phone) void requestOtp(answers.phone);
  }, [step, answers.phone]);

  // answers survive a path switch, so shared fields don't need retyping
  const answersRef = useRef(answers);
  answersRef.current = answers;

  const switchPath = (p: Path) => {
    setPath(p);
    setIndex(0);
    setOtp(Array(6).fill(""));
    setError(null);
  };

  const finish = async (all: Record<string, string>) => {
    setBusy(true);
    await submitRegistration(path, all);
    // carry the registration into the dashboard
    saveStudent({
      ...loadStudent(),
      name: all.name ?? "",
      email: all.email ?? "",
      phone: all.phone ?? "",
      grade: all.grade ?? "",
      school: all.school ?? "",
      city: all.city ?? "",
    });
    setBusy(false);
    setDone(true);
  };

  useEffect(() => {
    const s = (path === "individual" ? INDIVIDUAL : SCHOOL)[index];
    if (s && s.kind !== "otp") setValue(answersRef.current[s.id] ?? "");
  }, [path, index]);

  const advance = async (answer: string) => {
    const next = { ...answers };
    if (answer) next[step.id] = answer;
    else delete next[step.id];
    setAnswers(next);
    setValue("");
    setOtp(Array(6).fill(""));
    setError(null);
    if (index + 1 >= total) await finish(next);
    else setIndex(index + 1);
  };

  const onNext = async () => {
    if (!step || busy) return;

    if (step.kind === "otp") {
      const code = otp.join("");
      if (code.length < 6) return setError("Enter all 6 digits.");
      setBusy(true);
      const ok = await verifyOtp(code);
      setBusy(false);
      if (!ok) return setError("That code isn't right. Try again.");
      return advance(code);
    }

    if (step.kind === "choice") return;

    const problem = step.validate(value);
    if (problem) return setError(problem);
    await advance(value.trim());
  };

  const onBack = () => {
    setError(null);
    if (index > 0) setIndex(index - 1);
  };

  const setOtpAt = (i: number, raw: string) => {
    const digits = raw.replace(/\D/g, "");
    if (!digits) {
      const nextOtp = [...otp];
      nextOtp[i] = "";
      setOtp(nextOtp);
      return;
    }
    const nextOtp = [...otp];
    // paste of a whole code fills forward
    digits.split("").forEach((d, k) => {
      if (i + k < 6) nextOtp[i + k] = d;
    });
    setOtp(nextOtp);
    otpRefs.current[Math.min(i + digits.length, 5)]?.focus();
  };

  // Once the number is verified we have what we need; the profile
  // questions that follow are optional.
  const otpIndex = steps.findIndex((x) => x.kind === "otp");
  const canSkip = otpIndex >= 0 && index > otpIndex;

  const onSkip = async () => {
    if (busy) return;
    setError(null);
    await advance("");
  };

  const progress = ((done ? total : index) / total) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 backdrop-blur-[2px] sm:items-center sm:p-6"
      onMouseDown={(e) => {
        if (!panelRef.current?.contains(e.target as Node)) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Register for IAIB"
        className="relative flex max-h-[92vh] w-full max-w-[600px] flex-col overflow-hidden rounded-t-[20px] border-black bg-white sm:rounded-[20px]"
        style={{ borderStyle: "solid", borderWidth: "2px 6px 6px 2px" }}
      >
        {/* progress */}
        <div className="h-1.5 w-full bg-black/10">
          <div
            className="h-full bg-brand transition-[width] duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between px-6 pt-4">
          <p className="font-display text-[13px] text-ink/50">
            {done ? "All done" : `Question ${index + 1} of ${total}`}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-8 place-items-center rounded-full text-ink/60 transition-colors hover:bg-black/5 hover:text-ink"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pt-4 pb-7 sm:px-9 sm:pb-9">
          {/* ---- done ---- */}
          {done && (
            <div key="done" className="step-in">
              <MemberCard name={answers.name ?? "Builder"} onClose={onClose} />
            </div>
          )}

          {/* ---- questions ---- */}
          {!done && step && (
            <div key={`${path}-${index}`} className="step-in flex flex-col gap-5 py-2">
              <div>
                <h3 className="font-ui text-[26px] leading-[1.15] font-bold tracking-[-0.8px] text-ink sm:text-[32px]">
                  {step.question}
                </h3>
                {(step.hint || canSkip) && (
                  <p className="mt-2 font-display text-[15px] text-ink/60">
                    {step.hint}
                    {step.hint && canSkip ? " " : ""}
                    {canSkip && <span className="text-ink/45">Optional.</span>}
                  </p>
                )}
              </div>

              {step.kind === "choice" ? (
                <div className="grid grid-cols-2 gap-3">
                  {step.options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => advance(opt)}
                      className="rounded-[10px] border-2 border-black/15 px-4 py-4 text-left font-display text-[17px] font-medium text-ink transition-colors hover:border-black hover:bg-black/[0.03]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : step.kind === "otp" ? (
                <div className="flex gap-2 sm:gap-3">
                  {otp.map((d, i) => (
                    <input
                      key={i}
                      ref={(el) => {
                        otpRefs.current[i] = el;
                      }}
                      value={d}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      aria-label={`Digit ${i + 1}`}
                      onChange={(e) => setOtpAt(i, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Backspace" && !otp[i] && i > 0)
                          otpRefs.current[i - 1]?.focus();
                        if (e.key === "Enter") void onNext();
                      }}
                      className="h-14 w-full rounded-[10px] border-2 border-black/15 text-center font-ui text-[22px] font-bold text-ink outline-none focus:border-black"
                    />
                  ))}
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type={step.kind === "number" ? "number" : step.kind}
                  inputMode={
                    step.kind === "tel" || step.kind === "number" ? "numeric" : undefined
                  }
                  value={value}
                  placeholder={step.placeholder}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") void onNext();
                  }}
                  className="w-full border-b-2 border-black/20 bg-transparent pb-3 font-display text-[22px] text-ink outline-none placeholder:text-ink/25 focus:border-brand sm:text-[26px]"
                />
              )}

              {error && (
                <p role="alert" className="font-display text-[14px] text-brand">
                  {error}
                </p>
              )}

              <div className="mt-2 flex items-center gap-3">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={onBack}
                    className="rounded-[8px] px-4 py-2.5 font-display text-[15px] text-ink/60 transition-colors hover:bg-black/5 hover:text-ink"
                  >
                    Back
                  </button>
                )}
                {step.kind !== "choice" && (
                  <button
                    type="button"
                    onClick={() => void onNext()}
                    disabled={busy}
                    className="rounded-[8px] bg-brand px-7 py-3 font-ui text-[16px] text-white transition-colors hover:bg-black disabled:opacity-60"
                  >
                    {busy
                      ? "Just a sec…"
                      : index + 1 === total
                        ? "Finish"
                        : step.kind === "otp"
                          ? "Verify"
                          : "Next"}
                  </button>
                )}
                {canSkip && (
                  <button
                    type="button"
                    onClick={() => void onSkip()}
                    disabled={busy}
                    className="rounded-[8px] px-4 py-2.5 font-display text-[15px] text-ink/55 underline underline-offset-2 transition-colors hover:text-ink disabled:opacity-60"
                  >
                    {index + 1 === total ? "Skip & finish" : "Skip"}
                  </button>
                )}
                {step.kind !== "choice" && !canSkip && (
                  <span className="hidden font-display text-[13px] text-ink/40 sm:inline">
                    or press Enter
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {!done && (
          <div className="border-t border-black/10 px-6 py-4 sm:px-9">
            {path === "individual" ? (
              <p className="font-display text-[14px] text-ink/60">
                Signing up a whole school?{" "}
                <button
                  type="button"
                  onClick={() => switchPath("school")}
                  className="font-medium text-brand underline underline-offset-2 hover:text-ink"
                >
                  Register as a School
                </button>
              </p>
            ) : (
              <p className="font-display text-[14px] text-ink/60">
                Just signing yourself up?{" "}
                <button
                  type="button"
                  onClick={() => switchPath("individual")}
                  className="font-medium text-brand underline underline-offset-2 hover:text-ink"
                >
                  Register as an Individual
                </button>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
