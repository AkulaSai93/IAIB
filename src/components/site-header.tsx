"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import CtaButton from "@/components/cta-button";

import logo from "../../public/images/logo-upgrad-iaib.png";

const NAV_LINKS = [
  { label: "Why IAIB?", href: "#why-iaib" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQs", href: "#faqs" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  // close the menu if the viewport grows past the breakpoint while it is open
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-hairline bg-white/95 backdrop-blur-[6px]">
      {/*
        The design centres the logo + nav as a single cluster with a fixed
        153px gap rather than spreading them to the frame edges; below lg the
        cluster gives way to an edge-to-edge bar, and below md the links move
        into a dropdown so they stay reachable on a phone.
      */}
      <div className="flex justify-center px-5 py-5">
        <div className="flex w-full max-w-[1472px] items-center justify-between gap-6 lg:w-auto lg:justify-center lg:gap-[153px]">
          <Link href="/" aria-label="upGrad x IAIB — home" className="shrink-0">
            <Image
              src={logo}
              alt="upGrad School of Technology x IAIB"
              width={165}
              height={31}
              priority
              className="h-[24px] w-[127px] object-contain sm:h-[31px] sm:w-[164.477px]"
            />
          </Link>

          <div className="flex min-w-0 shrink items-center gap-2 sm:gap-6">
            <nav
              aria-label="Primary"
              className="hidden items-center gap-10 font-ui text-[16px] whitespace-nowrap text-muted md:flex"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <CtaButton>Register Now</CtaButton>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 shrink-0 place-items-center rounded-[8px] text-ink transition-colors hover:bg-black/5 md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                {open ? (
                  <path
                    d="M5 5l10 10M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M3 6h14M3 10h14M3 14h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t border-hairline bg-white px-5 pt-1 pb-3 md:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 font-ui text-[16px] text-ink transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
