import { NextApiRequest } from "next";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "src/services/AuthServices";
import { findUserByEmail } from "src/services/UserService";

export const authOptions = {
  secret: "BmrfbNplpy1ErIMLGEbz7Lb14dxYowVWP5q8CXpySFc=",
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "usernamepassword",

      credentials: {
        // Define the fields required for authentication
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<string, string>,
        req: NextApiRequest
      ) {
        try {
          console.log(credentials);
          const userName = credentials["username"];
          const password = credentials["password"];

          const user = await findUserByEmail(userName);
          if (user && verifyPassword(password, user.password)) {
            return user;
          }

          return null;
        } catch (error) {
          console.log("Login failed: ", error);
          throw error;
        }
      },
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    verifyRequest: "/auth/verify-request", // (used for check email message)
    error: "/login", // Error code passed in query string as ?error=
    newUser: "/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signing in ", user, account, profile, email, credentials);
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
