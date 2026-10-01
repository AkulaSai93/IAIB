import StickerField from "@/components/code-sticker";
import HypeSticker from "@/components/hype-sticker";
import Reveal from "@/components/reveal";
import MentorBrowser from "@/components/mentor-browser";

export default function CurriculumSection() {
  return (
    <section
      id="curriculum"
      className="relative overflow-hidden bg-canvas py-[60px] md:py-[80px]"
    >
      <StickerField
        stickers={[
          { text: "{ }", pos: { left: "4%", top: "26%" }, size: 34, rotate: 8, duration: 9 },
          { text: "def ai()", pos: { right: "3%", top: "64%" }, size: 26, rotate: -9, duration: 11, delay: -3 },
        ]}
        mobile={[
          { text: "{ }", pos: { left: "6%", bottom: "16px" }, size: 30, rotate: 8, duration: 9 },
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
          <HypeSticker lines={["Build", "AI"]} size={36} rotate={-9} colors={["#35b6e0", "#d6228c"]} />
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden md:block"
      >
        <div
          className="float-soft absolute"
          style={{ right: "2%", top: "16%", "--tilt": "0deg", animationDuration: "10s", animationDelay: "-1.5s" } as React.CSSProperties}
        >
          <HypeSticker lines={["Build", "AI"]} size={36} rotate={-9} colors={["#35b6e0", "#d6228c"]} />
        </div>
      </div>
      <div className="relative z-10 mx-auto flex max-w-[983px] flex-col items-center gap-8 px-5">
        <Reveal className="flex w-full max-w-[844px] flex-col gap-3 text-center">
          <h2 className="font-ui text-[44px] font-bold tracking-[-1px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
            Explore the <span className="text-brand">Curriculum</span>
          </h2>
          <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
            Learn AI, build projects, and get ready to compete.
          </p>
        </Reveal>

        <Reveal delay={120} className="w-full">
          <MentorBrowser idPrefix="curriculum" title="Curriculum" />
        </Reveal>
      </div>
    </section>
  );
}
