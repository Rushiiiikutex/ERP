// export default function Dashboard() {
//   return <main>Welcome to your dashboard</main>;
// }




// D:\ERP-main\ERP-main\app\student\page.tsx
"use client";

import React, { useState, FormEvent } from "react";

type Student = {
  id: string;
  name: string;
  roll: string;
  email: string;
  phone: string;
  class: string;
  section: string;
  // avatar: string;
  about: string;
};

type AttendanceRecord = {
  date: string;
  status: "Present" | "Absent" | "Late";
  note?: string;

  // Type of class
  kind: "Lecture" | "Lab";

  // Name of the lecture or lab
  subjectName: string;

  // Semester number
  semester: number;
};

type Feedback = {
  id: string;
  date: string;
  text: string;
  response?: string | null;
};

type SyllabusItem = {
  id: string;
  subject: string;
  topic: string;
  uploaded: string;
  semester: number; // <-- added
};

const subjectsBySemester: Record<number, string[]> = {
  7: [
    "Radiation and Microwave theory",
    "Cloud Computing",
    "VLSI-Design and Technology",
    "Deep Learning",
    "Javascript",
  ],
  6: [
    "Advanced Java Programming",
    "Cellular network",
    "Power Device Circuits",
    "Project Management",
    "Mini Project",
    "Skill Development",
  ],
  5: [
    "Electromagnetic Field theory",
    "Digital Communication",
    "Microcontroller",
    "Database Management",
    "Fundamentals of Java Programming",
    "Skill Development",
  ],
  4: [
    "Signals & Systems",
    "Control Systems",
    "Principles of Communication Systems",
    "Object Oriented Programming",
    "Data Analytics Lab",
    "Project Based Learning",
  ],
  3: [
    "Engineering Mathematics",
    "Electronic Circuits",
    "Digital Circuits",
    "Electrical Circuits",
    "Data structures",
  ],
  // you can add sem 1 and 2 if needed; leaving empty means UI will derive subjects from attendance records
  2: [],
  1: [],
};
export default function Dashboard() {
  const [active, setActive] = useState<
    "attendance" | "feedback" | "syllabus" | "profile"
  >("attendance");

  const [student] = useState<Student>(mockStudent);
  const [attendance] = useState<{
    summary: { total: number; present: number };
    records: AttendanceRecord[];
  }>(mockAttendance);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>(mockFeedback);
  const [syllabus] = useState<SyllabusItem[]>(mockSyllabus);
  const [feedbackText, setFeedbackText] = useState<string>("");

  const handleSubmitFeedback = (e: FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;

    const newFb: Feedback = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      text: feedbackText.trim(),
      response: null,
    };
    setFeedbackList([newFb, ...feedbackList]);
    setFeedbackText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow p-6 grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-12 md:col-span-3 border-r pr-4">
          <div className="flex items-center gap-3 mb-6">
            {/* <img
              src={student.avatar}
              alt="avatar"
              className="w-14 h-14 rounded-full"
            /> */}
            <div>
              <div className="font-semibold">{student.name}</div>
              <div className="text-sm text-gray-500">{student.roll}</div>
            </div>
          </div>

          <nav className="space-y-2">
            <NavItem
              label="Attendance"
              id="attendance"
              active={active}
              onClick={setActive}
            />
            <NavItem
              label="Feedback"
              id="feedback"
              active={active}
              onClick={setActive}
            />
            <NavItem
              label="Syllabus"
              id="syllabus"
              active={active}
              onClick={setActive}
            />
            <NavItem
              label="Profile"
              id="profile"
              active={active}
              onClick={setActive}
            />
          </nav>

          <div className="mt-6 text-sm text-gray-600">
            <div className="font-medium">Class</div>
            <div>{student.class}</div>
            <div className="mt-3 font-medium">Section</div>
            <div>{student.section}</div>
          </div>
        </aside>

        {/* Main content */}
        <main className="col-span-12 md:col-span-9">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold capitalize">{active}</h1>
            <div className="text-sm text-gray-500">
              Welcome back, {student.name.split(" ")[0]} 👋
            </div>
          </header>

          <section>
            {active === "attendance" && (
              <AttendanceSection attendance={attendance} />
            )}

            {active === "feedback" && (
              <FeedbackSection
                feedbackList={feedbackList}
                feedbackText={feedbackText}
                onChangeText={setFeedbackText}
                onSubmit={handleSubmitFeedback}
              />
            )}

            {active === "syllabus" && <SyllabusSection syllabus={syllabus} />}

            {active === "profile" && <ProfileSection student={student} />}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */

function NavItem({
  label,
  id,
  active,
  onClick,
}: {
  label: string;
  id: any;
  active: any;
  onClick: (id: any) => void;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
        isActive
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Present: "bg-green-100 text-green-700",
    Absent: "bg-red-100 text-red-700",
    Late: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${map[status] || ""}`}>
      {status}
    </span>
  );
}

/* ---------- Sections ---------- */

/* ---------- AttendanceSection with Subject filter ---------- */
function AttendanceSection({
  attendance,
}: {
  attendance: {
    summary: { total: number; present: number };
    records: AttendanceRecord[];
  };
}) {
  // determine the highest semester present in records (or fallback to 1)
  const maxSemInData = Math.max(
    1,
    ...attendance.records.map((r) => r.semester)
  );
  const currentSem = maxSemInData;

  // create semesters list from currentSem down to 1 (inclusive)
  const semesters = Array.from(
    { length: currentSem },
    (_, i) => currentSem - i
  );

  const [selectedSem, setSelectedSem] = useState<number>(currentSem);
  const [selectedSubject, setSelectedSubject] = useState<string>(""); // "" means all subjects

  // compute subjects available for the selected semester:
  // priority: subjectsBySemester[selectedSem] (if provided and non-empty) -> else derive from records
  const subjectsForSemester = React.useMemo(() => {
    const predefined = subjectsBySemester[selectedSem];
    if (predefined && Array.isArray(predefined) && predefined.length > 0) {
      return predefined.slice().sort();
    }
    // derive from attendance records for the semester
    return Array.from(
      new Set(
        attendance.records
          .filter((r) => r.semester === selectedSem)
          .map((r) => r.subjectName)
      )
    ).sort();
  }, [attendance.records, selectedSem]);

  // ensure selectedSubject stays valid when semester changes
  React.useEffect(() => {
    if (selectedSubject && !subjectsForSemester.includes(selectedSubject)) {
      setSelectedSubject(""); // reset to all if not valid for this sem
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSem]);

  // helper to compute percentage for a filtered record set
  const computePercent = (records: AttendanceRecord[]) => {
    if (records.length === 0) return 0;
    const present = records.filter((r) => r.status === "Present").length;
    return Math.round((present / records.length) * 100);
  };

  // records for selected semester (and subject if chosen)
  const semRecordsAll = attendance.records.filter(
    (r) => r.semester === selectedSem
  );
  const semRecords =
    selectedSubject && selectedSubject.length > 0
      ? semRecordsAll.filter((r) => r.subjectName === selectedSubject)
      : semRecordsAll;

  const overallPercent = computePercent(semRecords);
  const lectureRecords = semRecords.filter((r) => r.kind === "Lecture");
  const labRecords = semRecords.filter((r) => r.kind === "Lab");
  const lecturePercent = computePercent(lectureRecords);
  const labPercent = computePercent(labRecords);

  // previous semesters summary (unaffected by subject filter)
  const previousSems = semesters
    .filter((s) => s !== selectedSem)
    .sort((a, b) => b - a);
  const prevSemStats = previousSems.map((s) => {
    const recs = attendance.records.filter((r) => r.semester === s);
    return { sem: s, percent: computePercent(recs), total: recs.length };
  });

  return (
    <div className="border rounded-xl p-5 bg-white space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="font-medium">Attendance Overview</div>
          <div className="text-sm text-gray-600">
            Semester-wise breakdown & percentages
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600">Semester</label>
          <select
            value={selectedSem}
            onChange={(e) => {
              const s = Number(e.target.value);
              setSelectedSem(s);
              setSelectedSubject(""); // reset subject whenever sem changes
            }}
            className="border rounded px-3 py-1"
          >
            {semesters.map((s) => (
              <option key={s} value={s}>
                Sem {s}
              </option>
            ))}
          </select>

          <label className="text-sm text-gray-600">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded px-3 py-1 min-w-[180px]"
          >
            <option value="">All subjects</option>
            {subjectsForSemester.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main percentages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded">
        <div className="font-medium mb-2">
  Records{" "}
  {selectedSubject
    ? `for "${selectedSubject}" (Sem ${selectedSem})`
    : `for Sem ${selectedSem}`
  }
</div>

          <div className="text-2xl font-semibold">{overallPercent}%</div>
          <ProgressBar value={overallPercent} />
          <div className="text-xs text-gray-500 mt-2">
            {semRecords.length} tracked sessions
          </div>
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm text-gray-600">
            Lectures {selectedSubject ? - `${selectedSubject}` : "(Sem view)"}
          </div>
          <div className="text-2xl font-semibold">{lecturePercent}%</div>
          <ProgressBar value={lecturePercent} />
          <div className="text-xs text-gray-500 mt-2">
            {lectureRecords.length} lecture sessions
          </div>
        </div>

        <div className="p-4 border rounded">
          <div className="text-sm text-gray-600">
            Labs {selectedSubject ? - `${selectedSubject} `: "(Sem view)"}
          </div>
          <div className="text-2xl font-semibold">{labPercent}%</div>
          <ProgressBar value={labPercent} />
          <div className="text-xs text-gray-500 mt-2">
            {labRecords.length} lab sessions
          </div>
        </div>
      </div>

      {/* Table of records for the selected semester (and subject if selected) */}
      <div>
     <div className="font-medium mb-2">
  Records{" "}
  {selectedSubject
    ? `for "${selectedSubject}" (Sem ${selectedSem})`
    : `Sem ${selectedSem}`
  }
</div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="text-left text-gray-600 border-b">
                <th className="py-2">Date</th>
                <th className="py-2">Type</th>
                <th className="py-2">Subject</th>
                <th className="py-2">Status</th>
                <th className="py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {semRecords.map((r) => (
                <tr
                  key={`${r.date}-${r.kind}-${r.subjectName}`}
                  className="border-t"
                >
                  <td className="py-2">{r.date}</td>
                  <td className="py-2">{r.kind}</td>
                  <td className="py-2">{r.subjectName}</td>
                  <td className="py-2">
                    <StatusBadge status={r.status} />
                  </td>
                  <td className="py-2 text-gray-600">{r.note || "-"}</td>
                </tr>
              ))}
              {semRecords.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-3 text-gray-500">
                    No records for this selection.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Previous semesters */}
      <div>
        <div className="font-medium mb-2">Previous semesters</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {prevSemStats.length === 0 && (
            <div className="text-sm text-gray-500">
              No previous semester data.
            </div>
          )}
          {prevSemStats.map((p) => (
            <div key={p.sem} className="p-3 border rounded">
              <div className="text-sm text-gray-600">Sem {p.sem}</div>
              <div className="text-lg font-semibold">{p.percent}%</div>
              <ProgressBar value={p.percent} />
              <div className="text-xs text-gray-500 mt-2">
                {p.total} tracked sessions
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function FeedbackSection({
  feedbackList,
  feedbackText,
  onChangeText,
  onSubmit,
}: {
  feedbackList: Feedback[];
  feedbackText: string;
  onChangeText: (value: string) => void;
  onSubmit: (e: FormEvent) => void;
}) {
  return (
    <div className="border rounded-xl p-5 bg-white">
      <div className="mb-4 font-medium">Send Feedback</div>
      <form onSubmit={onSubmit} className="space-y-3">
        <textarea
          value={feedbackText}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Write your feedback or a concern..."
          className="w-full border rounded p-3 min-h-[90px]"
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Your feedback is private to teachers and admin.
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-600 text-white"
          >
            Send
          </button>
        </div>
      </form>

      <hr className="my-4" />

      <div className="font-medium mb-2">Feedback history</div>
      <div className="space-y-3">
        {feedbackList.length === 0 && (
          <div className="text-gray-500">No feedback yet.</div>
        )}
        {feedbackList.map((fb) => (
          <div key={fb.id} className="border rounded p-3">
            <div className="text-sm text-gray-600">{fb.date}</div>
            <div className="mt-2">{fb.text}</div>
            <div className="mt-2 text-sm text-gray-500">
              Response: {fb.response || "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- SyllabusSection — show only current (latest) semester ---------- */
function SyllabusSection({ syllabus }: { syllabus: SyllabusItem[] }) {
  if (!syllabus || syllabus.length === 0) {
    return (
      <div className="border rounded-xl p-5 bg-white">
        <div className="font-medium">Syllabus & Resources</div>
        <div className="text-sm text-gray-500 mt-3">
          No syllabus available yet.
        </div>
      </div>
    );
  }

  // compute latest semester present in syllabus data
  const latestSem = Math.max(...syllabus.map((s) => s.semester));

  // filter syllabus for that semester and sort by subject name
  const currentSemSyllabus = syllabus
    .filter((s) => s.semester === latestSem)
    .sort((a, b) => a.subject.localeCompare(b.subject));

  return (
    <div className="border rounded-xl p-5 bg-white">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="font-medium">Syllabus & Resources</div>
          <div className="text-sm text-gray-600">
            Showing resources for Semester {latestSem}
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Total: {currentSemSyllabus.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentSemSyllabus.map((item) => (
          <div
            key={item.id}
            className="border rounded p-3 flex flex-col justify-between"
          >
            <div>
              <div className="font-semibold">{item.subject}</div>
              <div className="text-sm text-gray-600 mt-1">{item.topic}</div>
              <div className="text-xs text-gray-500 mt-2">
                Uploaded: {item.uploaded}
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 border rounded text-sm">View</button>
              <button className="px-3 py-1 border rounded text-sm">
                Download
              </button>
            </div>
          </div>
        ))}

        {currentSemSyllabus.length === 0 && (
          <div className="text-sm text-gray-500">
            No syllabus resources found for Semester {latestSem}.
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileSection({ student }: { student: Student }) {
  return (
    <div className="border rounded-xl p-5 bg-white flex gap-6">
      {/* <img
        src={student.avatar}
        alt="avatar"
        className="w-24 h-24 rounded-full"
      /> */}
      <div>
        <div className="text-xl font-semibold">{student.name}</div>
        <div className="text-sm text-gray-600">Roll: {student.roll}</div>
        <div className="text-sm text-gray-600">Email: {student.email}</div>
        <div className="text-sm text-gray-600">Phone: {student.phone}</div>
        <div className="mt-3 text-sm text-gray-700">{student.about}</div>

        <div className="mt-4 flex gap-2">
          <button className="px-4 py-2 rounded-lg border">Edit Profile</button>
          <button className="px-4 py-2 rounded-lg bg-red-600 text-white">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  // clamp 0..100
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 bg-gray-200 rounded mt-3">
      <div
        className="h-2 rounded"
        style={{ width: `${v}%`, backgroundColor: undefined }}
      />
    </div>
  );
}

/* ---------- Mock Data ---------- */
const mockStudent: Student = {
  id: "s1",
  name: "Aarav Patil",
  roll: "RP-2025-01",
  email: "aarav.patil@example.com",
  phone: "+91 98765 43210",
  class: "B.Tech - Electronics And Telecommunication",
  section: "A",
  // avatar: "",
  about:
    "A motivated student interested in embedded systems and cloud computing.",
};

/* ---------- Mock Attendance Data for BE Electronics and Telecommunication ---------- */
const mockAttendance: {
  summary: { total: number; present: number };
  records: AttendanceRecord[];
} = {
  summary: { total: 150, present: 132 },
  records: [
    // ---------------- SEM 7 ----------------
    {
      date: "2025-11-12",
      status: "Present",
      kind: "Lecture",
      subjectName: "Cloud Computing",
      semester: 7,
    },
    {
      date: "2025-11-11",
      status: "Absent",
      kind: "Lab",
      subjectName: "VLSI-Design and Technology",
      semester: 7,
      note: "Sick leave",
    },
    {
      date: "2025-11-10",
      status: "Present",
      kind: "Lecture",
      subjectName: "Javascript",
      semester: 7,
    },
    {
      date: "2025-11-09",
      status: "Late",
      kind: "Lecture",
      subjectName: "Deep Learning",
      semester: 7,
      note: "Arrived late",
    },
    {
      date: "2025-11-08",
      status: "Present",
      kind: "Lab",
      subjectName: "Radiation and Microwave theory",
      semester: 7,
    },

    // ---------------- SEM 6 ----------------
    {
      date: "2025-06-20",
      status: "Present",
      kind: "Lecture",
      subjectName: "Advanced Java Programming",
      semester: 6,
    },
    {
      date: "2025-06-19",
      status: "Present",
      kind: "Lab",
      subjectName: "Mini Project",
      semester: 6,
    },
    {
      date: "2025-06-18",
      status: "Absent",
      kind: "Lecture",
      subjectName: "Project Management",
      semester: 6,
      note: "Family event",
    },
    {
      date: "2025-06-17",
      status: "Present",
      kind: "Lecture",
      subjectName: "Cellular network",
      semester: 6,
    },
    {
      date: "2025-06-16",
      status: "Late",
      kind: "Lab",
      subjectName: "Skill Development",
      semester: 6,
    },

    // ---------------- SEM 5 ----------------
    {
      date: "2025-03-05",
      status: "Present",
      kind: "Lecture",
      subjectName: "Digital Communication",
      semester: 5,
    },
    {
      date: "2025-03-04",
      status: "Absent",
      kind: "Lecture",
      subjectName: "Electromagnetic Field theory",
      semester: 5,
    },
    {
      date: "2025-03-03",
      status: "Present",
      kind: "Lab",
      subjectName: "Database Management",
      semester: 5,
    },
    {
      date: "2025-03-02",
      status: "Present",
      kind: "Lecture",
      subjectName: "Microcontroller",
      semester: 5,
    },
    {
      date: "2025-03-01",
      status: "Present",
      kind: "Lab",
      subjectName: "Fundamentals of Java Programming",
      semester: 5,
    },

    // ---------------- SEM 4 ----------------
    {
      date: "2024-12-12",
      status: "Present",
      kind: "Lecture",
      subjectName: "Signals & Systems",
      semester: 4,
    },
    {
      date: "2024-12-11",
      status: "Late",
      kind: "Lecture",
      subjectName: "Control Systems",
      semester: 4,
      note: "Traffic delay",
    },
    {
      date: "2024-12-10",
      status: "Present",
      kind: "Lab",
      subjectName: "Data Analytics Lab",
      semester: 4,
    },
    {
      date: "2024-12-09",
      status: "Absent",
      kind: "Lecture",
      subjectName: "Object Oriented Programming",
      semester: 4,
      note: "Medical leave",
    },
    {
      date: "2024-12-08",
      status: "Present",
      kind: "Lab",
      subjectName: "Project Based Learning",
      semester: 4,
    },

    // ---------------- SEM 3 ----------------
    {
      date: "2024-08-10",
      status: "Present",
      kind: "Lecture",
      subjectName: "Engineering Mathematics",
      semester: 3,
    },
    {
      date: "2024-08-09",
      status: "Present",
      kind: "Lab",
      subjectName: "Electronic Circuits",
      semester: 3,
    },
    {
      date: "2024-08-08",
      status: "Absent",
      kind: "Lecture",
      subjectName: "Digital Circuits",
      semester: 3,
    },
    {
      date: "2024-08-07",
      status: "Present",
      kind: "Lecture",
      subjectName: "Electrical Circuits",
      semester: 3,
    },
    {
      date: "2024-08-06",
      status: "Present",
      kind: "Lab",
      subjectName: "Data structures",
      semester: 3,
    },
  ],
};

const mockFeedback: Feedback[] = [
  {
    id: "f1",
    date: "2025-10-20",
    text: "Need more examples in OS lectures.",
    response: "Noted — will add next week.",
  },
];

/* ---------- Mock Syllabus & Resources for BE ENTC ---------- */
const mockSyllabus: SyllabusItem[] = [
  // ---------------- SEM 7 ----------------
  {
    id: "sy71",
    subject: "Radiation and Microwave theory",
    topic: "Antenna parameters, waveguides, and microwave components overview",
    uploaded: "2025-07-10",
    semester: 7,
  },
  {
    id: "sy72",
    subject: "Cloud Computing",
    topic: "AWS, Azure, and Virtualization fundamentals",
    uploaded: "2025-07-15",
    semester: 7,
  },
  {
    id: "sy73",
    subject: "VLSI-Design and Technology",
    topic: "CMOS circuits, layout design, and fabrication process",
    uploaded: "2025-07-20",
    semester: 7,
  },
  {
    id: "sy74",
    subject: "Deep Learning",
    topic: "Neural networks, CNNs, RNNs, and backpropagation concepts",
    uploaded: "2025-07-22",
    semester: 7,
  },
  {
    id: "sy75",
    subject: "Javascript",
    topic: "ES6 features, DOM manipulation, and async programming",
    uploaded: "2025-07-25",
    semester: 7,
  },

  // ---------------- SEM 6 ----------------
  {
    id: "sy61",
    subject: "Advanced Java Programming",
    topic: "JDBC, servlets, and multi-threaded programming",
    uploaded: "2025-01-10",
    semester: 6,
  },
  {
    id: "sy62",
    subject: "Cellular network",
    topic: "3G/4G/5G architecture, handoff, and mobile protocols",
    uploaded: "2025-01-15",
    semester: 6,
  },
  {
    id: "sy63",
    subject: "Power Device Circuits",
    topic: "MOSFETs, IGBTs, and converter topologies",
    uploaded: "2025-01-18",
    semester: 6,
  },
  {
    id: "sy64",
    subject: "Project Management",
    topic: "Agile, risk analysis, and Gantt chart planning",
    uploaded: "2025-01-22",
    semester: 6,
  },
  {
    id: "sy65",
    subject: "Mini Project",
    topic: "Embedded system design using Arduino/Raspberry Pi",
    uploaded: "2025-01-25",
    semester: 6,
  },
  {
    id: "sy66",
    subject: "Skill Development",
    topic: "Soft skills, resume building, and technical presentation",
    uploaded: "2025-01-28",
    semester: 6,
  },

  // ---------------- SEM 5 ----------------
  {
    id: "sy51",
    subject: "Electromagnetic Field theory",
    topic: "Maxwell equations, plane waves, and boundary conditions",
    uploaded: "2024-07-02",
    semester: 5,
  },
  {
    id: "sy52",
    subject: "Digital Communication",
    topic: "Modulation, demodulation, and information theory basics",
    uploaded: "2024-07-05",
    semester: 5,
  },
  {
    id: "sy53",
    subject: "Microcontroller",
    topic: "8051 architecture, timers, and interfacing",
    uploaded: "2024-07-08",
    semester: 5,
  },
  {
    id: "sy54",
    subject: "Database Management",
    topic: "SQL, normalization, and transactions overview",
    uploaded: "2024-07-12",
    semester: 5,
  },
  {
    id: "sy55",
    subject: "Fundamentals of Java Programming",
    topic: "OOP concepts, classes, inheritance, and exception handling",
    uploaded: "2024-07-15",
    semester: 5,
  },
  {
    id: "sy56",
    subject: "Skill Development",
    topic: "Communication and teamwork exercises",
    uploaded: "2024-07-18",
    semester: 5,
  },

  // ---------------- SEM 4 ----------------
  {
    id: "sy41",
    subject: "Signals & Systems",
    topic: "Laplace, Fourier transforms, and system analysis",
    uploaded: "2024-02-10",
    semester: 4,
  },
  {
    id: "sy42",
    subject: "Control Systems",
    topic: "PID control, stability, and frequency response",
    uploaded: "2024-02-12",
    semester: 4,
  },
  {
    id: "sy43",
    subject: "Principles of Communication Systems",
    topic: "AM, FM, PM, and pulse modulation techniques",
    uploaded: "2024-02-15",
    semester: 4,
  },
  {
    id: "sy44",
    subject: "Object Oriented Programming",
    topic: "C++ classes, polymorphism, and file handling",
    uploaded: "2024-02-18",
    semester: 4,
  },
  {
    id: "sy45",
    subject: "Data Analytics Lab",
    topic: "Python for data analysis, Pandas, and visualization",
    uploaded: "2024-02-20",
    semester: 4,
  },
  {
    id: "sy46",
    subject: "Project Based Learning",
    topic: "Mini design project on IoT or embedded system",
    uploaded: "2024-02-25",
    semester: 4,
  },

  // ---------------- SEM 3 ----------------
  {
    id: "sy31",
    subject: "Engineering Mathematics",
    topic: "Differential equations, Laplace transforms, and matrices",
    uploaded: "2023-09-01",
    semester: 3,
  },
  {
    id: "sy32",
    subject: "Electronic Circuits",
    topic: "BJT/Op-amp amplifiers and biasing",
    uploaded: "2023-09-03",
    semester: 3,
  },
  {
    id: "sy33",
    subject: "Digital Circuits",
    topic: "Logic gates, flip-flops, and counters",
    uploaded: "2023-09-05",
    semester: 3,
  },
  {
    id: "sy34",
    subject: "Electrical Circuits",
    topic: "Thevenin’s theorem, mesh, and nodal analysis",
    uploaded: "2023-09-08",
    semester: 3,
  },
  {
    id: "sy35",
    subject: "Data structures",
    topic: "Arrays, linked lists, stacks, queues, and trees",
    uploaded: "2023-09-10",
    semester: 3,
  },
];