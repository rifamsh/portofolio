"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { href: "/#about", label: "About", num: "01" },
  { href: "/#experience", label: "Experience", num: "02" },
  { href: "/#work", label: "Work", num: "03" },
  { href: "/#contact", label: "Contact", num: "04" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "var(--nav-bg)", backdropFilter: "blur(10px)" }}>
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-[var(--accent)] font-[family-name:var(--font-mono)]"
        >
          M.
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.num}
              href={link.href}
              className="nav-link flex items-center gap-1.5"
            >
              <span className="text-xs text-[var(--accent)]">{link.num}.</span>
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link
            href="/about"
            className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border border-[var(--accent)] px-4 py-2 rounded hover:bg-[var(--accent)]/10 transition-all"
          >
            Resume
          </Link>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="p-2 text-[var(--text-primary)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div className="flex flex-col gap-4 p-8">
            {navLinks.map((link) => (
              <Link
                key={link.num}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link text-base flex items-center gap-2"
              >
                <span className="text-sm text-[var(--accent)]">{link.num}.</span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border border-[var(--accent)] px-4 py-2 rounded text-center mt-2"
            >
              Resume
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
