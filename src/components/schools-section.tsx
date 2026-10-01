import Image from "next/image";

import StickerField from "@/components/code-sticker";
import CtaButton from "@/components/cta-button";
import Reveal from "@/components/reveal";

import classroom from "../../public/images/schools/classroom.png";

/* The three proof points under the button. */
const POINTS = ["Free AI learning", "National competition", "₹20L+ in prizes"];

const RED = "#e7000b";

/** Red tick, matching the flat illustration style. */
function Tick() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden className="shrink-0">
      <path
        d="M2.5 9.4 6.8 13.8 15.5 3.6"
        stroke={RED}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * School outreach block — the one part of the page addressed to teachers and
 * coordinators rather than students.
 *
 * Split layout, left-aligned: every other section on the page is centred or
 * full-width, so this reads as a change of address rather than one more
 * pitch to students.
 */
export default function SchoolsSection() {
  return (
    <section
      id="schools"
      className="relative overflow-hidden bg-canvas pt-[48px] pb-[84px] md:pt-[80px] xl:pb-[80px]"
    >
      {/* Figma 284:23288 / 284:23292 — in the gutters beside the 1122px panel. */}
      <StickerField
        from="xl"
        stickers={[
          { text: "</>", pos: { left: "3.8%", top: "65%" }, size: 30, rotate: -8, duration: 10 },
          { text: "class()", pos: { right: "4.4%", top: "77%" }, size: 24, rotate: 9, duration: 11, delay: -4 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "7%", bottom: "18px" }, size: 28, rotate: -8, duration: 10 },
          { text: "class()", pos: { right: "6%", bottom: "20px" }, size: 20, rotate: 9, duration: 11, delay: -4 },
        ]}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1512px] px-5 lg:px-20">
        <Reveal>
          <div
            className="mx-auto grid max-w-[1122px] items-center gap-8 rounded-[8px] border-black bg-[#e7f5fe] px-6 py-9 sm:px-10 md:py-8 lg:grid-cols-[497fr_525fr] lg:gap-6 lg:px-12"
            style={{ borderStyle: "solid", borderWidth: "2.2px 8.8px 8.8px 2.2px" }}
          >
            <div className="flex flex-col items-start text-left">
              <span className="hard-edge inline-flex items-center bg-white px-2.5 py-[5px] font-code text-[10px] leading-none text-ink">
                &lt;school /&gt;
              </span>

              <h2 className="mt-4 font-ui text-[30px] leading-[1.06] font-bold tracking-[-0.9px] text-ink sm:text-[38px] lg:text-[45px] lg:leading-[47.5px] lg:tracking-[-1.16px]">
                Bring the <span className="text-brand">AI Buildathon</span> to
                your school
              </h2>

              <p className="mt-3.5 font-display text-[17px] tracking-[-0.33px] text-ink sm:text-[19px]">
                Your students are ready to build the future.
              </p>

              <p className="mt-2.5 max-w-[432px] font-display text-[14px] leading-[23px] tracking-[-0.17px] text-muted">
                Give them the opportunity to learn AI for free, build real-world
                projects and compete nationally for &#8377;20L+ in prizes
              </p>

              <div className="mt-5">
                <CtaButton registerAs="school">
                  Register Now
                </CtaButton>
              </div>

              <ul className="mt-5 flex flex-col gap-2 font-display text-[13px] text-ink">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <Tick />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Figma 295:24374 — 525 x 350 in a 1122-wide panel */}
            <Image
              src={classroom}
              alt="Students building AI projects together on laptops"
              sizes="(max-width: 1023px) 92vw, 525px"
              className="order-first h-auto w-full max-w-[525px] justify-self-center lg:order-none"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
