
import CtaButton from "@/components/cta-button";
import StickerField from "@/components/code-sticker";
import HypeSticker from "@/components/hype-sticker";
import Reveal from "@/components/reveal";
import StepGraphic from "@/components/step-graphic";

type Step = {
  label: string;
  title: string;
  body: string;
  bg: string;
  /** Which code-themed illustration heads the card. */
  art: 1 | 2 | 3 | 4;
};

const STEPS: Step[] = [
  {
    label: "Step 01",
    title: "Registration",
    body: "Sign up individually or through your school. Open to students from classes 9 to 12.",
    bg: "#e7f5fe",
    art: 1,
  },
  {
    label: "Step 02",
    title: "Live Learning",
    body: "30 live sessions with industry mentors, from AI fundamentals and LLMs to agentic AI.",
    bg: "#fde7a7",
    art: 2,
  },
  {
    label: "Step 03",
    title: "Screening + Vibecoding",
    body: "Clear the online test, then vibe code a working prototype with AI tools to earn your finale spot.",
    bg: "#f1d7fd",
    art: 3,
  },
  {
    label: "Step 04",
    title: "Grand Finale",
    body: "36 hours, offline in Bengaluru. Build, pitch to VCs, and compete for the ₹20 lakh prize pool.",
    bg: "#e2f8ef",
    art: 4,
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-canvas pt-[48px] pb-[120px] md:pt-[80px] md:pb-[150px]"
    >
      <StickerField
        stickers={[
          { text: "npm run", pos: { left: "5%", bottom: "38px" }, size: 26, rotate: -8, duration: 10 },
          { text: "</>", pos: { right: "6%", bottom: "34px" }, size: 32, rotate: 9, duration: 8, delay: -4 },
        ]}
        mobile={[
          { text: "npm run", pos: { left: "6%", bottom: "16px" }, size: 22, rotate: -8, duration: 10 },
        ]}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
      >
        <div
          className="float-soft absolute origin-center scale-[0.5]"
          style={{ right: "4%", bottom: "14px", "--tilt": "0deg", animationDuration: "10s", animationDelay: "-1.5s" } as React.CSSProperties}
        >
          <HypeSticker lines={["Vibe", "Coder"]} size={40} rotate={-7} />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      >
        <div
          className="float-soft absolute"
          style={{ right: "3%", top: "6%", "--tilt": "0deg", animationDuration: "10s", animationDelay: "-1.5s" } as React.CSSProperties}
        >
          <HypeSticker lines={["Vibe", "Coder"]} size={40} rotate={-7} />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1512px] flex-col gap-[52px] px-5 lg:px-20">
        <div className="flex w-full flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <Reveal className="flex w-full max-w-[676px] flex-col gap-3">
            <h2 className="font-ui text-[34px] font-bold tracking-[-0.8px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
              How does it <span className="text-brand">work?</span>
            </h2>
            <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
              Just a quick 4-step process and you&rsquo;re in!
            </p>
          </Reveal>

          <Reveal delay={120} className="shrink-0">
            <CtaButton>Register Now</CtaButton>
          </Reveal>
        </div>

        {/* 4 x 317 + 3 x 28 = 1352, exactly the content width at 1512 */}
        <ul className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.label}
              delay={i * 90}
              className="overflow-hidden rounded-[22px] border-black lg:h-[362px]"
              style={{
                background: step.bg,
                borderStyle: "solid",
                borderWidth: "2.2px 8.8px 8.8px 2.2px",
              }}
            >
              <div className="flex flex-col px-[17.8px] pt-[30px] pb-8 lg:pb-0">
                <StepGraphic
                  variant={step.art}
                  className="mb-5 h-[118px] w-full shrink-0"
                />
                <p className="mb-3 font-display text-[20px] leading-[normal] tracking-[-0.4px] text-brand">
                  {step.label}
                </p>
                <p className="mb-3 font-ui text-[24px] leading-[normal] font-bold uppercase text-ink">
                  {step.title}
                </p>
                <p className="font-display text-[16px] leading-[normal] tracking-[-0.4px] text-ink">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
