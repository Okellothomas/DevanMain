import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import primsa from '@/app/libs/prismadb';
import prisma from "@/app/libs/prismadb";
import CredentialsProviders from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
// import bcrypt from 'bcryptjs';
// import NextAuth from "next-auth/next";

// Configuration options for NextAuth

export const authOptions: AuthOptions = {
    // Use PrismaAdapter with the Prisma instance for session management
    adapter: PrismaAdapter(prisma), 
    
    // Authentication providers for various strategies
    providers: [
        // Google OAuth provider configuration
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        
        // Custom credentials provider for email/password authentication
        CredentialsProviders({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            // Authorization function for handling email/password authentication
            async authorize(credentials) {
                // Check if email and password are provided
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                // Retrieve user information from the database based on the provided email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // Check if the user or hashedPassword is not available
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                // Compare the provided password with the hashed password stored in the database
                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                // If the password is incorrect, throw an error
                if (!isCorrectPassword) {
                    throw new Error('Incorrect credentials');
                }

                // Return the user information if authentication is successful
                return user;
            }
        })
    ],

    // Secret used for signing cookies and tokens
    secret: process.env.NEXTAUTH_SECRET as string,
    
    // Customization of authentication pages, in this case, redirect to the home page for signIn
    pages: {
        signIn: '/',
    },

    // Enable debugging in development environment
    debug: process.env.NODE_ENV === 'development',
    
    // Configuration for session handling using JWT
    
    session: {
        strategy: 'jwt'
    },

}

// Initialize NextAuth with the specified configuration options
export default NextAuth(authOptions)
