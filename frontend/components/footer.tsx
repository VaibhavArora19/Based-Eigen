import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative size-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-sm opacity-70" />
                <div className="absolute inset-0.5 rounded-full bg-white dark:bg-slate-900" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">DefiShield</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Protecting DeFi investments with claim resolution backed by EigenLayer security.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors">
                <Mail className="size-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Protocol</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Claim Process
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  EigenLayer AVS
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-slate-900 dark:text-white">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Discord
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Report an Issue
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">© {new Date().getFullYear()} DefiShield Protocol. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}