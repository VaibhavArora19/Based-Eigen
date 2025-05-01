import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/globe";
import { HeroSection } from "@/components/hero-section";
import { FeatureSection } from "@/components/feature-section";
import { HowItWorks } from "@/components/how-it-works";
import { Partners } from "@/components/partners";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative size-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-sm opacity-70" />
              <div className="absolute inset-0.5 rounded-full bg-white" />
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
            </div>
            <span className="font-bold text-xl">SecureAssets</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              How It Works
            </Link>
            <Link href="#security" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Security
            </Link>
            <Link href="#partners" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Partners
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button>Launch App</Button>
            <Button variant="outline" className="hidden md:inline-flex">
              Documentation
            </Button>
          </div>
        </div>
      </header>

      <HeroSection />

      <FeatureSection />

      <div className="relative py-24 overflow-hidden" id="security">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">Advanced Security</div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">Your assets, protected by Eigen layer technology</h2>
              <p className="text-slate-600 text-lg">
                Our protocol leverages Eigen layer's staked assets to create a secure environment for your funds. With multiple layers of protection
                and real-time monitoring, your assets remain safe while still generating yield.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button>Explore Security Features</Button>
                <Button variant="outline">Security Audits</Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md aspect-square">
                <Globe />
              </div>
            </div>
          </div>
        </div>
      </div>

      <HowItWorks />

      <Partners />

      <div className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent to-blue-50">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to secure your assets?</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users who trust our protocol to protect their funds while earning yield through Eigen layer staked assets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">Get Started Now</Button>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
