import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export function StakingHeader() {
  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70" />
            <div className="absolute inset-0.5 rounded-full bg-white dark:bg-slate-900" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">DefiShield</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/stake" className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            Stake
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
            Docs
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
            Connect Wallet
          </Button>
        </div>
      </div>
    </header>
  );
}