import { Session, User } from "next-auth";
import VkProvider from "next-auth/providers/vk";
import CredentialsProvider from "next-auth/providers/credentials";
import { $api } from "@/lib";
import { JWT } from "next-auth/jwt";
import { AxiosError } from "axios";

const Backend_URL = process.env.NEXT_PUBLIC_API_URL;

interface Credentials {
    email: string;
    password: string;
    remember?: string;
}

const vkProviderConfig = {
    clientId: process.env.NEXT_PUBLIC_VK_CLIENT_ID || '52173415',
    clientSecret: process.env.NEXT_PUBLIC_VK_KEY as string,
    authorization: {
        params: {
            redirect_uri: `${Backend_URL}/api/auth/callback/vk`,
        },
    },
};

const credentialsProviderConfig = {
    credentials: {
        email: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        remember: { label: "remember", type: "text" },
    },
    name: "Credentials",
    async authorize(credentials: Credentials | undefined) {
        if (!credentials?.email || !credentials?.password) return null;
        const remember = credentials.remember === "true";
        try {
            const res = await $api.post(`${Backend_URL}/login`, {
                email: credentials.email,
                password: credentials.password,
                remember,
            });
            if ([400, 401, 403].includes(res.status)) return null;
            return res.data;
        } catch (error: AxiosError | any) {
            throw new Error(error.response?.data?.message || "An unknown error occurred");
        }
    }
};

export const authOptions = {
    secret: process.env.NEXT_PUBLIC_SECRET,
    session: { strategy: "jwt" },
    providers: [
        VkProvider(vkProviderConfig),
        CredentialsProvider(credentialsProviderConfig),
    ],
    callbacks: {
        async jwt({ user, token }: { token: JWT, user: User }) {
            if (user?.user) {
                token.user = {
                    ...user.user,
                    token: user.authorisation.token,
                };
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            if (token && session.user) {
                session.user = token.user;
            }
            return session;
        },
    },
};
