import "next-auth";
import { DefaultSession } from "next-auth";


declare module "next-auth" {
  interface User {
    id: string;      
    token: string;
    user: any;       
  }

  interface Session {
    accessToken: string;
    user: {
      id: string;
      token: string;
      role: string;
    } & DefaultSession["user"];
  }
}