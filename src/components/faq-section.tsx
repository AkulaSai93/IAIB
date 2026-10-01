"use client";

import { useState } from "react";

import StickerField from "@/components/code-sticker";
import KeycapIso from "@/components/keycap-iso";
import Reveal from "@/components/reveal";

type Faq = { q: string; a: string };

/* Supplied by the organisers. */
const FAQS: Faq[] = [
  {
    q: "Who can participate?",
    a: "Any student in classes 9 to 12, studying at a school in India.",
  },
  {
    q: "Is there a registration fee?",
    a: "No. Registration and participation are completely free.",
  },
  {
    q: "Do I need prior coding or AI experience?",
    a: "No. The learning sessions start from the basics. All you need is curiosity about AI.",
  },
  {
    q: "How are the learning sessions conducted?",
    a: "Sessions are held live online, on weekend mornings. They won\u2019t clash with school, and you\u2019ll still have the rest of your weekend free.",
  },
  {
    q: "What does the screening round involve?",
    a: "There are two steps. First, a 40-minute test on what you learned in the sessions. Second, a small project that you build from one of 50 prompts we share. Screening is done individually.",
  },
  {
    q: "How is the project evaluated?",
    a: "Projects are judged on five criteria: originality, ethical use of AI, clarity, scalability, and potential for real-world impact.",
  },
  {
    q: "Can I participate with my friends as a team?",
    a: "Screening is individual. At the offline buildathon, finalists compete in teams of four, and teams are formed on the day of the event.",
  },
  {
    // TODO: organisers to confirm the travel cap.
    q: "Will travel and accommodation be covered for finalists?",
    a: "Yes. Travel and accommodation costs are reimbursed once receipts are verified, so keep all your bills. Costs are reimbursed for one child and one parent only. The maximum cap on the child\u2019s return travel is still to be confirmed.",
  },
  {
    q: "How does the \u20B92 crore scholarship work?",
    a: "The scholarship is a pool of \u20B92 crore for participants who take admission to the upGrad School of Technology campus programme in next year\u2019s cohort. It becomes null and void if the student takes admission elsewhere.",
  },
  {
    q: "Is parental consent required?",
    a: "Yes. A parent or guardian must give consent at registration. We also recommend that a parent or guardian accompany the student throughout the offline buildathon.",
  },
  {
    q: "Who owns the solutions built during the buildathon?",
    a: "The solutions belong to the teams that built them. Participants are free to keep developing their projects after the event.",
  },
  {
    q: "What do I need for the online sessions?",
    a: "A laptop or computer with a stable internet connection.",
  },
  {
    q: "What if I miss a live session?",
    a: "You can access recorded sessions, which will be uploaded.",
  },
  {
    q: "What language are the sessions taught in?",
    a: "English.",
  },
  {
    q: "How will I know if I\u2019ve been shortlisted?",
    a: "Shortlisted participants will be informed by email and phone.",
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

/*
 * Figma shows a "View all" control under the list, which only makes sense
 * once there are more questions than fit here. The list is capped at
 * VISIBLE and the control appears as soon as the organisers add a seventh.
 */
const VISIBLE = 6;

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const shown = showAll ? FAQS : FAQS.slice(0, VISIBLE);

  return (
    <section
      id="faqs"
      className="relative overflow-hidden bg-canvas pt-[48px] pb-[140px] md:pt-[80px] xl:pb-[80px]"
    >
      <StickerField
        from="xl"
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
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden xl:hidden"
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
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block"
      >
        <div
          className="float-soft absolute"
          style={
            {
            /* beside the 669px-wide heading, clear of the 964px list below */
            right: "3%", top: "6%",
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
          <h2 className="font-ui text-[34px] font-bold tracking-[-0.8px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
            Frequently Asked <span className="text-brand">Questions</span>
          </h2>
          <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
            Everything you need to know before you register, prepare, and take on
            the challenge.
          </p>
        </Reveal>

        <ul className="mx-auto mt-[56px] flex w-full max-w-[964px] flex-col gap-6">
          {shown.map((faq, i) => {
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

        {FAQS.length > VISIBLE && !showAll && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="hard-edge rounded-[6px] bg-white px-7 py-2.5 font-display text-[15px] text-brand transition-colors hover:bg-brand hover:text-white sm:text-[16px]"
            >
              View all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
