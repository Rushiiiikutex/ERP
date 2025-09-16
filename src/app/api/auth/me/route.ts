import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAccessToken } from "../../../../lib/jwt";
import { prisma } from "../../../../lib/db";


export async function GET() {
  try {
    const store = await cookies();                   // ⬅️ await in Next 15
    const token = store.get("access_token")?.value;
    if (!token) return NextResponse.json({ user: null });

    const payload = verifyAccessToken(token);
    if (!payload) return NextResponse.json({ user: null });

    const userId = Number(payload.sub);              // sub is string → DB id is number
    if (Number.isNaN(userId)) return NextResponse.json({ user: null });

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json({ user });
  } catch (e) {
    console.error("ME_ERROR:", e);
    return NextResponse.json({ user: null }, { status: 500 });
  }
}