import { TrendingUp, Shield, Wallet, Info } from "lucide-react";

export function StakingInfo() {
  return (
    <div className="space-y-6">
      {/* APY Card - Fixed to prevent twitching */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl shadow-sm border border-green-200 dark:border-green-900/30 p-6 will-change-auto transition-colors duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">Current APY</h3>
          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div className="text-4xl font-bold text-green-900 dark:text-green-400 mb-2">
          12.5%
        </div>
        <p className="text-sm text-green-700 dark:text-green-300">
          Estimated annual percentage yield
        </p>
      </div>

      {/* Staking Stats */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Staking Statistics</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <div className="flex items-center gap-3">
              <Wallet className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Total Value Locked</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">$125.6M</span>
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-slate-100 dark:border-slate-700 last:border-0">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Delegators</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">8,342</span>
          </div>
          
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Your Staked</span>
            </div>
            <span className="text-sm font-semibold text-slate-900 dark:text-white">Connect Wallet</span>
          </div>
        </div>
      </div>

      {/* Security Info */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-400 mb-1">Staking Safety</h4>
            <p className="text-sm text-blue-800 dark:text-blue-300">
              Your assets are secured by EigenLayer's smart contracts and undergo regular security audits.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h3>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">View Staking History</span>
            <span className="text-slate-400 dark:text-slate-500">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Manage Delegation</span>
            <span className="text-slate-400 dark:text-slate-500">→</span>
          </button>
          
          <button className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Claim Rewards</span>
            <span className="text-slate-400 dark:text-slate-500">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}