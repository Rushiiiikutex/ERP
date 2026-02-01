import React from "react";

export default function TeacherAttendancePage() {
  const attendanceRecords = [
    {
      date: "2025-11-12",
      subject: "Cloud Computing",
      className: "TE COMP A",
      type: "Lecture",
      present: 42,
      total: 55,
    },
    {
      date: "2025-11-11",
      subject: "Deep Learning",
      className: "BE E&TC A",
      type: "Lecture",
      present: 38,
      total: 52,
    },
    {
      date: "2025-11-10",
      subject: "VLSI Design",
      className: "TE E&TC B",
      type: "Lab",
      present: 18,
      total: 25,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-semibold mb-2">Attendance Management</h1>
      <p className="text-sm text-slate-500 mb-6">
        View and manage attendance for your classes.
      </p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5">
        <h2 className="text-sm font-semibold text-slate-700 mb-3">
          Recent Attendance Records
        </h2>

        <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
          <thead className="bg-slate-50">
            <tr className="text-left">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Subject</th>
              <th className="px-4 py-2">Class</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Attendance</th>
            </tr>
          </thead>

          <tbody>
            {attendanceRecords.map((rec, i) => (
              <tr key={i} className="border-t border-slate-100">
                <td className="px-4 py-2">{rec.date}</td>
                <td className="px-4 py-2 font-medium">{rec.subject}</td>
                <td className="px-4 py-2">{rec.className}</td>
                <td className="px-4 py-2">{rec.type}</td>
                <td className="px-4 py-2">
                  {rec.present}/{rec.total} (
                  {Math.round((rec.present / rec.total) * 100)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
