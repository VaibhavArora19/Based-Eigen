import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StakeForm } from "@/components/stake/stake-form";
import { StakeAndDelegateForm } from "@/components/stake/stake-and-delegate-form";
import { StakingInfo } from "@/components/stake/staking-info";
import { StakingHeader } from "@/components/stake/staking-header";

export default function StakePage() {
  return (
    <div className="min-h-screen bg-white">
      <StakingHeader />

      <main className="container px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Stake Your Assets</h1>
            <p className="text-slate-600">Secure your assets and earn rewards by staking with Eigen layer technology</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Tabs defaultValue="stake" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="stake">Stake</TabsTrigger>
                  <TabsTrigger value="delegate">Stake & Delegate</TabsTrigger>
                </TabsList>

                <TabsContent value="stake" className="mt-0">
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                    <StakeForm />
                  </div>
                </TabsContent>

                <TabsContent value="delegate" className="mt-0">
                  <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                    <StakeAndDelegateForm />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div>
              <StakingInfo />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
