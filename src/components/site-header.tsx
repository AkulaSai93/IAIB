import Image from "next/image";
import Link from "next/link";

import CtaButton from "@/components/cta-button";

import logo from "../../public/images/logo-upgrad-iaib.png";

const NAV_LINKS = [
  { label: "Why IAIB?", href: "#why-iaib" },
  { label: "Curriculum", href: "#curriculum" },
  { label: "Mentor", href: "#mentor" },
  { label: "FAQs", href: "#faqs" },
];

export default function SiteHeader() {
  return (
    <header className="w-full border-b border-hairline bg-white">
      {/*
        The design centres the logo + nav as a single cluster with a fixed
        153px gap rather than spreading them to the frame edges; below lg the
        cluster gives way to an edge-to-edge bar.
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

          <div className="flex min-w-0 shrink items-center gap-3 sm:gap-6">
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

            <CtaButton variant="sm">
              Sign Up
            </CtaButton>
          </div>
        </div>
      </div>
    </header>
  );
}
