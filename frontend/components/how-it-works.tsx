import { ArrowRight } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Deposit Assets",
      description: "Connect your wallet and deposit your assets into our secure protocol.",
    },
    {
      number: "02",
      title: "Eigen Layer Staking",
      description: "Your assets are staked through Eigen layer's advanced staking mechanism.",
    },
    {
      number: "03",
      title: "Protection Activation",
      description: "Our protocol activates multiple layers of protection for your staked assets.",
    },
    {
      number: "04",
      title: "Yield Generation",
      description: "Your protected assets generate yield while maintaining security.",
    },
  ];

  return (
    <div className="relative py-24 bg-slate-50" id="how-it-works">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">Simple Process</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How SecureAssets Works</h2>
          <p className="text-slate-600 text-lg">
            Our streamlined process makes it easy to protect your assets while earning yield through Eigen layer staking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white border border-slate-200 rounded-xl p-6 h-full shadow-sm">
                <div className="text-4xl font-bold text-blue-200 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-slate-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="text-blue-500 size-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">Ready to experience the most secure asset protection protocol?</p>
          <div className="inline-block">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors">
              Start Protecting Your Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
