"use client";

import Image from "next/image";

import CtaButton from "@/components/cta-button";
import { useState } from "react";

import logoBarclays from "../../public/images/curriculum/logo-barclays.png";
import logoUpgradMark from "../../public/images/curriculum/logo-upgrad.png";
import mentorPhoto from "../../public/images/curriculum/mentor-photo.png";

export type Mentor = {
  name: string;
  role: string;
  photo: typeof mentorPhoto;
};

/*
 * The Figma frames repeat one placeholder mentor; the list is data-driven so
 * real people can be dropped straight in.
 */
export const MENTORS: Mentor[] = Array.from({ length: 5 }, () => ({
  name: "Gladden Rumao",
  role: "Staff Software AI Engineer",
  photo: mentorPhoto,
}));

/** macOS traffic lights. */
function WindowDots() {
  return (
    <span className="flex shrink-0 items-center gap-2" aria-hidden>
      <span className="size-[13px] rounded-full bg-[#ff5f57]" />
      <span className="size-[13px] rounded-full bg-[#febc2e]" />
      <span className="size-[13px] rounded-full bg-[#28c840]" />
    </span>
  );
}

/** lucide/user-round, taking the button's colour. */
function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path
        d="M9 9.75C11.0711 9.75 12.75 8.07107 12.75 6C12.75 3.92893 11.0711 2.25 9 2.25C6.92893 2.25 5.25 3.92893 5.25 6C5.25 8.07107 6.92893 9.75 9 9.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 15.75C15 14.1587 14.3679 12.6326 13.2426 11.5074C12.1174 10.3821 10.5913 9.75 9 9.75C7.4087 9.75 5.88258 10.3821 4.75736 11.5074C3.63214 12.6326 3 14.1587 3 15.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Mentor browser drawn as a desktop window: chrome and a centred title on
 * top, then a black pill of avatar buttons that switch the mentor below.
 */
export default function MentorBrowser({
  mentors = MENTORS,
  idPrefix,
  title = "Mentors",
}: {
  mentors?: Mentor[];
  idPrefix: string;
  title?: string;
}) {
  const [active, setActive] = useState(0);
  const mentor = mentors[active];

  return (
    <div
      className="relative w-full overflow-hidden rounded-[12px] border-black bg-[#f5f0de] lg:w-[983px]"
      style={{ borderStyle: "solid", borderWidth: "2px 8px 8px 2px" }}
    >
      {/* window chrome */}
      <div className="relative flex h-[56px] items-center bg-white px-5 lg:h-[70px]">
        <WindowDots />
        <p className="pointer-events-none absolute inset-x-0 text-center font-display text-[15px] font-medium text-brand lg:text-[18px]">
          {title}
        </p>
      </div>

      {/*
        Figma 258:19671 — photo is a 331px square on the left, details 72px
        to its right, Register Now pinned bottom-right.
      */}
      <div className="relative px-5 pt-5 pb-9 lg:px-12 lg:pb-10">
        {/* avatar switcher */}
        <nav
          aria-label={title}
          className="no-scrollbar mx-auto flex w-fit max-w-full items-center gap-1 overflow-x-auto rounded-full bg-[#111111] p-1.5"
        >
          {mentors.map((m, i) => (
            <button
              key={`${idPrefix}-${i}`}
              type="button"
              onClick={() => setActive(i)}
              aria-current={i === active}
              aria-label={m.name}
              className={`grid size-[27px] shrink-0 place-items-center rounded-full text-white transition-colors ${
                i === active ? "bg-brand" : "hover:bg-white/15"
              }`}
            >
              <UserIcon />
            </button>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center gap-8 lg:mt-10 lg:flex-row lg:items-center lg:gap-[72px] lg:pl-[72px]">
          <div className="relative aspect-square w-[238px] max-w-full shrink-0 lg:w-[331px]">
            <Image
              src={mentor.photo}
              alt={mentor.name}
              fill
              sizes="(max-width: 1023px) 238px, 331px"
              className="object-cover"
            />
          </div>

          <div className="flex w-full max-w-[284px] flex-col items-center gap-5 lg:items-start">
            <div className="flex w-full flex-col items-center gap-1.5 text-center lg:items-start lg:text-left">
              <p className="font-ui text-[28px] leading-[normal] font-bold text-[#272727] lg:text-[35px]">
                {mentor.name}
              </p>
              <p className="font-display text-[14px] leading-[normal] text-brand lg:text-[15px]">
                {mentor.role}
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <Image
                src={logoUpgradMark}
                alt="upGrad School of Technology"
                width={85}
                height={27}
                className="h-[27px] w-[85px] object-contain"
              />
              {/* Figma crops the Barclays artwork out of a larger canvas. */}
              <div className="relative h-[27px] w-[139px] overflow-hidden">
                <Image
                  src={logoBarclays}
                  alt="Barclays"
                  width={172}
                  height={114}
                  className="absolute max-w-none"
                  style={{ width: 171.6, height: 114.4, left: -16.3, top: -43.4 }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex justify-center lg:mt-6 lg:justify-end">
          <CtaButton>Register Now</CtaButton>
        </div>

        {/*
          Figma 258:19681 — "Mentor" at 88,96 rotated -7.6deg, the looping
          arrow at 115,136 mirrored then rotated 4.94deg so its head points
          down-right into the photo.
        */}
        <div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          aria-hidden
        >
          <div
            className="absolute flex items-center justify-center"
            style={{ left: 88, top: 96, width: 78, height: 40 }}
          >
            <span className="font-hand text-[24px] leading-none font-bold whitespace-nowrap text-black"
              style={{ transform: "rotate(-7.6deg) skewX(-0.59deg)" }}
            >
              Mentor
            </span>
          </div>
          <div
            className="absolute"
            style={{
              left: 115,
              top: 136,
              width: 62.7,
              height: 81.1,
              transform: "scaleX(-1) rotate(4.94deg) skewX(1.42deg)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/curriculum/arrow-mentor.svg"
              alt=""
              className="block size-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
