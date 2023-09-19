import UserRole from "src/enum/UserRole";

// nextauth.d.ts
declare module "next-auth" {
  interface User {
    role?: UserRole;
    id?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
  }
}

// nextauth.d.ts
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
    id?: string;
  }
}
