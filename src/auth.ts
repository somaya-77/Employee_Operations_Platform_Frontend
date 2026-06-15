import { NextAuthOptions, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constance";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/auth/login",
        error: "/auth/login",
    },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                    }),

                    headers: JSON_HEADER,
                });

                const payload: ApiResponse<User> = await response.json();
                if (!response.ok || "error" in payload) {
                    throw new Error(
                        "error" in payload ? payload.error : "Authentication failed",
                    );
                }

                return {
                    id: payload.user.id,
                    token: payload.token,
                    user: payload.user,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge:  30 * 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const userData = (user as any).user;

                token.accessToken = (user as any).token;
                token.user = userData;
                token.role = userData.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.accessToken = token.accessToken as string;
                session.user = token.user as any;
                session.user.role = token.role as string;
                
            }
            return session;
        },
    },
};

