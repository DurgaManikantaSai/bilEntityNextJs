import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

async function getUserByEmailOrPhone(
    phone?: string,
    email?: string,
    password?: string
): Promise<User | null> {
    try {
        const user = await prisma.user.findMany({
            where: {
                OR: [{ email }, { phone }],
            },
        });
        return user[0];
    } catch (error) {
        console.error("Failed to fetch user:", error);
        throw new Error("Failed to fetch user.");
    }
}

async function createUser(
    firmName: string,
    owner: string,
    address: string,
    gstNo: string,
    email: string,
    phone: string,
    password: string,
    amount: number
): Promise<User | null> {
    let hashedPassword;
    if (password) {
        hashedPassword = await bcrypt.hash(password, 5);
    }
    try {
        const user = await prisma.user.create({
            data: {
                email,
                firmName,
                owner,
                address,
                gstNo,
                phone,
                password: hashedPassword as string,
                amount,
            },
        });
        return user;
    } catch (error) {
        console.error("Failed to create user:", error);
        throw new Error("Failed to create user.");
    }
}

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                firmname: { type: "text" },
                owner: { type: "text" },
                address: { type: "text" },
                gstNo: { type: "text" },
                email: { type: "text" },
                phone: { type: "text" },
                password: { type: "password" },
                name: { type: "text" },
                isRegister: { type: "text" },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { firmname, owner, address, gstNo, password, email, phone, isRegister } = credentials;
                if (!(email || phone) || !password) {
                    return null;
                }

                const user = await getUserByEmailOrPhone(phone, email);

                if (isRegister === "true") {
                    if (user?.email || user?.phone) {
                        // User already registered
                        return null;
                    }
                    const userInserted = await createUser(firmname, owner, address, gstNo, email, phone, password, 0); // 0 as default amount
                    return userInserted;
                }

                if (user && user.password) {
                    const passwordsMatched = await bcrypt.compare(password, user.password);

                    if (passwordsMatched) {
                        const { password: _, ...restUser } = user;
                        return restUser;
                    }
                }

                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                ...(token.user ?? {}),
                ...session.user,
            };
            return session;
        },
        redirect({ url, baseUrl }) {
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            else if (new URL(url).origin === baseUrl) return url;
            return baseUrl;
        },
    },
};
