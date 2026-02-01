

//======
// app/api/admin/assign-class/route.ts
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "../../../../src/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const className = formData.get("className") as string | null;
    const division = formData.get("division") as string | null;
    const ccName = formData.get("ccName") as string | null;
    const file = formData.get("file") as File | null;

    if (!className || !division || !ccName || !file) {
      return NextResponse.json(
        { error: "className, division, ccName and file are required" },
        { status: 400 }
      );
    }

    // Read the file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse Excel
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Excel sheet is empty" },
        { status: 400 }
      );
    }

    const studentsData = rows.map((row, index) => {
      const studentName =
        row["Name"] ?? row["StudentName"] ?? row["Student Name"];
      const rollNo = row["RollNo"] ?? row["Roll"] ?? row["Roll No"];
      const batch = row["Batch"] ?? row["BatchName"] ?? row["Batch Name"];

      if (!studentName || rollNo === undefined || batch === undefined) {
        throw new Error(
          `Row ${index + 2} is missing Name / RollNo / Batch. Check Excel headers.`
        );
      }

      return {
        studentName: String(studentName).trim(),
        rollNo: String(rollNo).trim(), 
        batch: String(batch).trim(),
      };
    });

    // Use transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find or create the Class
      let classRecord = await tx.class.findUnique({
        where: {
          name_division: {
            name: className,
            division: division,
          },
        },
      });

      if (!classRecord) {
        classRecord = await tx.class.create({
          data: {
            name: className,
            division: division,
            ccName: ccName,
          },
        });
      }

      // 2. Create ClassAssignment record
    

      // 3. For each student, find or create User and Student records
      const studentUpdates = [];

      for (const studentData of studentsData) {
        // Generate email from roll number
        const email = `${studentData.rollNo.toLowerCase().replace(/\s+/g, "")}@student.edu`;

        // Find or create User
        let user = await tx.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await tx.user.create({
            data: {
              email,
              name: studentData.studentName,
              password: "$2a$10$defaultHashForNewStudents", // Default hash
              role: "USER",
            },
          });
        }

        // Find or create Student
        let student = await tx.student.findUnique({
          where: { userId: user.id },
        });

        if (student) {
          // Update existing student
          student = await tx.student.update({
            where: { id: student.id },
            data: {
              rollNo: studentData.rollNo,
              classId: classRecord.id,
            },
          });
        } else {
          // Create new student
          student = await tx.student.create({
            data: {
              userId: user.id,
              rollNo: studentData.rollNo,
              classId: classRecord.id,
            },
          });
        }

        studentUpdates.push(student);
      }

      return {
        
        class: classRecord,
        studentsAssigned: studentUpdates.length,
      };
    });

    return NextResponse.json(
      {
        message: "Class assignment created successfully",
        ...result,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Error in /api/admin/assign-class:", err);
    return NextResponse.json(
      { error: err.message ?? "Internal server error" },
      { status: 500 }
    );
  }
}