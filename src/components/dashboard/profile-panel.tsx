"use client";

import { useEffect, useRef, useState } from "react";

import type { Student } from "@/lib/student-store";

const AVATARS = ["🐍", "🚀", "🤖", "⚡", "🧠", "🛠️", "🎯", "🔭"];

const FIELDS: { key: keyof Student; label: string; type?: string }[] = [
  { key: "name", label: "Full name" },
  { key: "email", label: "Email", type: "email" },
  { key: "phone", label: "Mobile", type: "tel" },
  { key: "grade", label: "Class" },
  { key: "school", label: "School" },
  { key: "city", label: "City" },
];

/** Downscale before storing — localStorage can't hold a full-size photo. */
async function toSmallDataUrl(file: File, size = 192): Promise<string> {
  const bmp = await createImageBitmap(file);
  const side = Math.min(bmp.width, bmp.height);
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(
    bmp,
    (bmp.width - side) / 2,
    (bmp.height - side) / 2,
    side,
    side,
    0,
    0,
    size,
    size,
  );
  return canvas.toDataURL("image/jpeg", 0.82);
}

export default function ProfilePanel({
  student,
  onSave,
  onClose,
}: {
  student: Student;
  onSave: (patch: Partial<Student>) => void;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<Student>(student);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = (patch: Partial<Student>) => setDraft((d) => ({ ...d, ...patch }));

  const pickFile = async (file?: File) => {
    if (!file) return;
    setUploadError(null);
    if (!file.type.startsWith("image/")) {
      setUploadError("Pick an image file.");
      return;
    }
    try {
      set({ avatarImage: await toSmallDataUrl(file) });
    } catch {
      setUploadError("Couldn't read that image.");
    }
  };

  const save = () => {
    onSave(draft);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[120] flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your profile"
        className="panel-in relative flex h-full w-full max-w-[430px] flex-col bg-[var(--dash-surface)] text-[var(--dash-ink)] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-current/10 px-6 py-5">
          <h2 className="font-ui text-[20px] font-bold">Your profile</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile"
            className="grid size-8 place-items-center rounded-full opacity-60 transition-opacity hover:opacity-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* avatar */}
          <div className="flex items-center gap-4">
            <span className="grid size-[72px] shrink-0 place-items-center overflow-hidden rounded-full bg-current/[0.07] text-[30px]">
              {draft.avatarImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={draft.avatarImage}
                  alt=""
                  className="size-full object-cover"
                />
              ) : (
                draft.avatar
              )}
            </span>
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="rounded-[8px] bg-[var(--dash-accent)] px-4 py-2 font-display text-[14px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85"
              >
                Upload a picture
              </button>
              {draft.avatarImage && (
                <button
                  type="button"
                  onClick={() => set({ avatarImage: "" })}
                  className="text-left font-display text-[13px] opacity-60 underline underline-offset-2 hover:opacity-100"
                >
                  Remove, use an emoji
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => void pickFile(e.target.files?.[0])}
              />
            </div>
          </div>
          {uploadError && (
            <p role="alert" className="mt-2 font-display text-[13px] text-[var(--dash-accent)]">
              {uploadError}
            </p>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {AVATARS.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => set({ avatar: a, avatarImage: "" })}
                aria-label={`Use ${a}`}
                aria-pressed={!draft.avatarImage && draft.avatar === a}
                className={`grid size-9 place-items-center rounded-full text-[17px] transition-colors ${
                  !draft.avatarImage && draft.avatar === a
                    ? "ring-2 ring-[var(--dash-accent)]"
                    : "bg-current/[0.06] hover:bg-current/[0.12]"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* bio */}
          <label className="mt-7 block">
            <span className="font-display text-[12px] tracking-[0.06em] uppercase opacity-55">
              Bio
            </span>
            <textarea
              value={draft.bio}
              onChange={(e) => set({ bio: e.target.value.slice(0, 160) })}
              rows={3}
              placeholder="A line about you — what you want to build."
              className="mt-1.5 w-full resize-none rounded-[10px] border-2 border-current/15 bg-transparent p-3 font-display text-[14px] outline-none focus:border-current/45"
            />
            <span className="font-display text-[12px] opacity-45">
              {draft.bio.length}/160
            </span>
          </label>

          {/* signup details */}
          <p className="mt-6 font-display text-[12px] tracking-[0.06em] uppercase opacity-55">
            Your details
          </p>
          <div className="mt-2 flex flex-col gap-3">
            {FIELDS.map((f) => (
              <label key={f.key} className="block">
                <span className="font-display text-[13px] opacity-60">{f.label}</span>
                <input
                  type={f.type ?? "text"}
                  value={String(draft[f.key] ?? "")}
                  onChange={(e) => set({ [f.key]: e.target.value } as Partial<Student>)}
                  placeholder={`Add your ${f.label.toLowerCase()}`}
                  className="mt-1 w-full border-b-2 border-current/15 bg-transparent pb-2 font-display text-[15px] outline-none placeholder:opacity-35 focus:border-[var(--dash-accent)]"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-current/10 px-6 py-4">
          <button
            type="button"
            onClick={save}
            className="w-full rounded-[10px] bg-[var(--dash-accent)] py-3 font-ui text-[16px] text-[var(--dash-on-accent)] transition-opacity hover:opacity-85"
          >
            Save profile
          </button>
        </div>
      </aside>
    </div>
  );
}
