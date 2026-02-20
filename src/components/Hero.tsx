"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/5 blur-3xl" />
        <div className="absolute -bottom-44 left-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-black/3 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        {isLoggedIn ? (
          <>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              Welcome back.
              <span className="text-black/55"> You&apos;re successfully authenticated.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              You&apos;re in. Let&apos;s get started.
            </p>
          </>
        ) : (
          <>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-[var(--foreground)] sm:text-5xl md:text-6xl">
              Clean authentication UI.
              <span className="text-black/55"> Built for a secure login flow.</span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Sign in, sign up, and a protected home route. Backend logic (NextAuth + lockout).
            </p>

            <div className="mt-8 flex gap-3 justify-center">
              <Link
                href="/signup"
                className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
              >
                Create account
              </Link>
              <Link
                href="/signin"
                className="rounded-full border border-[var(--border-strong)] bg-white px-6 py-3 text-sm font-medium text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}