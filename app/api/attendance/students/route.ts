import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../src/lib/db";
import { getServerAuthSession } from "../../../../src/lib/auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const auth = await getServerAuthSession();
  if (!auth?.user || auth.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const sectionId = Number(searchParams.get("sectionId"));
  const courseId = Number(searchParams.get("courseId"));

  if (!sectionId || !courseId) {
    return NextResponse.json({ error: "sectionId and courseId are required" }, { status: 400 });
  }

  // Ensure this teacher owns the course
  const course = await prisma.course.findFirst({
    where: { id: courseId, teacher: { userId: Number(auth.user.id) } },
    select: { id: true },
  });
  if (!course) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Students enrolled in this section
  const enrollments = await prisma.enrollment.findMany({
    where: { sectionId },
    include: {
      student: { include: { user: true } },
    },
    orderBy: [{ student: { user: { name: "asc" } } }],
  });

  const rows = enrollments.map(e => ({
    studentId: e.studentId,
    name: e.student.user.name ?? "",
    email: e.student.user.email,
  }));

  return NextResponse.json({ students: rows });
}
