import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../src/lib/db";

export async function GET(_: NextRequest, { params }: { params: { courseId: string } }) {
  const cid = Number(params.courseId);
  // sessions for course
  const sessions = await prisma.classSession.findMany({ where: { courseId: cid }, select: { id: true }});
  const sIds = sessions.map(s => s.id);
  if (!sIds.length) return NextResponse.json({ sessions: 0, rows: [] });

  const rows = await prisma.attendanceRecord.groupBy({
    by: ["studentId", "status"],
    where: { sessionId: { in: sIds } },
    _count: { _all: true },
  });

  // shape into { studentId -> { total, present, percent } }
  const byStudent = new Map<number, { present: number; total: number }>();
  for (const r of rows) {
    const entry = byStudent.get(r.studentId) ?? { present: 0, total: 0 };
    entry.total += r._count._all;
    if (r.status === "PRESENT") entry.present += r._count._all;
    byStudent.set(r.studentId, entry);
  }

  const students = await prisma.student.findMany({
    where: { attendance: { some: { sessionId: { in: sIds } } } },
    include: { user: true },
  });

  const result = students.map(st => {
    const agg = byStudent.get(st.id) ?? { present: 0, total: 0 };
    const percent = agg.total ? Math.round((agg.present / agg.total) * 100) : 0;
    return { studentId: st.id, name: st.user.name, email: st.user.email, present: agg.present, total: agg.total, percent };
  });

  return NextResponse.json({ sessions: sIds.length, rows: result });
}
