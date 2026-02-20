import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { signIn } from "next-auth/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    signIn: build.mutation<{ ok: boolean; error?: string }, { email: string; password: string }>({
      async queryFn({ email, password }) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) return { data: { ok: false, error: res.error } };
        return { data: { ok: true } };
      },
    }),
  }),
});

export const { useSignInMutation } = authApi;