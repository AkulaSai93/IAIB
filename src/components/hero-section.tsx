import Image from "next/image";

import StickerField from "@/components/code-sticker";
import CtaButton from "@/components/cta-button";
import HeroCodeDecor from "@/components/hero-code-decor";
import Reveal from "@/components/reveal";

import heroLockup from "../../public/images/hero-lockup.png";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-5 pt-[24px] pb-[64px] text-center md:pt-[44px] md:pb-[88px] lg:pt-[44px] lg:pb-[88px]">
      <HeroCodeDecor />
      <StickerField
        from="xl"
        stickers={[
          { text: "</>", pos: { left: "19%", top: "8%" }, size: 34, rotate: -9, duration: 8 },
          { text: "{ }", pos: { right: "21%", top: "80%" }, size: 32, rotate: 8, duration: 9, delay: -3 },
          { text: "=>", pos: { left: "4%", top: "52%" }, size: 26, rotate: 7, duration: 10, delay: -5 },
          { text: "( )", pos: { right: "4%", top: "48%" }, size: 24, rotate: -8, duration: 11, delay: -2 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "6%", bottom: "18px" }, size: 30, rotate: -9, duration: 8 },
          { text: "{ }", pos: { right: "7%", bottom: "16px" }, size: 28, rotate: 8, duration: 9, delay: -3 },
          { text: "=>", pos: { left: "44%", bottom: "20px" }, size: 24, rotate: 6, duration: 10, delay: -5 },
        ]}
      />

      {/* tagline sits in a tinted code pill with a block cursor */}
      <Reveal className="relative z-10">
        <p className="inline-flex items-center gap-2 border border-solid border-brand/25 bg-brand/[0.06] px-4 py-2 font-code text-[12px] leading-[18px] text-brand sm:text-[13.6px]">
          <span className="text-center">
            India&rsquo;s Largest AI Talent Discovery and Development Platform
          </span>
          <span aria-hidden className="caret-blink">&#9612;</span>
        </p>
      </Reveal>

      {/*
        Figma 274:22298 composites three layers: the lockup artwork, a white
        patch over its top block, and the upGrad x IAIB decal rotated onto
        it. Percentages are of the 878.6 x 415 artwork box, so it all scales.
      */}
      <Reveal
        delay={90}
        className="relative z-10 mt-3 w-full"
        /* the artwork is 879x415; cap it against viewport height so the
           date and CTA stay above the fold on short laptop screens */
        style={{ maxWidth: "min(879px, 97vh)" }}
      >
        <div className="relative aspect-[879/415] w-full">
          <Image
            src={heroLockup}
            alt="IAIB — Ignite AI Buildathon"
            fill
            priority
            sizes="(max-width: 919px) 100vw, 879px"
            className="object-contain"
          />

          <div
            aria-hidden
            className="absolute flex items-center justify-center"
            style={{ left: "30.36%", top: "16.39%", width: "28.77%", height: "25.88%" }}
          >
            <div
              className="h-[83.79%] w-[97.71%] bg-[#fbfbfb]"
              style={{ transform: "rotate(-4.1deg)" }}
            />
          </div>

          <div
            aria-hidden
            className="absolute flex items-center justify-center"
            style={{ left: "28.2%", top: "12.16%", width: "33%", height: "34.34%" }}
          >
            <div
              className="relative h-[80.03%] w-[96.43%] overflow-hidden"
              style={{ transform: "rotate(-5.97deg)" }}
            >
              {/*
                The asset is pre-cropped to the portion Figma shows, so it
                just fills the box — no oversized image offset off-screen.
                Above the fold, so it is fetched with the hero.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero-lockup-decal.png"
                alt=""
                width={640}
                height={260}
                fetchPriority="high"
                decoding="async"
                className="block h-full w-full"
              />
            </div>
          </div>
        </div>
      </Reveal>

      <Reveal delay={170} as="p" className="relative z-10 mt-[15px] max-w-[768px] font-display text-[16px] leading-[24px] tracking-[-0.4px] text-ink sm:text-[20px] sm:leading-[28px]">
        AIB stands to identify, nurture, and facilitate school students from
        classes 9th till 12th in learning about AI. They will get to learn AI,
        test their knowledge, and build solutions.
      </Reveal>

      <Reveal delay={250} className="relative z-10 mt-[20px] flex flex-col items-center gap-2.5">
        <p className="font-grotesk text-[15px] font-bold whitespace-nowrap text-ink sm:text-[18px]">
          October 8th, 2026 | Bengaluru
        </p>
        <CtaButton id="sign-up">
          Register Now
        </CtaButton>
      </Reveal>
    </section>
  );
}
