"use client";

import Image, { type StaticImageData } from "next/image";

import StickerField from "@/components/code-sticker";
import KeycapIso from "@/components/keycap-iso";

import { useEffect, useRef, useState } from "react";

import cardPrizes from "../../public/images/card-prizes.png";
import cardRecommendation from "../../public/images/card-recommendation.png";
import cardCertificates from "../../public/images/card-certificates.png";
import cardScholarship from "../../public/images/card-scholarship.png";
import cardVcs from "../../public/images/card-vcs.png";

/* Card geometry straight from the Figma frame. */
const CARD_W = 379.5;
const CARD_H = 473;
const CARD_GAP = 30.8;
/** Distance from one card's left edge to the next, as laid out in Figma. */
const CARD_PITCH = CARD_W + CARD_GAP;

type Piece = {
  text: string;
  /** Left edge, or `cx` for pieces Figma centres with translateX(-50%). */
  left?: number;
  cx?: number;
  top: number;
  width?: number;
  align?: "left" | "center";
  size?: number;
  badge?: boolean;
  padX?: number;
};

type CardDef = {
  id: string;
  label: string;
  bg: string;
  pieces: Piece[];
  image?: {
    src: StaticImageData;
    left: number;
    top: number;
    w: number;
    h: number;
    /** Figma crops these by over-sizing and offsetting the bitmap. */
    inner: { left: number; top: number; w: number; h: number };
  };
};

const CARDS: CardDef[] = [
  {
    id: "scholarship",
    label: "Scholarship worth 2 crore*",
    bg: "#e7f5fe",
    pieces: [
      { text: "Scholarship", left: 59.4, top: 19.8, width: 257.4 },
      { text: "Worth", left: 59.4, top: 70.4, width: 257.4, align: "center" },
      { text: "2 crore", cx: 188.1, top: 133.1, badge: true },
    ],
    image: {
      src: cardScholarship,
      left: 16.5,
      top: 212.3,
      w: 353.1,
      h: 242,
      inner: { left: -28.6, top: -18.7, w: 422.4, h: 281.6 },
    },
  },
  {
    id: "vcs",
    label: "Pitch to VCs",
    bg: "#f1d7fd",
    pieces: [
      { text: "Pitch to", cx: 113.3, top: 30.8 },
      { text: "VCs", cx: 235.95, top: 91.3, width: 148.5, badge: true },
    ],
    image: {
      src: cardVcs,
      left: 28.66,
      top: 172.31,
      w: 317.408,
      h: 290.07,
      inner: { left: 0, top: 0, w: 317.408, h: 290.07 },
    },
  },
  {
    id: "prizes",
    label: "Prizes worth 20 lakhs",
    bg: "#fde7a7",
    pieces: [
      { text: "Prizes", left: 101.2, top: 18.7 },
      { text: "Worth", left: 198, top: 71.5 },
      { text: "25 Lakhs", left: 33, top: 136.4, badge: true },
    ],
    image: {
      src: cardPrizes,
      left: 28.09,
      top: 222.2,
      w: 329.914,
      h: 221.1,
      inner: { left: -25.8, top: 0, w: 355.9, h: 237.3 },
    },
  },
  {
    id: "recommendation",
    label: "Letter of recommendation",
    bg: "#e2f8ef",
    pieces: [
      { text: "Letter of", cx: 193.6, top: 19.8, width: 336.6, align: "center" },
      {
        text: "Recommendation",
        cx: 193.6,
        top: 78.1,
        width: 336.6,
        size: 35.2,
        badge: true,
      },
    ],
    image: {
      src: cardRecommendation,
      left: 19.8,
      top: 178.2,
      w: 331.1,
      h: 273.9,
      inner: { left: 0, top: -13.2, w: 331.1, h: 302.6 },
    },
  },
  {
    id: "certificates",
    label: "Certificates & goodies",
    bg: "#fdc5b6",
    pieces: [
      { text: "Certificates", left: 22, top: 26.4 },
      { text: "&", left: 282.7, top: 70.4, badge: true, padX: 13.2 },
      { text: "Goodies", left: 99, top: 113.3 },
    ],
    image: {
      src: cardCertificates,
      left: 44.1,
      top: 199.8,
      w: 297.99,
      h: 247.135,
      inner: { left: 0, top: 0, w: 297.99, h: 247.135 },
    },
  },
];

function CardFace({ card, eager }: { card: CardDef; eager?: boolean }) {
  return (
    <div
      className="relative overflow-hidden rounded-[22px] border-black"
      style={{
        width: CARD_W,
        height: CARD_H,
        background: card.bg,
        borderStyle: "solid",
        borderWidth: "2.2px 8.8px 8.8px 2.2px",
      }}
    >
      {card.image && (
        <div
          className="pointer-events-none absolute overflow-hidden"
          style={{
            left: card.image.left,
            top: card.image.top,
            width: card.image.w,
            height: card.image.h,
          }}
        >
          <div
            className="absolute"
            style={{
              left: card.image.inner.left,
              top: card.image.inner.top,
              width: card.image.inner.w,
              height: card.image.inner.h,
            }}
          >
            {/*
              Only the front card is fetched up front — the other four are
              ~500kB between them and sit a full viewport below the fold,
              where they were crowding out the hero artwork. The queued
              cards load lazily; their layout box is inside the pinned
              container, so the browser starts them well before they slide
              in and no card animates in blank.
            */}
            <Image
              src={card.image.src}
              alt=""
              aria-hidden
              fill
              loading={eager ? "eager" : "lazy"}
              fetchPriority={eager ? "auto" : "low"}
              sizes="(max-width: 640px) 90vw, 424px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {card.pieces.map((p, i) => {
        const size = p.size ?? 44;
        const position: React.CSSProperties =
          p.cx !== undefined
            ? { left: p.cx, top: p.top, transform: "translateX(-50%)" }
            : { left: p.left, top: p.top };

        return (
          <div
            key={i}
            className="absolute font-display font-bold"
            style={{
              ...position,
              width: p.width,
              fontSize: size,
              lineHeight: 1.15,
              color: p.badge ? "#ffffff" : "#131313",
              background: p.badge ? "#e7000b" : undefined,
              padding: p.badge ? `2.2px ${p.padX ?? 15.4}px` : undefined,
              textAlign: p.badge ? "center" : (p.align ?? "left"),
              whiteSpace: p.width ? undefined : "nowrap",
              fontVariationSettings: '"opsz" 14, "wdth" 100',
            }}
          >
            {p.text}
          </div>
        );
      })}
    </div>
  );
}

