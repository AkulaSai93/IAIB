import StickerField from "@/components/code-sticker";
import CtaButton from "@/components/cta-button";
import Reveal from "@/components/reveal";

/* Facts already established elsewhere on the page. */
const META = ["Classes 9 – 12", "30 live sessions", "National finale"];

/**
 * The page's closing argument for students, just before the block aimed at
 * schools. Kept frameless on purpose — the school panel that follows is a
 * heavy bordered block, so this one carries its weight with type instead.
 */
export default function FinalCtaSection() {
  return (
    <section
      id="register"
      className="relative overflow-hidden bg-canvas pt-[20px] pb-[96px] md:pb-[120px]"
    >
      <StickerField
        from="xl"
        stickers={[
          { text: "</>", pos: { left: "7%", top: "26%" }, size: 34, rotate: -9, duration: 9 },
          { text: "{ }", pos: { right: "7%", top: "34%" }, size: 32, rotate: 8, duration: 11, delay: -4 },
          { text: "// ship it", pos: { right: "12%", bottom: "26px" }, size: 24, rotate: -6, duration: 10, delay: -2 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "7%", bottom: "20px" }, size: 28, rotate: -9, duration: 9 },
          { text: "{ }", pos: { right: "8%", bottom: "22px" }, size: 26, rotate: 8, duration: 11, delay: -4 },
        ]}
      />

      <div className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center px-5 text-center">
        {/* terminal chip, echoing the one in the hero */}
        <Reveal>
          <span className="hard-edge inline-flex items-center gap-2 rounded-full bg-white px-4 py-[7px] font-code text-[12px] leading-none whitespace-nowrap text-ink sm:text-[13px]">
            <i className="caret-blink size-[7px] shrink-0 rounded-full bg-brand" />
            $ iaib register --now
          </span>
        </Reveal>

        <Reveal delay={90} as="h2" className="mt-6 font-ui text-[42px] leading-[1.05] font-bold tracking-[-1.2px] text-ink sm:text-[64px] lg:text-[84px] lg:tracking-[-2.4px]">
          Ready to build the{" "}
          <span className="text-brand">future?</span>
        </Reveal>

        <Reveal delay={170} as="p" className="mt-5 max-w-[620px] font-display text-[17px] leading-[28px] tracking-[-0.2px] text-muted sm:text-[21px] sm:leading-[32px]">
          Learn AI for free, build something real, and take it all the way to
          the national finale.
        </Reveal>

        <Reveal delay={250} className="mt-8">
          <CtaButton>Register Now</CtaButton>
        </Reveal>

        <Reveal delay={320} as="p" className="mt-5 font-grotesk text-[14px] font-bold text-ink sm:text-[16px]">
          October 10th, 2026 &nbsp;|&nbsp; Bengaluru
        </Reveal>

        <Reveal delay={380} className="mt-7 w-full">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-display text-[14px] text-muted sm:gap-x-5 sm:text-[16px]">
            {META.map((m, i) => (
              <li key={m} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden className="text-black/20">
                    &middot;
                  </span>
                )}
                {m}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
