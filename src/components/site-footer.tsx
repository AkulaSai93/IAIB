import Image from "next/image";
import Link from "next/link";

import DotWave from "@/components/dot-wave";
import Reveal from "@/components/reveal";
import brandLogo from "../../public/images/logo-upgrad-iaib.png";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4";

/**
 * Closing footer: the hand plate full-bleed, a dot-wave overlay, and the
 * wordmark sitting on a white fade-up at the bottom.
 */
export default function SiteFooter() {
  return (
    <footer
      id="footer"
      className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden bg-white"
    >
      {/* plate */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video
          className="h-full w-full object-cover"
          src={VIDEO_SRC}
          poster="/images/footer-bg.png"
          autoPlay
          muted
          playsInline
          loop
          aria-hidden
        />
      </div>

      {/* interactive dot field, reacting to the pointer */}
      <DotWave className="pointer-events-none absolute inset-0 z-10 h-full w-full" />

      <div
        className="relative z-30 flex w-full flex-col gap-8 px-5 pt-[120px] pb-8 md:flex-row md:items-end md:justify-between md:px-[60px] md:pt-[173.8px] md:pb-12"
        style={{
          background:
            "linear-gradient(to top, #ffffff 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
        }}
      >
        <Reveal className="flex flex-col items-start gap-4">
          <Image
            src={brandLogo}
            alt="upGrad School of Technology x IAIB"
            width={334}
            height={63}
            className="h-[38px] w-auto object-contain md:h-[54px]"
          />
          <p className="font-display text-[clamp(1.9rem,6.6vw,83.16px)] leading-[1] font-light tracking-[-0.03em] whitespace-nowrap text-black">
            IGNITE <span className="text-brand">AI</span> BUILDATHON
          </p>
        </Reveal>

        <Reveal
          delay={120}
          className="flex items-center justify-start gap-3 md:justify-end"
        >
          <Link
            href="#privacy"
            className="font-display text-[13px] whitespace-nowrap text-[#202020] hover:underline"
          >
            Privacy Policy
          </Link>
          <span aria-hidden className="h-[18px] w-px bg-[#202020]/40" />
          <Link
            href="#terms"
            className="font-display text-[13px] whitespace-nowrap text-[#202020] hover:underline"
          >
            Terms &amp; Conditions
          </Link>
        </Reveal>
      </div>
    </footer>
  );
}
