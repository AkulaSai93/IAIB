import StickerField from "@/components/code-sticker";
import HypeSticker from "@/components/hype-sticker";
import Reveal from "@/components/reveal";
import MentorBrowser from "@/components/mentor-browser";

export default function MentorsSection() {
  return (
    <section
      id="mentor"
      className="relative overflow-hidden bg-canvas py-[60px] md:py-[80px]"
    >
      <StickerField
        stickers={[
          { text: "</>", pos: { left: "4%", top: "22%" }, size: 32, rotate: -8, duration: 10 },
          { text: "ai()", pos: { right: "4%", top: "68%" }, size: 30, rotate: 9, duration: 8, delay: -2 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "6%", bottom: "16px" }, size: 28, rotate: -8, duration: 10 },
        ]}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden md:hidden"
      >
        <div
          className="float-soft absolute origin-center scale-[0.5]"
          style={{ right: "5%", bottom: "16px", "--tilt": "0deg", animationDuration: "10s", animationDelay: "-1.5s" } as React.CSSProperties}
        >
          <HypeSticker lines={["Ship", "It"]} size={38} rotate={8} colors={["#9ccb3b", "#35b6e0"]} />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      >
        <div
          className="float-soft absolute"
          style={{ left: "3%", top: "56%", "--tilt": "0deg", animationDuration: "10s", animationDelay: "-1.5s" } as React.CSSProperties}
        >
          <HypeSticker lines={["Ship", "It"]} size={38} rotate={8} colors={["#9ccb3b", "#35b6e0"]} />
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[983px] flex-col items-center gap-8 px-5">
        <Reveal className="flex w-full max-w-[844px] flex-col gap-3 text-center">
          <h2 className="font-ui text-[44px] font-bold tracking-[-1px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
            Meet Our <span className="text-brand">Mentors</span>
          </h2>
          <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
            Learn from industry experts, creators, and innovators who bring
            real-world experience, practical insights, and guidance to help you
            learn, build, and grow.
          </p>
        </Reveal>

        <Reveal delay={120} className="w-full">
          <MentorBrowser idPrefix="mentors" />
        </Reveal>
      </div>
    </section>
  );
}
