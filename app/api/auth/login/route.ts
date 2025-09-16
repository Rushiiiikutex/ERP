import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "../../../../src/lib/db";
import bcrypt from "bcryptjs";
import { signAccessToken } from "../../../../src/lib/jwt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password are required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // sub must be a string (we'll parse it back to number when reading)
    const token = signAccessToken({
      sub: String(user.id),
      email: user.email,
      role: user.role, // "USER" | "ADMIN" | "TEACHER"
      // (jwt library will add iat/exp internally)
    });

    // Next.js 15: cookies() is async
    const store = await cookies();
    store.set("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour cookie (your JWT may expire sooner; that's fine)
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("LOGIN_ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
