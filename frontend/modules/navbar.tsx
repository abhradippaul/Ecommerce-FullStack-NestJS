"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/orders", label: "Orders" },
    { href: "/account", label: "Account" },
  ];

  return (
    <header className="w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur z-50">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo / app name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold tracking-tight text-white">
            MyApp
          </span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-white font-semibold text-lg",
                  isActive ? "text-white font-medium" : "text-slate-300"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
