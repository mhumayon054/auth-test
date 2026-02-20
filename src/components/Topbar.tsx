"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Topbar() {
  const { status } = useSession();
  const isAuthed = status === "authenticated";

  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu when switching auth state
  useEffect(() => {
    setMenuOpen(false);
  }, [status]);

  // Prevent background scroll when menu is open (mobile)
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <>
<header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-lg font-semibold tracking-tight text-[var(--foreground)]">
            AuthTest
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center md:flex" aria-label="Primary">
            <ul className="flex items-center gap-2">
              {isAuthed ? (
                <>
                  <li>
                    <Link
                      href="/"
                      className="rounded-full px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#account"
                      className="rounded-full px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#security"
                      className="rounded-full px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      Security
                    </Link>
                  </li>
                  <li className="ml-2">
                    <button
                      onClick={() => signOut({ callbackUrl: "/signin" })}
                      className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Sign out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/signin"
                      className="rounded-full px-4 py-2 text-sm text-[var(--muted)] hover:text-[var(--foreground)]"
                    >
                      Sign in
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/signup"
                      className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                    >
                      Create account
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border-strong)] bg-white px-3 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--surface-muted)] md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile overlay (does NOT push layout) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden top-17.5">
          {/* Backdrop */}
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-black/30"
            onClick={() => setMenuOpen(false)}
          />

          {/* Panel */}
          <div className="relative mx-auto w-full max-w-6xl px-4 pt-3">
            <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur">
              <nav aria-label="Mobile" className="px-3 py-3">
                <ul className="flex flex-col">
                  {isAuthed ? (
                    <>
                      <li>
                        <Link
                          href="/"
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#account"
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                        >
                          Account
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/#security"
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                        >
                          Security
                        </Link>
                      </li>
                      <li className="mt-2">
                        <button
                          onClick={() => signOut({ callbackUrl: "/signin" })}
                          className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-left text-sm font-medium text-white hover:opacity-90"
                        >
                          Sign out
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/signin"
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-xl px-4 py-3 text-sm text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
                        >
                          Sign in
                        </Link>
                      </li>
                      <li className="mt-2">
                        <Link
                          href="/signup"
                          onClick={() => setMenuOpen(false)}
                          className="block rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white hover:opacity-90"
                        >
                          Create account
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}