// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gen-VISA",
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
        <nav
          className="bg-gradient-to-r
             from-[#1434CB]      
             via-[#1A2BB0]    
             to-[#1A1F71]        
             border-b border-transparent
             py-4 px-6"
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Left side: site title */}
            <Link href="/" className="text-2xl font-bold text-white">
              Gen-VISA
            </Link>

            {/* Right side: nav links */}
            <div className="flex gap-6 items-center text-sm font-medium text-white">
              <Link href="/" className="hover:text-[#FDB913] transition-colors">
                Search
              </Link>
              <Link
                href="/favorites"
                className="hover:text-[#FDB913] transition-colors"
              >
                Favorites
              </Link>
              <a
                href="https://design.visa.com/components/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FDB913] transition-colors"
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
