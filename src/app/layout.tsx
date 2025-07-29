// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "VPDS Component Suggester",
  description:
    "AI-powered component suggestions for Visa Product Design System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white border-b border-gray-200 py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left side: site title */}
            <Link href="/" className="text-2xl font-bold text-[#1434CB]">
              VPDS Component Suggester
            </Link>

            {/* Right side: nav links */}
            <div className="flex gap-6 items-center text-sm font-medium text-gray-700">
              <Link href="/" className="hover:text-[#1434CB] transition-colors">
                Search
              </Link>
              <Link
                href="/recents"
                className="hover:text-[#1434CB] transition-colors"
              >
                Favorites
              </Link>
              <a
                href="https://design.visa.com/components/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1434CB] transition-colors"
              >
                Design Docs
              </a>
            </div>
          </div>
        </nav>

        {children}
      </body>
    </html>
  );
}
