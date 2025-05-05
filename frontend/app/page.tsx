"use client"

import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/feature-section";
import { HowItWorksSection } from "@/components/how-it-works";
import { SecuritySection } from "@/components/security-section";
import { CallToActionSection } from "@/components/call-to-action";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white overflow-hidden">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SecuritySection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}