import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, TrendingUp, Clock, AlertCircle } from "lucide-react";

export function StakingInfo() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Staking Benefits</CardTitle>
          <CardDescription>Why stake with SecureAssets</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Enhanced Security</h4>
              <p className="text-xs text-slate-500">Your assets are protected by Eigen layer's advanced security protocols</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Competitive Yields</h4>
              <p className="text-xs text-slate-500">Earn up to 7% APY when staking and delegating to operators</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium">Flexible Durations</h4>
              <p className="text-xs text-slate-500">Choose staking periods from 7 days to 1 year to suit your needs</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Staking vs. Delegating</CardTitle>
          <CardDescription>Understanding your options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-medium mb-1">Staking</h4>
            <p className="text-slate-600 text-xs">
              Simple staking secures your assets and earns basic rewards. You maintain full control of your assets.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-1">Staking & Delegating</h4>
            <p className="text-slate-600 text-xs">
              Delegate your staked assets to trusted operators to earn higher rewards. Operators help secure the network and share rewards with you.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-amber-50 border-amber-100">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600" />
            <CardTitle className="text-amber-800">Important Notice</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-amber-800">
          <p>
            Staking involves locking your assets for the selected duration. Early unstaking may result in penalties. Always research operators before
            delegating your assets.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
