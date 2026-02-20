"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { useSignInMutation } from "@/store/authApi";

export default function SignInPage() {
  const router = useRouter();
  const [mutateSignIn, { isLoading }] = useSignInMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  return (
<main className="min-h-screen flex items-center justify-center px-4 py-14">
        <AuthCard
          title="Sign in"
          subtitle="Welcome back. Enter your details to continue."
          footerText="Don’t have an account?"
          footerLinkText="Sign up"
          footerHref="/signup"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);

              const res = await mutateSignIn({ email, password }).unwrap();
              if (!res.ok) {
                setError(res.error ?? "Login failed");
                return;
              }

              router.push("/");
              router.refresh();
            }}
            className="space-y-4"
          >
            <div>
              <label className="mb-2 block text-xs text-[var(--muted)]">Email</label>
              <input
                className="w-full rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-black/35 focus:border-black/30"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs text-[var(--muted)]">Password</label>
              <input
                type="password"
                className="w-full rounded-xl border border-[var(--border-strong)] bg-white px-4 py-3 text-sm text-[var(--foreground)] outline-none placeholder:text-black/35 focus:border-black/30"
                placeholder="xxxxxxxx"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </AuthCard>
    </main>
  );
}