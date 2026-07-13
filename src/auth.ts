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
            name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
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
                const u = user as any;
                token.accessToken = u.token;
                token.user = u.user;
                token.role = u.user.role;
                token.exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60);
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.user = token.user as any;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    events: {
        async signOut({ token }) {
            token = {};
        }
    },
};