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
        <nav className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex gap-6 items-center">
              <span className="text-2xl font-bold text-[#1434CB]">VPDS</span>
              <Link
                href="/"
                className="font-medium hover:text-[#1434CB] transition-colors"
              >
                Search
              </Link>
              <Link
                href="/recents"
                className="font-medium hover:text-[#1434CB] transition-colors"
              >
                Recents
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
