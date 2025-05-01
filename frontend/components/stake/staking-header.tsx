import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function StakingHeader() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-sm opacity-70" />
            <div className="absolute inset-0.5 rounded-full bg-white" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
          </div>
          <span className="font-bold text-xl">SecureAssets</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Home
          </Link>
          <Link href="/stake" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
            Stake
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Dashboard
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}
