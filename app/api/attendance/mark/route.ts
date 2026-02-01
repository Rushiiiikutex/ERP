import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "../../../../src/lib/db";
import { getServerAuthSession } from "../../../../src/lib/auth";

const Status = z.enum(["PRESENT","ABSENT","LATE","EXCUSED"]);
const saveSchema = z.object({
  courseId: z.number(),
  sectionId: z.number(),
  date: z.string().transform((s) => new Date(s)), // "YYYY-MM-DD"
  subject: z.string().optional(), // maps to ClassSession.topic
  updates: z.array(z.object({
    studentId: z.number(),
    status: Status.default("ABSENT"),
    note: z.string().optional(),
  })),
});

export async function POST(req: NextRequest) {
  const auth = await getServerAuthSession();
  if (!auth?.user || auth.user.role !== "TEACHER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const input = saveSchema.parse(await req.json());

  // Ensure teacher owns course
  const course = await prisma.course.findFirst({
    where: { id: input.courseId, teacher: { userId: Number(auth.user.id) } },
    select: { id: true },
  });
  if (!course) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  // Upsert the class session (one per course+section+date)
  const dateOnly = new Date(input.date.toDateString());
  const session = await prisma.classSession.upsert({
    where: {
      courseId_sectionId_date: {
        courseId: input.courseId,
        sectionId: input.sectionId,
        date: dateOnly,
      },
    },
    update: {
      topic: input.subject ?? undefined,
    },
    create: {
      courseId: input.courseId,
      sectionId: input.sectionId,
      date: dateOnly,
      topic: input.subject,
      createdById: Number(auth.user.id),
    },
    select: { id: true, isLocked: true },
  });

  if (session.isLocked) {
    return NextResponse.json({ error: "Session locked" }, { status: 409 });
  }

  // Upsert attendance rows
  const ops = input.updates.map(u =>
    prisma.attendanceRecord.upsert({
      where: {
        sessionId_studentId: { sessionId: session.id, studentId: u.studentId },
      },
      create: {
        sessionId: session.id,
        studentId: u.studentId,
        status: u.status,
        note: u.note,
        markedById: Number(auth.user.id),
      },
      update: {
        status: u.status,
        note: u.note,
        markedById: Number(auth.user.id),
        markedAt: new Date(),
      },
    })
  );

  await prisma.$transaction(ops);
  return NextResponse.json({ ok: true, sessionId: session.id });
}