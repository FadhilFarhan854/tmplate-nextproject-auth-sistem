"use client"

import Link from "next/link"
import { Heart, Facebook, Twitter, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-accent" fill="currentColor" />
              <span className="text-xl font-bold">CareHub</span>
            </Link>
            <p className="text-background/80 text-sm leading-relaxed">
              Connecting passionate caregivers with families who need them. Building a safer, more connected childcare
              community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">For Caregivers</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Apply Now
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Training
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* School Links */}
          <div>
            <h3 className="font-semibold mb-4">For Schools</h3>
            <ul className="space-y-2 text-sm text-background/80">
              <li>
                <Link href="#" className="hover:text-background transition">
                  Request Staff
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-background transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-background/80 hover:text-background transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-background transition">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mb-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/80">
          <p>&copy; {currentYear} CareHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-background transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-background transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-background transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
