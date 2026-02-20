import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

const MAX_ATTEMPTS = 3;
const LOCK_MS = 60 * 60 * 1000; // 1 hour

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email ?? "").trim().toLowerCase();
        const password = String(credentials?.password ?? "");

        if (!email || !password) {
          throw new Error("Missing email or password");
        }

        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Invalid email or password");
        }

        const now = Date.now();
        if (user.lockUntil && user.lockUntil.getTime() > now) {
          const mins = Math.ceil((user.lockUntil.getTime() - now) / 60000);
          throw new Error(`Account locked. Try again in ${mins} min.`);
        }

        const ok = await bcrypt.compare(password, user.passwordHash);

        if (ok) {
          // reset counters on success
          if (user.failedLoginAttempts !== 0 || user.lockUntil) {
            user.failedLoginAttempts = 0;
            user.lockUntil = null;
            await user.save();
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        }

        // wrong password
        user.failedLoginAttempts += 1;

        if (user.failedLoginAttempts >= MAX_ATTEMPTS) {
          user.failedLoginAttempts = MAX_ATTEMPTS;
          user.lockUntil = new Date(now + LOCK_MS);
          await user.save();
          throw new Error("Account locked for 1 hour due to failed attempts.");
        }

        const remaining = MAX_ATTEMPTS - user.failedLoginAttempts;
        await user.save();
        throw new Error(`Invalid password. ${remaining} attempt(s) left.`);
      },
    }),
  ],
};