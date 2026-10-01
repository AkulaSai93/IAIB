"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import brandLogo from "../../public/images/logo-upgrad-iaib.png";

/** Logical card size; the canvas is drawn at 2x this for crisp export. */
const W = 660;
const H = 1000;
const EXPORT_SCALE = 2;

/** TODO: point at the real dashboard once it exists. */
const REFERRAL_BASE = "https://ai.buildathon.com/dashboard";

function makeCode(name: string) {
  const initials = name.trim().slice(0, 2).toUpperCase().padEnd(2, "X");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${initials}${rand}`;
}

/**
 * Paints the member card. Drawn straight to canvas (rather than rasterising
 * DOM) so what's on screen is exactly what downloads.
 */
function drawCard(ctx: CanvasRenderingContext2D, name: string) {
  ctx.save();
  ctx.clearRect(0, 0, W, H);

  // card body
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 26);
  ctx.clip();
  ctx.fillStyle = "#0b0b0c";
  ctx.fillRect(0, 0, W, H);

  // ---- artwork: a glowing plaza seen from above ----
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 84, W, 600);
  ctx.clip();

  const cx = W / 2;
  const cy = 384;

  const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 340);
  glow.addColorStop(0, "rgba(255,72,48,0.55)");
  glow.addColorStop(0.45, "rgba(180,26,14,0.22)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 84, W, 600);

  // concentric roadways
  for (let i = 1; i <= 5; i++) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, 58 * i, 34 * i, 0, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255,86,56,${0.3 - i * 0.045})`;
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // blocks around the ring
  const blocks = 14;
  for (let i = 0; i < blocks; i++) {
    const a = (i / blocks) * Math.PI * 2 + 0.25;
    const rx = 120 + (i % 3) * 52;
    const ry = 70 + (i % 3) * 30;
    const bx = cx + Math.cos(a) * rx;
    const by = cy + Math.sin(a) * ry;
    const bw = 44 + (i % 4) * 16;
    const bh = 20 + (i % 3) * 10;

    ctx.save();
    ctx.translate(bx, by);
    ctx.rotate(a + Math.PI / 2);
    ctx.beginPath();
    ctx.roundRect(-bw / 2, -bh / 2, bw, bh, 4);
    ctx.fillStyle = "#141416";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,90,60,0.5)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // lit edge
    ctx.beginPath();
    ctx.moveTo(-bw / 2 + 3, bh / 2 - 2);
    ctx.lineTo(bw / 2 - 3, bh / 2 - 2);
    ctx.strokeStyle = "rgba(255,120,80,0.85)";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  // the monolith at the centre
  ctx.beginPath();
  ctx.roundRect(cx - 46, cy - 52, 92, 92, 8);
  ctx.fillStyle = "#17171a";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,90,60,0.7)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.roundRect(cx - 18, cy - 24, 36, 36, 5);
  ctx.fillStyle = "#ff3b21";
  ctx.shadowColor = "rgba(255,60,32,0.9)";
  ctx.shadowBlur = 34;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.restore();

  // fade the artwork into the card
  const fade = ctx.createLinearGradient(0, 470, 0, 700);
  fade.addColorStop(0, "rgba(11,11,12,0)");
  fade.addColorStop(1, "#0b0b0c");
  ctx.fillStyle = fade;
  ctx.fillRect(0, 470, W, 230);

  // ---- type ----
  ctx.textBaseline = "alphabetic";
  ctx.letterSpacing = "2.5px";
  ctx.font = '500 17px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillText("BUILDATHON MEMBER", 44, 62);

  ctx.letterSpacing = "0px";
  ctx.font = '700 86px Helvetica, Arial, sans-serif';
  ctx.fillStyle = "#ffffff";
  ctx.fillText(name.trim().split(" ")[0].toUpperCase().slice(0, 12), 44, 806);

  ctx.font = '400 22px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillStyle = "rgba(255,255,255,0.74)";
  ctx.fillText("You're officially in.", 44, 846);
  ctx.fillText("Welcome to the AI Buildathon.", 44, 878);

  ctx.letterSpacing = "2px";
  ctx.font = '500 15px "Bricolage Grotesque", system-ui, sans-serif';
  ctx.fillStyle = "rgba(255,255,255,0.62)";
  ctx.fillText("AI BUILDATHON", 44, 952);

  const tail = ["BUILD", "THINK", "CREATE"];
  const widths = tail.map((t) => ctx.measureText(t).width);
  const dot = 20;
  const totalW = widths.reduce((a, b) => a + b, 0) + dot * 2;
  let x = W - 44 - totalW;
  tail.forEach((t, i) => {
    ctx.fillStyle = "rgba(255,255,255,0.62)";
    ctx.fillText(t, x, 952);
    x += widths[i];
    if (i < 2) {
      ctx.beginPath();
      ctx.arc(x + dot / 2, 947, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#ff3b21";
      ctx.fill();
      x += dot;
    }
  });
  ctx.letterSpacing = "0px";
  ctx.restore();
}

