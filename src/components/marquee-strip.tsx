/*
 * Scrolling band under the hero, carrying the backing credits.
 * Figma 333:26635 — black, 24px vertical padding, 20px white text at 80%
 * opacity, items separated by a thin 23px rule with 28px either side.
 *
 * One copy of the list has to be at least as wide as the viewport or a gap
 * opens up at the end of each cycle, so the pair is repeated twice inside
 * each copy and the whole track is then duplicated for the -50% loop.
 */
const CREDITS = [
  "Supported by the Government of Karnataka",
  "University Partner Sri Siddhartha Academy of Higher Education",
];

const REPEATS = 2;

function Track({ hidden }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEATS }).flatMap(() => CREDITS);
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((credit, i) => (
        <li key={`${credit}-${i}`} className="flex items-center">
          <span className="px-[14px] font-ui text-[15px] whitespace-nowrap text-white sm:px-[14px] sm:text-[20px]">
            {credit}
          </span>
          <span aria-hidden className="h-[18px] w-px shrink-0 bg-white sm:h-[23px]" />
        </li>
      ))}
    </ul>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden bg-black py-4 sm:py-6">
      {/* the duplicate is what makes the -50% loop seamless */}
      <div
        className="marquee flex w-max opacity-80"
        style={{ "--speed": "44s" } as React.CSSProperties}
      >
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
