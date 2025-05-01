import { Button } from "@/components/ui/button";

export function SecuritySection() {
  return (
    <div className="relative py-24 overflow-hidden dark:bg-slate-900" id="security">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6">
            <div className="inline-block rounded-lg bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm text-blue-700 dark:text-blue-300 mb-4">
              Advanced Security
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight dark:text-white">
              Protected by EigenLayer technology
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg">
              Our protocol uses EigenLayer's restaking mechanisms and Actively Validated Services (AVS) to create a decentralized claim review process backed by real economic security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white">
                Explore Security Features
              </Button>
              <Button variant="outline" className="dark:border-slate-600 dark:text-slate-300">
                Security Audits
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <EigenLayerVisualization />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder for EigenLayer visualization
export const EigenLayerVisualization = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900/50 rounded-full animate-pulse" />
        <div className="absolute inset-8 bg-blue-200 dark:bg-blue-800/50 rounded-full animate-pulse" style={{ animationDelay: "300ms" }} />
        <div className="absolute inset-16 bg-blue-300 dark:bg-blue-700/50 rounded-full animate-pulse" style={{ animationDelay: "600ms" }} />
        <div className="absolute inset-24 bg-blue-400 dark:bg-blue-600/50 rounded-full animate-pulse" style={{ animationDelay: "900ms" }} />
        <div className="absolute inset-32 bg-blue-500 dark:bg-blue-500/50 rounded-full animate-pulse" style={{ animationDelay: "1200ms" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold">
          AVS
        </div>
      </div>
    </div>
  );
};