/*
 * Scrolling band under the hero, carrying the backing credits.
 *
 * One copy of the list has to be at least as wide as the viewport or a gap
 * opens up at the end of each cycle, so the pair is repeated twice inside
 * each copy and the whole track is then duplicated for the -50% loop.
 */
const CREDITS = [
  { lead: "Supported by the", name: "Government of Karnataka" },
  { lead: "University Partner", name: "Sri Siddhartha Academy of Higher Education" },
];

const REPEATS = 2;

function Track({ hidden }: { hidden?: boolean }) {
  const items = Array.from({ length: REPEATS }).flatMap(() => CREDITS);
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((c, i) => (
        <li key={`${c.name}-${i}`} className="flex items-center">
          <span className="px-6 font-ui text-[13px] whitespace-nowrap sm:px-8 sm:text-[15px]">
            <span className="text-white/60">{c.lead} </span>
            <span className="text-white">{c.name}</span>
          </span>
          <span aria-hidden className="font-code text-[13px] text-brand sm:text-[15px]">
            &lt;/&gt;
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y-2 border-solid border-black bg-ink py-3 sm:py-3.5">
      {/* the duplicate is what makes the -50% loop seamless */}
      <div className="marquee flex w-max" style={{ "--speed": "40s" } as React.CSSProperties}>
        <Track />
        <Track hidden />
      </div>
    </div>
  );
}
