import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import primsa from '@/app/libs/prismadb';
import prisma from "@/app/libs/prismadb"
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
// import NextAuth from "next-auth/next";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma), 
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: {label: 'password', type: 'password'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('?Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Incorrect credentials')
                }

                return user;
            }
        })
        
    ],
    secret: process.env.NEXTAUTH_SECRET as string,
    pages: {
        signIn: '/',
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
        // secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)