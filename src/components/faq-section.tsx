"use client";

import { useState } from "react";

import StickerField from "@/components/code-sticker";
import KeycapIso from "@/components/keycap-iso";
import Reveal from "@/components/reveal";

type Faq = { q: string; a: string };

/*
 * Only the first answer is supplied in the Figma frame. The rest are drawn
 * from facts already stated elsewhere on the page; the two marked below still
 * need real copy from the organisers.
 */
const FAQS: Faq[] = [
  {
    q: "Who can participate?",
    a: "Any student in classes 9 to 12, studying at a school in India.",
  },
  {
    // TODO: confirm fee details with the organisers.
    q: "Is there a registration fee?",
    a: "Details on registration will be shared when applications open.",
  },
  {
    q: "Do I need prior coding or AI experience?",
    a: "No. The live sessions start from AI fundamentals and build up to LLMs and agentic AI, so you can join with no prior background.",
  },
  {
    q: "How are the learning sessions conducted?",
    a: "30 live sessions with industry mentors, covering AI fundamentals, LLMs and agentic AI.",
  },
  {
    q: "What does the screening round involve?",
    a: "Clear the online test, then vibecode a working prototype with AI tools to earn your finale spot.",
  },
  {
    // TODO: confirm judging criteria with the organisers.
    q: "How is the project evaluated?",
    a: "Evaluation criteria will be shared with shortlisted participants ahead of the grand finale.",
  },
];

function Chevron() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FaqSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faqs"
      className="relative overflow-hidden bg-canvas pt-[60px] pb-[150px] md:pt-[80px] md:pb-[80px]"
    >
      <StickerField
        stickers={[
          { text: "?", pos: { left: "6%", top: "52%" }, size: 44, rotate: -10, duration: 9 },
          { text: "// faq", pos: { right: "4%", top: "22%" }, size: 26, rotate: 8, duration: 11, delay: -3 },
        ]}
        mobile={[
          { text: "?", pos: { left: "7%", bottom: "18px" }, size: 36, rotate: -10, duration: 9 },
          { text: "// faq", pos: { right: "6%", bottom: "20px" }, size: 22, rotate: 8, duration: 11, delay: -3 },
        ]}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
      >
        <div
          className="float-soft absolute origin-center scale-[0.5]"
          style={
            {
            left: "50%", bottom: "14px",
            "--tilt": "0deg",
            animationDuration: "11s",
            animationDelay: "-2s",
            } as React.CSSProperties
          }
        >
          <KeycapIso className="w-[150px]" />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      >
        <div
          className="float-soft absolute"
          style={
            {
            right: "2%", top: "42%",
            "--tilt": "0deg",
            animationDuration: "11s",
            animationDelay: "-2s",
            } as React.CSSProperties
          }
        >
          <KeycapIso className="w-[150px]" />
        </div>
      </div>


      <div className="relative z-10 mx-auto max-w-[1512px] px-5 lg:px-20">
        <Reveal className="flex max-w-[669px] flex-col gap-3">
          <h2 className="font-ui text-[44px] font-bold tracking-[-1px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
            Everything you need to know before you register, prepare, and take on
            the challenge.
          </p>
        </Reveal>

        <ul className="mx-auto mt-[56px] flex w-full max-w-[964px] flex-col gap-6">
          {FAQS.map((faq, i) => {
            const isOpen = i === open;
            return (
              <Reveal
                as="li"
                key={faq.q}
                delay={i * 70}
                className={`rounded-[6px] border-black transition-colors ${
                  isOpen ? "bg-brand" : "bg-white"
                }`}
                style={{ borderStyle: "solid", borderWidth: "1px 4px 4px 1px" }}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className={`flex w-full items-start justify-between gap-6 px-6 py-5 text-left sm:px-8 sm:py-6 ${
                      isOpen ? "text-white" : "text-[#111111]"
                    }`}
                  >
                    <span className="font-display text-[19px] font-medium sm:text-[24px]">
                      {faq.q}
                    </span>
                    <span
                      className={`grid size-8 shrink-0 place-items-center border border-solid ${
                        isOpen ? "border-white" : "border-[#111111]"
                      }`}
                    >
                      <span
                        className={`transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <Chevron />
                      </span>
                    </span>
                  </button>
                </h3>

                {/* 0fr -> 1fr animates to the panel's natural height */}
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 font-display text-[17px] text-white/80 sm:px-8 sm:pb-6 sm:text-[20px]">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
