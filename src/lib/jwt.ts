// src/lib/jwt.ts
import * as jwt from "jsonwebtoken";
import type { Secret, SignOptions, JwtPayload } from "jsonwebtoken";
import type { StringValue } from "ms"; // <- type used by jsonwebtoken for expiresIn

type Role = "USER" | "ADMIN" | "TEACHER";

export interface AppClaims extends JwtPayload {
  sub: string;      // keep sub as string
  email: string;
  role: Role;
}

const SECRET: Secret = (process.env.JWT_SECRET ?? "dev-secret") as Secret;

// make expiresIn compatible with jsonwebtoken types
const EXPIRES_IN: number | StringValue =
  ((process.env.JWT_EXPIRES_IN ?? "15m") as StringValue);

export function signAccessToken(claims: AppClaims): string {
  const opts: SignOptions = { algorithm: "HS256", expiresIn: EXPIRES_IN };
  return jwt.sign(claims, SECRET, opts);
}

export function verifyAccessToken(token: string): AppClaims | null {
  try {
    const decoded = jwt.verify(token, SECRET);
    if (typeof decoded === "string") return null;
    return decoded as AppClaims;
  } catch {
    return null;
  }
}
