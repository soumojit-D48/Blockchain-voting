import CustomCursor from "@/components/landing-components/CustomCursor";
import NavBar from "@/components/NavBar/NavBar";
import HeroSection from "@/components/landing-components/HeroSection";
import FeaturesSection from "@/components/landing-components/FeaturesSection";
import HowItWorksSection from "@/components/landing-components/HowItWorksSection";
import DataFunnelSection from "@/components/landing-components/DataFunnelSection";
import DemoVideoSection from "@/components/landing-components/DemoVideoSection";
import TransparencySection from "@/components/landing-components/TransparencySection";
import UseCasesSection from "@/components/landing-components/UseCasesSection";
import DashboardSection from "@/components/landing-components/DashboardSection";
import TechStackSection from "@/components/landing-components/TechStackSection";
import FAQSection from "@/components/landing-components/FAQSection";
import FinalCTASection from "@/components/landing-components/FinalCTASection";

export default function LandingPage() {
  return (
    <div
      className="relative"
      style={{ background: "#0A0A0A", fontFamily: "'Syne', sans-serif" }}
    >
      <CustomCursor />
      <NavBar />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <DataFunnelSection />
      <DemoVideoSection />
      <TransparencySection />
      <UseCasesSection />
      <DashboardSection />
      <TechStackSection />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
}
