import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, name, password, role } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email & password are required" }, { status: 400 });
    }

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { email, name, password: hash, role: role ?? "USER" },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (e) {
    console.error("REGISTER_ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
