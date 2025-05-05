import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StakeForm } from "@/components/stake/stake-form";
import { StakeAndDelegateForm } from "@/components/stake/stake-and-delegate-form";
import { StakingInfo } from "@/components/stake/staking-info";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Info, Shield, TrendingUp, Coins, Users, Wallet } from "lucide-react";

export default function StakePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-white">
      <Header />

      <main className="container px-4 md:px-6 py-12 mt-24">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">Stake Your Assets</h1>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Secure your digital assets and earn rewards by staking with EigenLayer's decentralized security protocol
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Easy Staking</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Stake your assets with just a few clicks. Simple and secure process.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Earn Rewards</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Get competitive APY rates while contributing to network security.</p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-slate-900 dark:text-white">Choose Operators</h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">Select from trusted operators for enhanced staking strategies.</p>
            </div>
          </div>

          {/* Main Staking Interface */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="border-b border-slate-200 dark:border-slate-700 p-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Choose Your Staking Method</h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Select how you want to stake your assets</p>
                </div>
                
                <Tabs defaultValue="stake" className="w-full">
                  <TabsList className="w-full h-auto flex gap-4 p-6 bg-transparent border-b border-slate-200 dark:border-slate-700">
                    <TabsTrigger 
                      value="stake" 
                      className="flex-1 flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all"
                    >
                      <Coins className="w-5 h-5" />
                      <span className="font-medium">Simple Stake</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Basic staking functionality</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="delegate"
                      className="flex-1 flex flex-col items-center gap-2 p-4 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg data-[state=active]:border-blue-500 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20 data-[state=active]:text-blue-600 dark:data-[state=active]:text-blue-400 transition-all"
                    >
                      <Users className="w-5 h-5" />
                      <span className="font-medium">Stake & Delegate</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">Advanced staking with delegation</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="stake" className="mt-0">
                    <div className="p-6">
                      <StakeForm />
                    </div>
                  </TabsContent>

                  <TabsContent value="delegate" className="mt-0">
                    <div className="p-6">
                      <StakeAndDelegateForm />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              {/* How It Works Section */}
              <div className="mt-8 bg-blue-50 dark:bg-blue-900/10 rounded-xl p-6 border border-blue-100 dark:border-blue-900/30">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">How Staking Works</h3>
                    <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                        <span>Select the amount of tokens you want to stake</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                        <span>Choose between simple staking or staking with delegation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></span>
                        <span>Confirm the transaction and start earning rewards</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="sticky top-32">
                <StakingInfo />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}