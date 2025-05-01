import { Shield, Lock, TrendingUp, Zap, BarChart3, Globe2 } from "lucide-react";

export function FeatureSection() {
  const features = [
    {
      icon: <Shield className="size-10 text-blue-500" />,
      title: "Enhanced Security",
      description: "Multi-layered protection mechanisms safeguard your assets against potential threats and vulnerabilities.",
    },
    {
      icon: <Lock className="size-10 text-blue-500" />,
      title: "Eigen Layer Integration",
      description: "Leverage the power of Eigen layer staked assets to create a secure foundation for your funds.",
    },
    {
      icon: <TrendingUp className="size-10 text-green-500" />,
      title: "Optimized Yield",
      description: "Generate competitive returns on your assets while maintaining the highest security standards.",
    },
    {
      icon: <Zap className="size-10 text-amber-500" />,
      title: "Fast Transactions",
      description: "Experience lightning-fast transaction speeds without compromising on security or reliability.",
    },
    {
      icon: <BarChart3 className="size-10 text-red-500" />,
      title: "Real-time Analytics",
      description: "Monitor your assets and performance with comprehensive real-time analytics and insights.",
    },
    {
      icon: <Globe2 className="size-10 text-cyan-500" />,
      title: "Global Accessibility",
      description: "Access your protected assets from anywhere in the world with our decentralized infrastructure.",
    },
  ];

  return (
    <div className="relative py-24" id="features">
      <div className="absolute inset-0 bg-gradient-radial from-blue-50 to-transparent opacity-70" />
      <div className="container px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 mb-4">Key Features</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Protecting Your Assets with Advanced Technology</h2>
          <p className="text-slate-600 text-lg">
            Our protocol combines cutting-edge security features with Eigen layer technology to provide comprehensive protection for your digital
            assets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow group">
              <div className="mb-4 p-3 rounded-lg bg-slate-50 inline-block">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
