"use client"

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";

export function CallToActionSection() {
  const { login } = usePrivy();
  
  return (
    <div className="relative py-24 overflow-hidden bg-gradient-to-b from-white to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">
          Ready to protect your DeFi investments?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto mb-8">
          Join our protocol today to earn yield while gaining protection against rug pulls and hacks through EigenLayer's security infrastructure.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white"
            onClick={login}
          >
            Connect & Get Started
          </Button>
          <Button size="lg" variant="outline" className="dark:border-slate-600 dark:text-slate-300">
            Read Documentation
          </Button>
        </div>
      </div>
    </div>
  );
}