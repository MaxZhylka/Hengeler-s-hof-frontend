import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { Roles, User } from "./entities/model/user";

export const authConfig: NextAuthConfig = {
  providers: [
    Google,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}Auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        if (!res.ok) {
          return null;
        }
        try {
          const user = await res.json();
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        let appUser: User = user as User;

        if (account.provider === "google" && user.email) {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}auth/socialCreate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                username: user.name,
                profilePictureUrl: user.image,
              }),
            }
          );
          if (res.ok) {
            appUser = await res.json();
          }
        }

        token.id = appUser.id;
        token.role = appUser.role;
        token.username = appUser.username;
        token.picture = appUser.profilePictureUrl;
        token.email = appUser.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Roles;
      session.user.username = token.username as string;
      if (token.email) {
        session.user.email = token.email;
      }
      session.user.image = token.picture;
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");
      if (isAdminPath) {
        return isLoggedIn;
      }
      return true;
    },

    async signIn({ account }) {
      if (account?.provider === "google") {
        return true;
      }
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
};
