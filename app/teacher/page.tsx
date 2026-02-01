// export default function TeacherHome() {
//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-4">
//       <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
//       <div className="grid gap-4 sm:grid-cols-2">
//         <a href="/teacher/attendance" className="border rounded-xl p-6 hover:shadow transition">
//           <h2 className="font-medium mb-1">Attendance</h2>
//           <p className="text-sm text-gray-600">Mark daily attendance by course & section.</p>
//         </a>
//       </div>
//     </div>
//   );
// }


// app/teacher/page.tsx (or /dashboard/page.tsx)
import React from "react";
import Link from "next/link";


const TeacherDashboard = () => {
  // ----- Demo data -----
  const todayClasses = [
    { time: "09:00 – 10:00", subject: "Cloud Computing", className: "TE COMP A", room: "LAB-301" },
    { time: "11:00 – 12:00", subject: "Deep Learning", className: "BE E&TC A", room: "CL-204" },
    { time: "14:00 – 15:00", subject: "VLSI Design", className: "TE E&TC B", room: "LAB-105" },
  ];

  const recentAttendance = [
    { date: "2025-11-12", subject: "Cloud Computing", className: "TE COMP A", status: "Submitted", percentage: "82%" },
    { date: "2025-11-11", subject: "Deep Learning", className: "BE E&TC A", status: "Pending", percentage: "–" },
    { date: "2025-11-10", subject: "Javascript", className: "SE IT A", status: "Submitted", percentage: "76%" },
    { date: "2025-11-09", subject: "Radiation & Microwave", className: "BE E&TC B", status: "Submitted", percentage: "69%" },
  ];

  const lowAttendance = [
    { subject: "Cloud Computing", className: "TE COMP A", percentage: "68%" },
    { subject: "Deep Learning", className: "BE E&TC A", percentage: "65%" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="px-6 py-5 border-b border-slate-200">
          <h2 className="text-lg font-semibold">Aarav Patil</h2>
          <p className="text-xs text-slate-500 mt-1">Faculty ID: FP-2025-01</p>
          <p className="text-xs text-slate-500 mt-1">
            Dept: Electronics & Telecommunication
          </p>
        </div>

<nav className="flex-1 px-3 py-4 space-y-1 text-sm">

  <Link
    href="/teacher"
    className="block w-full text-left px-3 py-2 rounded-xl bg-violet-50 text-violet-700 font-medium"
  >
    Dashboard
  </Link>

  <Link
    href="/teacher/attendance"
    className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100"
  >
    Attendance
  </Link>

  <Link
    href="/teacher/feedback"
    className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100"
  >
    Feedback
  </Link>

  <Link
    href="/teacher/syllabus"
    className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100"
  >
    Syllabus / Resources
  </Link>

  <Link
    href="/teacher/profile"
    className="block w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100"
  >
    Profile
  </Link>

</nav>
        <div className="px-6 py-4 border-t border-slate-200 text-xs text-slate-500">
          Current Semester: <span className="font-medium text-slate-700">Odd 2025–26</span>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-8 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Teacher Dashboard</h1>
            <p className="text-sm text-slate-500">
              Overview of today’s classes, attendance, and student feedback.
            </p>
          </div>
          <div className="text-sm text-slate-600">
            Welcome back, <span className="font-medium">Prof. Aarav 👋</span>
          </div>
        </div>

        {/* Top overview cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Overall Attendance */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-700">
                Overall Attendance (This Sem)
              </h2>
              <span className="text-xs text-slate-400">All classes</span>
            </div>
            <div className="text-3xl font-semibold">78%</div>
            <div className="mt-3 h-2 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full w-[78%] bg-emerald-500" />
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Target: <span className="font-medium text-slate-700">≥ 75%</span>
            </p>
          </div>

          {/* Low-attendance alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700">
                Low Attendance Alerts
              </h2>
              <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                {lowAttendance.length} subjects
              </span>
            </div>
            <ul className="space-y-2 text-sm">
              {lowAttendance.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between rounded-xl border border-amber-100 bg-amber-50 px-3 py-2"
                >
                  <div>
                    <div className="font-medium">{item.subject}</div>
                    <div className="text-xs text-slate-500">{item.className}</div>
                  </div>
                  <span className="text-xs font-semibold text-amber-700">
                    {item.percentage}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              Quick Actions
            </h2>
            <div className="space-y-2 text-sm">
              <button className="w-full text-left px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                Mark today&apos;s attendance
              </button>
              <button className="w-full text-left px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                Upload syllabus / resources
              </button>
              <button className="w-full text-left px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50">
                View pending feedback
              </button>
            </div>
          </div>
        </section>

        {/* Main two-column area */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's schedule */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-700">
                Today&apos;s Schedule
              </h2>
              <span className="text-xs text-slate-400">
                {todayClasses.length} classes scheduled
              </span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-slate-50">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-medium text-slate-500">Time</th>
                    <th className="px-4 py-2 font-medium text-slate-500">
                      Subject
                    </th>
                    <th className="px-4 py-2 font-medium text-slate-500">
                      Class
                    </th>
                    <th className="px-4 py-2 font-medium text-slate-500">
                      Room
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {todayClasses.map((c, idx) => (
                    <tr key={idx} className="border-t border-slate-100">
                      <td className="px-4 py-2 text-slate-700">{c.time}</td>
                      <td className="px-4 py-2 text-slate-700">{c.subject}</td>
                      <td className="px-4 py-2 text-slate-700">{c.className}</td>
                      <td className="px-4 py-2 text-slate-700">{c.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent attendance activity */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-3">
              Recent Attendance Records
            </h2>
            <div className="space-y-3 text-sm max-h-72 overflow-auto pr-1">
              {recentAttendance.map((rec, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl px-3 py-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">{rec.date}</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        rec.status === "Submitted"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </div>
                  <div className="mt-1 font-medium text-slate-800">
                    {rec.subject}
                  </div>
                  <div className="text-xs text-slate-500 mb-1">
                    {rec.className}
                  </div>
                  <div className="text-xs text-slate-500">
                    Attendance:{" "}
                    <span className="font-semibold text-slate-700">
                      {rec.percentage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default TeacherDashboard;
