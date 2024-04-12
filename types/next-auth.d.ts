import { LoginType, UserRole } from "@prisma/client";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      firmname: string;
      owner: string;
      address:string;
      gstNo: string;
      email?: string;
      phone: string;
      emailVerified: boolean;
    
    };
  }
}
