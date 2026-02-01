// src/auth.ts
import { cookies } from "next/headers";
import { verifyAccessToken } from "../lib/jwt";

export type SessionUser = {
  id: string | number;
  email: string;
  role: "USER" | "ADMIN" | "TEACHER";
};

export type ServerSession = { user: SessionUser } | null;

/** Reads access_token from cookies and returns { user } or null */
export async function getServerAuthSession(): Promise<ServerSession> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;

  const claims = verifyAccessToken(token);
  if (!claims) return null;

  // sub was defined as string in your AppClaims
  const idMaybeNum = Number.isNaN(Number(claims.sub)) ? claims.sub : Number(claims.sub);
  return {
    user: {
      id: idMaybeNum,
      email: claims.email,
      role: claims.role,
    },
  };
}
