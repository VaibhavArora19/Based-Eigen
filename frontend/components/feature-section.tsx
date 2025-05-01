import React from "react";

export function FeaturesSection() {
  return (
    <div className="py-20 bg-white dark:bg-slate-900" id="features">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 mb-4">
            Core Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-white">
            Protection and Yield in One Protocol
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg mt-4 max-w-2xl mx-auto">
            Our protocol combines the best of DeFi yield with a safety net for your investments
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="💰"
            title="Yield Generation"
            description="Deposit your stablecoins and earn competitive yield through Aave V3 integration while maintaining protection"
          />
          <FeatureCard 
            icon="🛡️"
            title="Claim Protection"
            description="Submit claims when projects experience rug pulls or hacks to potentially recover your funds"
          />
          <FeatureCard 
            icon="🔍"
            title="Verified Reviews"
            description="All claims are reviewed through a verification process powered by EigenLayer security"
          />
        </div>
      </div>
    </div>
  );
}

// Component for feature cards
export const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
};