export default function WhyIaibSection() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [reduced, setReduced] = useState(false);
  // The card is a fixed 379.5px by design; shrink the whole deck rather than
  // reflowing it, so the bespoke per-card layouts stay intact on phones.
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      setScale(w >= 1024 ? 1 : Math.min(1, (w - 40) / (CARD_W + 11)));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (reduced) return;

    let frame = 0;

    const render = () => {
      frame = 0;
      const wrap = wrapRef.current;
      if (!wrap) return;

      const rect = wrap.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const progress = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      // Where we are in the deck, as a fractional card index.
      const head = progress * (CARDS.length - 1);

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const t = head - i;

        if (t < 0) {
          // Not yet at the front: still queued to the right as a row, exactly
          // like the Figma layout — so the next card always peeks into frame.
          el.style.transform = `translate3d(${-t * CARD_PITCH}px,0,0) scale(1)`;
          el.style.opacity = "1";
          return;
        }

        // Passed: recede into the stack behind.
        const d = Math.min(t, 4);
        const scale = 1 - 0.06 * d;
        const lift = -18 * d;
        const fade = t > 3 ? Math.max(0, 1 - (t - 3) / 1.2) : 1;
        el.style.transform = `translate3d(0,${lift}px,0) scale(${scale})`;
        el.style.opacity = String(fade);
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };

    render();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const heading = (
    <div className="flex w-full max-w-[594px] flex-col gap-6">
      <h2 className="font-ui text-[34px] font-bold tracking-[-0.8px] text-ink sm:text-[64px] lg:text-[80px] lg:tracking-[-2px]">
        Why <span className="text-brand">IAIB?</span>
      </h2>
      <p className="font-display text-[18px] leading-[26px] tracking-[-0.4px] text-ink sm:text-[22px] sm:leading-[28px]">
        AI is no longer the future&mdash;it&rsquo;s the skill shaping the present.
        <br />
        IAIB makes AI literacy a norm for students from Classes 9&ndash;12 through
        hands-on learning and real-world problem solving.
      </p>
    </div>
  );

  /* No pinning when the visitor prefers reduced motion — just a swipeable row. */
  if (reduced) {
    return (
      <section id="why-iaib" className="bg-canvas py-20">
        <div className="mx-auto max-w-[1512px] px-5 lg:px-20">{heading}</div>
        <div className="mt-12 flex snap-x snap-mandatory gap-[30.8px] overflow-x-auto px-5 pb-6 lg:px-20">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="shrink-0 snap-center"
              style={{ width: (CARD_W + 11) * scale, height: (CARD_H + 11) * scale }}
            >
              <div
                style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
              >
                <CardFace card={card} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="why-iaib"
      ref={wrapRef}
      className="relative bg-canvas"
      style={{ height: `${(CARDS.length - 1) * 65 + 110}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <StickerField
          from="xl"
          stickers={[
            { text: "const", pos: { left: "4%", top: "16%" }, size: 30, rotate: -7, duration: 9 },
            { text: "=>", pos: { left: "27%", top: "80%" }, size: 34, rotate: 10, duration: 7, delay: -2 },
          ]}
          mobile={[
            { text: "const", pos: { left: "5%", bottom: "20px" }, size: 26, rotate: -7, duration: 9 },
            { text: "=>", pos: { right: "7%", bottom: "18px" }, size: 30, rotate: 10, duration: 7, delay: -2 },
          ]}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden xl:hidden"
        >
          <div
            className="float-soft absolute origin-center scale-[0.5]"
            style={
              {
                left: "50%", bottom: "14px",
                "--tilt": "0deg",
                animationDuration: "11s",
                animationDelay: "-2s",
              } as React.CSSProperties
            }
          >
            <KeycapIso className="w-[160px] -translate-x-1/2" />
          </div>
        </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden xl:block"
      >
        <div
            className="float-soft absolute"
            style={
              {
                left: "3%", top: "68%",
                "--tilt": "0deg",
                animationDuration: "11s",
                animationDelay: "-2s",
              } as React.CSSProperties
            }
          >
            <KeycapIso className="w-[160px]" />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1512px] flex-col items-start gap-10 px-5 lg:grid lg:grid-cols-2 lg:items-center lg:gap-0 lg:px-20">
          {heading}

          {/*
            The deck. Each card is absolutely stacked on the same spot; a later
            card sits at a higher z-index so it slides in *over* the one in
            front, which then scales and lifts away behind it.
          */}
          <div
            className="relative mx-auto shrink-0 lg:mx-0"
            style={{ width: (CARD_W + 11) * scale, height: (CARD_H + 11) * scale }}
          >
            <div
              className="absolute top-0 left-0"
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {CARDS.map((card, i) => (
                <div
                  key={card.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                  style={{ zIndex: i, transformOrigin: "50% 100%" }}
                >
                  <CardFace card={card} eager={i === 0} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
