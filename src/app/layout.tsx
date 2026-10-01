import type { Metadata } from "next";
import {
  Archivo,
  Bricolage_Grotesque,
  Caveat,
  Courier_Prime,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

// Stand-in for the heavy condensed face used in the hero lockup artwork.
// The wdth axis is what lets the letters narrow without thinning their stems.
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

// Stand-in for Bradley Hand, which isn't a web font.
const caveat = Caveat({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-caveat",
  display: "swap",
});

// Serifed typewriter face for the code stickers.
const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-courier-prime",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IAIB — Ignite AI Buildathon",
  description:
    "India's Largest AI Talent Discovery and Development Platform. IAIB identifies, nurtures and facilitates school students from classes 9th till 12th in learning about AI.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // The next/font variables must land on :root — @theme resolves
    // var(--font-*) at declaration time, not at point of use.
    <html
      lang="en"
      className={`${bricolage.variable} ${spaceGrotesk.variable} ${archivo.variable} ${caveat.variable} ${courierPrime.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
