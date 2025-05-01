import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative size-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-sm opacity-70" />
                <div className="absolute inset-0.5 rounded-full bg-white" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
              </div>
              <span className="font-bold text-xl">SecureAssets</span>
            </div>
            <p className="text-slate-600 text-sm">Protecting digital assets with advanced Eigen layer staking technology.</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-500 hover:text-slate-900">
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900">
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900">
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-slate-500 hover:text-slate-900">
                <Mail className="size-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-slate-600 hover:text-slate-900 text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} SecureAssets Protocol. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-slate-500 hover:text-slate-900 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-slate-500 hover:text-slate-900 text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