export default function MemberCard({
  name,
  onClose,
}: {
  name: string;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [code] = useState(() => makeCode(name));
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  const url = `${REFERRAL_BASE}?ref=${code}`;
  const shareText = `I'm in for the IAIB Ignite AI Buildathon! Join me:`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paint = () => {
      canvas.width = W * EXPORT_SCALE;
      canvas.height = H * EXPORT_SCALE;
      ctx.setTransform(EXPORT_SCALE, 0, 0, EXPORT_SCALE, 0, 0);
      drawCard(ctx, name);
    };

    paint();
    // repaint once the brand fonts land, or the card renders in a fallback
    void document.fonts.ready.then(paint);
  }, [name]);

  const toBlob = useCallback(
    () =>
      new Promise<Blob | null>((resolve) =>
        canvasRef.current?.toBlob(resolve, "image/png"),
      ),
    [],
  );

  const download = useCallback(async () => {
    const blob = await toBlob();
    if (!blob) return;
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `iaib-member-${code}.png`;
    a.click();
    URL.revokeObjectURL(href);
  }, [toBlob, code]);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setNote("Couldn't copy — select the link and copy it manually.");
    }
  }, [url]);

  /* Instagram has no web share target, so offer the system sheet (which
     lists Instagram on mobile) and fall back to downloading the image. */
  const shareToInstagram = useCallback(async () => {
    const blob = await toBlob();
    const file = blob
      ? new File([blob], `iaib-member-${code}.png`, { type: "image/png" })
      : null;

    if (file && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], text: `${shareText} ${url}` });
        return;
      } catch {
        /* dismissed — fall through to the download */
      }
    }
    await download();
    setNote("Card saved. Instagram has no web share link, so post it from your gallery.");
  }, [toBlob, code, download, shareText, url]);

  return (
    <div className="flex flex-col items-center gap-6 py-2">
      <Image
        src={brandLogo}
        alt="upGrad School of Technology x IAIB"
        width={167}
        height={32}
        className="h-[30px] w-auto object-contain"
      />

      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Buildathon member card for ${name}`}
        className="w-full max-w-[300px] rounded-[18px]"
        style={{ aspectRatio: `${W} / ${H}` }}
      />

      <div className="w-full">
        <p className="text-center font-ui text-[19px] font-bold text-ink">
          Refer to earn points
        </p>

        <div className="mt-3 flex items-center gap-2.5">
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-black/[0.055] py-3 pr-2 pl-4">
            <span className="min-w-0 flex-1 truncate font-display text-[14px] text-ink/80">
              {url}
            </span>
            <button
              type="button"
              onClick={() => void copy()}
              aria-label="Copy referral link"
              className="grid size-8 shrink-0 place-items-center rounded-full text-ink/60 transition-colors hover:bg-black/10 hover:text-ink"
            >
              {copied ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path d="M3 8.5l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <rect x="5.5" y="5.5" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10.5 3.5h-6a2 2 0 00-2 2v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => void download()}
            aria-label="Download card"
            className="grid size-[46px] shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-black"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M10 3v9m0 0l-3.5-3.5M10 12l3.5-3.5M4 15.5h12" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {copied && (
          <p className="mt-2 text-center font-display text-[13px] text-brand">
            Link copied
          </p>
        )}

        <div className="mt-5 flex items-center justify-center gap-2.5">
          <ShareLink
            label="WhatsApp"
            href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`}
            bg="#25D366"
          >
            <path d="M12 2a10 10 0 00-8.6 15L2 22l5.2-1.4A10 10 0 1012 2zm5.1 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1-.4-.1-.9-.3-1.5-.6-2.6-1.1-4.3-3.8-4.4-4-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2.1.4 0 .5l-.3.5-.3.3c-.1.1-.2.3 0 .5.2.3.7 1.1 1.4 1.8.9.8 1.7 1.1 1.9 1.2.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.2.1.6 0 1z" />
          </ShareLink>
          <ShareLink
            label="LinkedIn"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
            bg="#0A66C2"
          >
            <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.82-2.05 3.75-2.05C21.4 8.65 22 11 22 14.1V21h-4v-6.1c0-1.45-.03-3.3-2-3.3-2 0-2.3 1.57-2.3 3.2V21h-4z" />
          </ShareLink>
          <button
            type="button"
            onClick={() => void shareToInstagram()}
            aria-label="Share to Instagram"
            className="grid size-11 place-items-center rounded-full text-white transition-transform hover:scale-105"
            style={{
              background:
                "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
            }}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.56.22.96.48 1.38.9.42.42.68.82.9 1.38.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42a3.8 3.8 0 01-1.38-.9 3.8 3.8 0 01-.9-1.38c-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2zm0 3.1a6.7 6.7 0 100 13.4 6.7 6.7 0 000-13.4zm0 11a4.3 4.3 0 110-8.6 4.3 4.3 0 010 8.6zm8.5-11.3a1.57 1.57 0 11-3.14 0 1.57 1.57 0 013.14 0z" />
            </svg>
          </button>
        </div>

        {note && (
          <p className="mt-3 text-center font-display text-[13px] text-ink/60">{note}</p>
        )}

        <Link
          href="/dashboard"
          className="mt-6 flex w-full items-center justify-center rounded-[10px] bg-brand px-6 py-3.5 font-ui text-[17px] text-white transition-colors hover:bg-black"
        >
          Go to your dashboard &rarr;
        </Link>
        <button
          type="button"
          onClick={onClose}
          className="mx-auto mt-2 block rounded-[8px] px-5 py-2 font-display text-[14px] text-ink/50 transition-colors hover:bg-black/5 hover:text-ink"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}

function ShareLink({
  label,
  href,
  bg,
  children,
}: {
  label: string;
  href: string;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${label}`}
      className="grid size-11 place-items-center rounded-full text-white transition-transform hover:scale-105"
      style={{ background: bg }}
    >
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        {children}
      </svg>
    </a>
  );
}
