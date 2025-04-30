import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="relative size-8">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-sm opacity-70" />
                <div className="absolute inset-0.5 rounded-full bg-black" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600" />
              </div>
              <span className="font-bold text-xl">SecureAssets</span>
            </div>
            <p className="text-white/70 text-sm">
              Protecting digital assets with advanced Eigen layer staking technology.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-white/70 hover:text-white">
                <Twitter className="size-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white">
                <Github className="size-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white">
                <Linkedin className="size-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-white/70 hover:text-white">
                <Mail className="size-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Security
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Whitepaper
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Tutorials
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/70 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} SecureAssets Protocol. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="text-white/70 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-white/70 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
