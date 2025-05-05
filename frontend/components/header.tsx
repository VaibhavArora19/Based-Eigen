"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePrivy } from "@privy-io/react-auth";
import { Menu, X, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const { login, authenticated, logout, user } = usePrivy();
  const [showWalletMenu, setShowWalletMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Function to format wallet address
  const formatWalletAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Get wallet address if authenticated
  const walletAddress = user?.wallet?.address || "";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative size-8">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70" />
            <div className="absolute inset-0.5 rounded-full bg-white dark:bg-slate-900" />
            <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
          <span className="font-bold text-xl text-slate-900 dark:text-white">DefiShield</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <div
            onClick={() => router.push("/deposit")}
            className="text-sm cursor-pointer font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Deposit
          </div>
          <div
            onClick={() => router.push("/stake")}
            className="text-sm cursor-pointer font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            Stake
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-900 dark:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />

          {!authenticated ? (
            <Button onClick={login} className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white">
              Connect Wallet
            </Button>
          ) : (
            <div className="relative">
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white flex items-center gap-2"
                onClick={() => setShowWalletMenu(!showWalletMenu)}
              >
                {formatWalletAddress(walletAddress)}
                <ChevronDown className="h-4 w-4" />
              </Button>

              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                  <div className="p-2">
                    <div className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">
                      <div className="font-medium">Connected Wallet</div>
                      <div className="truncate">{walletAddress}</div>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      Disconnect Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link
                href="#security"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Security
              </Link>

              <div className="pt-2 flex flex-col space-y-3">
                <ThemeToggle />

                {!authenticated ? (
                  <Button
                    onClick={() => {
                      login();
                      setMobileMenuOpen(false);
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white w-full"
                  >
                    Connect Wallet
                  </Button>
                ) : (
                  <>
                    <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 pb-2">
                      <div className="font-medium">Connected Wallet</div>
                      <div className="truncate">{formatWalletAddress(walletAddress)}</div>
                    </div>
                    <a
                      href="/app"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white flex items-center justify-center rounded-md px-4 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Launch App
                    </a>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/30 rounded-md"
                    >
                      <LogOut className="h-4 w-4" />
                      Disconnect Wallet
                    </button>
                  </>
                )}

                <Button variant="outline" className="border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 w-full">
                  Documentation
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
