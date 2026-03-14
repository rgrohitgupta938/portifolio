"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-wide text-white">
          Rohit Gupta
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex gap-6 text-sm text-zinc-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link href="/projects" className="hover:text-white">
              Projects
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
            <Link href="/admin" className="hover:text-white">
              Admin
            </Link>
          </nav>

          <a
            href="/Rohit_Gupta_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
          aria-label="Toggle menu"
        >
          <span className="text-lg">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-zinc-950/95 md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-zinc-300">
            <Link href="/" onClick={closeMenu} className="rounded-xl px-2 py-2 hover:bg-white/5 hover:text-white">
              Home
            </Link>

            <Link
              href="/projects"
              onClick={closeMenu}
              className="rounded-xl px-2 py-2 hover:bg-white/5 hover:text-white"
            >
              Projects
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="rounded-xl px-2 py-2 hover:bg-white/5 hover:text-white"
            >
              Contact
            </Link>

            <Link
              href="/admin"
              onClick={closeMenu}
              className="rounded-xl px-2 py-2 hover:bg-white/5 hover:text-white"
            >
              Admin
            </Link>

            <a
              href="/Rohit_Gupta_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-2 rounded-full border border-white/15 px-4 py-3 text-center text-sm text-white transition hover:bg-white/5"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
