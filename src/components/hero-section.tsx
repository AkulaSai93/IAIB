import Image from "next/image";

import StickerField from "@/components/code-sticker";
import CtaButton from "@/components/cta-button";
import Reveal from "@/components/reveal";
import FloatingLogos from "@/components/floating-logos";

import heroLockup from "../../public/images/hero-lockup.png";
import pandaBadge from "../../public/images/panda-badge.png";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center overflow-hidden px-5 pt-[40px] pb-[80px] text-center md:pt-[64px] md:pb-[96px]">
      <FloatingLogos />
      <StickerField
        stickers={[
          { text: "</>", pos: { left: "19%", top: "8%" }, size: 34, rotate: -9, duration: 8 },
          { text: "{ }", pos: { right: "21%", top: "80%" }, size: 32, rotate: 8, duration: 9, delay: -3 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "6%", bottom: "18px" }, size: 30, rotate: -9, duration: 8 },
          { text: "{ }", pos: { right: "7%", bottom: "16px" }, size: 28, rotate: 8, duration: 9, delay: -3 },
        ]}
      />

      <Reveal className="relative z-10 flex items-center gap-2">
        <Image
          src={pandaBadge}
          alt=""
          aria-hidden
          width={72}
          height={48}
          priority
          className="h-[48px] w-[72px] shrink-0 object-cover"
        />
        <p className="font-display text-[16px] leading-[24px] tracking-[-0.4px] text-ink sm:text-[20px] sm:leading-[28px]">
          India&rsquo;s Largest AI Talent Discovery and Development Platform
        </p>
      </Reveal>

      {/*
        Figma crops the lockup to an 869x415 slot — the artwork is wider than
        it is tall, so it fills the width and is trimmed top and bottom.
      */}
      <Reveal delay={90} className="relative z-10 w-full max-w-[869px]">
        <div className="relative aspect-[869/415] w-full">
        <Image
          src={heroLockup}
          alt="IAIB — Ignite AI Buildathon"
          fill
          priority
          sizes="(max-width: 909px) 100vw, 869px"
            className="object-cover"
          />
        </div>
      </Reveal>

      <Reveal delay={170} as="p" className="relative z-10 mt-[15px] max-w-[768px] font-display text-[16px] leading-[24px] tracking-[-0.4px] text-ink sm:text-[20px] sm:leading-[28px]">
        AIB stands to identify, nurture, and facilitate school students from
        classes 9th till 12th in learning about AI. They will get to learn AI,
        test their knowledge, and build solutions.
      </Reveal>

      <Reveal delay={250} className="relative z-10 mt-[26px] flex flex-col items-center gap-3">
        <p className="font-grotesk text-[15px] font-bold whitespace-nowrap text-ink sm:text-[18px]">
          October 10th, 2026 | Bengaluru
        </p>
        <CtaButton id="sign-up">
          Sign Up
        </CtaButton>
      </Reveal>
    </section>
  );
}
