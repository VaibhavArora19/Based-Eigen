"use client"

import { Button } from "@/components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { Shield } from "lucide-react";

export function HeroSection() {
  const { login } = usePrivy();
  
  return (
    <div className="pt-32 pb-20 md:pt-40 md:pb-28 w-full dark:bg-slate-900 dark:text-white" id="hero">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300">
              DeFi Protection Protocol
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight dark:text-white">
              Secure your DeFi investments with decentralized claims resolution
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              DefiShield is a protocol that offers protection against rug pulls and hacks in DeFi. Earn yield on your deposits while having a safety net backed by EigenLayer-secured verification.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white" size="lg" onClick={login}>
                Connect & Deposit
              </Button>
              <Button variant="outline" size="lg" className="dark:border-slate-600 dark:text-slate-300">
                Learn More
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <ShieldAnimation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder for shield animation
export const ShieldAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-600 blur-xl opacity-20 animate-pulse" />
        <Shield size={200} className="text-blue-500 dark:text-blue-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-purple-500 dark:bg-purple-600 opacity-70 blur-sm animate-ping" />
      </div>
    </div>
  );
};