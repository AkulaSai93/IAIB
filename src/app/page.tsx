import CurriculumSection from "@/components/curriculum-section";
import DinoGameSection from "@/components/dino-game-section";
import FaqSection from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import { RegisterProvider } from "@/components/register-flow";
import HowItWorksSection from "@/components/how-it-works-section";
import MentorsSection from "@/components/mentors-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import WhyIaibSection from "@/components/why-iaib-section";

export default function Home() {
  return (
    <RegisterProvider>
      <main className="min-h-screen bg-canvas">
        <SiteHeader />
        <HeroSection />
        <WhyIaibSection />
        <HowItWorksSection />
        <CurriculumSection />
        <MentorsSection />
        <DinoGameSection />
        <FaqSection />
        <SiteFooter />
      </main>
    </RegisterProvider>
  );
}
