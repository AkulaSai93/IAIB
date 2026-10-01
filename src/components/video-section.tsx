"use client";

import { useEffect, useRef, useState } from "react";

import StickerField from "@/components/code-sticker";
import Reveal from "@/components/reveal";

const VIDEO_ID = "Zmz5gE9nJqY";
/** The link you gave starts at 15s. */
const START_AT = 15;

/*
 * The iframe is not mounted until the play button is pressed. Until then the
 * only third-party request is the thumbnail, so YouTube can't set cookies or
 * profile visitors who never watch — and the page carries none of the
 * player's weight on load.
 *
 * hqdefault is the one thumbnail size that always exists; it is 4:3 with
 * letterbox bars, so object-cover crops it back to the 16:9 frame.
 */
const POSTER = `https://i.ytimg.com/vi/${VIDEO_ID}/hqdefault.jpg`;
const EMBED =
  `https://www.youtube-nocookie.com/embed/${VIDEO_ID}` +
  `?start=${START_AT}&autoplay=1&rel=0&modestbranding=1`;

function PlayIcon() {
  return (
    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden>
      <path
        d="M26 14.3a2 2 0 0 1 0 3.4L3.5 30.9A2 2 0 0 1 .5 29.2V2.8A2 2 0 0 1 3.5 1.1L26 14.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const growRef = useRef<HTMLDivElement>(null);

  /*
    The player grows out of the section as you scroll into it rather than
    just appearing. Progress is driven by the element's own position, so it
    tracks the scrollbar instead of running on a timer.
  */
  useEffect(() => {
    const el = growRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    const update = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.72)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section
      id="video"
      className="relative overflow-hidden bg-canvas pt-[48px] pb-[84px] md:pt-[60px] xl:pb-[60px]"
    >
      {/* Figma places these in the gutters beside the 1062px player. */}
      <StickerField
        from="xl"
        stickers={[
          { text: "</>", pos: { left: "3.9%", top: "47%" }, size: 32, rotate: -8, duration: 10 },
          { text: "play()", pos: { right: "4.8%", top: "81%" }, size: 26, rotate: 9, duration: 11, delay: -3 },
        ]}
        mobile={[
          { text: "</>", pos: { left: "7%", bottom: "18px" }, size: 28, rotate: -8, duration: 10 },
          { text: "play()", pos: { right: "7%", bottom: "20px" }, size: 22, rotate: 9, duration: 11, delay: -3 },
        ]}
      />

      <div className="relative z-10 mx-auto flex max-w-[1512px] flex-col items-center gap-8 px-5 lg:px-20">
        <Reveal className="flex w-full max-w-[844px] flex-col gap-3 text-center">
          <h2 className="font-ui text-[34px] font-bold tracking-[-0.8px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
            Get Inspired to <span className="text-brand">Build</span>
          </h2>
          <p className="font-display text-[18px] tracking-[-0.4px] text-ink sm:text-[24px]">
            See what&rsquo;s possible, hear from the people building it, and get
            inspired to create something of your own.
          </p>
        </Reveal>

        <Reveal delay={120} className="w-full max-w-[1062px]">
          <div
            ref={growRef}
            className="origin-center will-change-transform"
            style={
              {
                "--p": 1,
                transform: "scale(calc(0.76 + 0.24 * var(--p, 1)))",
                opacity: "calc(0.35 + 0.65 * var(--p, 1))",
              } as React.CSSProperties
            }
          >
          <div
            className="relative aspect-video w-full overflow-hidden rounded-[22px] border-black bg-ink"
            style={{ borderStyle: "solid", borderWidth: "2.2px 8.8px 8.8px 2.2px" }}
          >
            {playing ? (
              <iframe
                src={EMBED}
                title="Featured video"
                className="absolute inset-0 size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play the featured video"
                className="group absolute inset-0 size-full cursor-pointer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={POSTER}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-[72px] place-items-center rounded-full bg-brand pl-1 text-white transition-transform duration-300 group-hover:scale-110 sm:size-[88px]">
                    <PlayIcon />
                  </span>
                </span>
              </button>
            )}
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
