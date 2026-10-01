import CurriculumSection from "@/components/curriculum-section";
import FaqSection from "@/components/faq-section";
import HeroSection from "@/components/hero-section";
import { RegisterProvider } from "@/components/register-flow";
import HowItWorksSection from "@/components/how-it-works-section";
import MarqueeStrip from "@/components/marquee-strip";
import MentorsSection from "@/components/mentors-section";
import SchoolsSection from "@/components/schools-section";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import VideoSection from "@/components/video-section";
import WhyIaibSection from "@/components/why-iaib-section";

export default function Home() {
  return (
    <RegisterProvider>
      <main className="min-h-screen bg-canvas">
        <SiteHeader />
        <HeroSection />
        <MarqueeStrip />
        <WhyIaibSection />
        <VideoSection />
        <HowItWorksSection />
        <CurriculumSection />
        <MentorsSection />
        <SchoolsSection />
        <FaqSection />
        <SiteFooter />
      </main>
    </RegisterProvider>
  );
}
