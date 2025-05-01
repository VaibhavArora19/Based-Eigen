import React from "react";

export function HowItWorksSection() {
  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-800" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 mb-4">
            Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
            How DefiShield Works
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 max-w-2xl mx-auto">
            A simple process to secure your DeFi investments
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-8">
          <StepCard 
            number="1"
            title="Deposit Funds"
            description="Connect with Privy and deposit your stablecoins into our protocol"
          />
          <StepCard 
            number="2"
            title="Earn Yield"
            description="Your funds are allocated to Aave V3 to generate yield while maintaining protection"
          />
          <StepCard 
            number="3"
            title="Submit Claims"
            description="If you experience a rug pull or hack, submit a claim with token details and evidence"
          />
          <StepCard 
            number="4"
            title="Receive Compensation"
            description="Approved claims receive compensation from the protocol's security layer"
          />
        </div>
      </div>
    </div>
  );
}

// Component for how it works steps
export const StepCard = ({ number, title, description }: { number: string; title: string; description: string }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-blue-500 dark:bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};