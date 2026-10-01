"use client";

import { useRegister, type Path } from "@/components/register-flow";

type Props = {
  children: React.ReactNode;
  /**
   * Every call to action on the page is the same size — `sm`. `lg` is kept
   * for anywhere that needs the oversized treatment.
   */
  variant?: "sm" | "lg";
  id?: string;
  className?: string;
  /** Which set of registration questions the modal opens on. */
  registerAs?: Path;
};

const BASE =
  "group relative isolate flex shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-[8px] bg-brand text-white transition-transform";

const SIZES = {
  sm: "hard-edge w-[104px] p-[8px] font-ui text-[14px] leading-[1.15] active:translate-x-px active:translate-y-px sm:w-[146px] sm:p-[10px] sm:text-[16px]",
  lg: "hard-edge-lg w-[180px] p-[12px] font-ui text-[20px] active:translate-x-[1.5px] active:translate-y-[1.5px] sm:w-[209px] sm:p-[14px] sm:text-[23px]",
} as const;

export default function CtaButton({
  children,
  variant = "sm",
  id,
  className = "",
  registerAs = "individual",
}: Props) {
  const { open } = useRegister();

  return (
    <button
      type="button"
      id={id}
      onClick={() => open(registerAs)}
      className={`${BASE} ${SIZES[variant]} ${className}`}
    >
      {/*
        Black sweeps up from the bottom edge on hover. Sits at -z-10 inside
        the button's own stacking context: above the red fill, below the
        label. Clipped by overflow-hidden so it keeps the rounded corners.
      */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-black transition-transform duration-300 ease-out group-hover:scale-y-100"
      />
      <span className="whitespace-nowrap">{children}</span>
    </button>
  );
}
