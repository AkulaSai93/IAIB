import Image from "next/image";
import Link from "next/link";

import blocks from "../../public/images/footer/buildathon-blocks.png";

/*
 * Figma 258:19832 — yellow panel, wordmark and socials on the left, the
 * isometric BUILDATHON blocks on the right.
 *
 * TODO: the four social links point nowhere yet; swap in the real handles.
 */
const SOCIALS = [
  { label: "LinkedIn", icon: "/images/footer/social-1.svg", href: "#" },
  { label: "Facebook", icon: "/images/footer/social-2.svg", href: "#" },
  { label: "Instagram", icon: "/images/footer/social-3.svg", href: "#" },
  { label: "YouTube", icon: "/images/footer/social-4.svg", href: "#" },
];

export default function SiteFooter() {
  return (
    <footer className="mt-auto bg-canvas px-5 pb-6 lg:px-0 lg:pb-0">
      <div
        className="relative overflow-hidden border-black bg-[#ffdc69]"
        style={{ borderStyle: "solid", borderWidth: "3px 12px 12px 3px" }}
      >
        <div className="relative z-10 flex flex-col gap-10 px-7 py-10 sm:px-12 lg:px-[77px] lg:py-[77px]">
          <div className="flex flex-col gap-7 lg:max-w-[522px] lg:gap-10">
            <p className="font-ui text-[40px] leading-[1.06] font-bold text-[#111] sm:text-[58px] lg:text-[76px]">
              IGNITE AI BUILDATHON
            </p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <p className="font-display text-[16px] font-medium text-[#111] sm:text-[18px]">
                Follow us on
              </p>
              <ul className="flex items-center gap-3">
                {SOCIALS.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="grid size-10 place-items-center bg-[#111] transition-colors hover:bg-brand"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.icon} alt="" width={20} height={20} aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* the blocks sit alongside on desktop, under the wordmark on mobile */}
          <Image
            src={blocks}
            alt=""
            aria-hidden
            sizes="(max-width: 1023px) 92vw, 634px"
            className="h-auto w-full max-w-[520px] self-center lg:absolute lg:top-[125px] lg:left-[753px] lg:w-[634px] lg:max-w-none lg:self-auto"
          />

          <div className="flex items-center gap-4 lg:mt-[106px]">
            <Link
              href="#"
              className="font-display text-[15px] font-medium text-[#111] underline-offset-2 hover:underline sm:text-[18px]"
            >
              Privacy Policy
            </Link>
            <span aria-hidden className="h-[23px] w-px bg-black/35" />
            <Link
              href="#"
              className="font-display text-[15px] font-medium text-[#111] underline-offset-2 hover:underline sm:text-[18px]"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
