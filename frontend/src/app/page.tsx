import Footer from "~/components/landing/footer";
import AboutUsSection from "~/components/landing/sections/about-us-section";
import HeroSection from "~/components/landing/sections/hero-section";
import PricingSection from "~/components/landing/sections/pricing-section";
import StepsSection from "~/components/landing/sections/steps-section";
import Background from "~/components/layouts/background";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <main className="py-4">
        <AboutUsSection />
        <PricingSection />
        <StepsSection />
      </main>
      <Footer />
      <Background />
    </>
  );
}
