"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";
import { useSignUpMutation } from "@/store/api";

export default function SignUpPage() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
const isPasswordValid = password.length >= 8;
  return (
<main className="min-h-screen flex items-center justify-center px-4 py-14">
        <AuthCard
          title="Create account"
          subtitle="Create your account to access the protected home page."
          footerText="Already have an account?"
          footerLinkText="Sign in"
          footerHref="/signin"
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              if (!isPasswordValid) {
  setError("Password must be at least 8 characters.");
  return;
}
              try {
                await signUp({ email, password }).unwrap();
                router.push("/signin");
              } catch (err: any) {
                setError(err?.data?.message ?? "Signup failed");
              }
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
                autoComplete="new-password"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
             disabled={isLoading || !isPasswordValid}
              className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {isLoading ? "Creating..." : "Create account"}
            </button>
          </form>
        </AuthCard>
    </main>
  );
}