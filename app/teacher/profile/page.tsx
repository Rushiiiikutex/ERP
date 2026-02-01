export default function TeacherProfile() {
  const teacher = {
    name: "Aarav Patil",
    id: "FP-2025-01",
    department: "Electronics & Telecommunication",
    email: "aarav.patil@college.edu",
    phone: "+91 9876543210",
    joining: "2018-06-12",
    qualification: "M.Tech in VLSI Design",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-semibold mb-2">Profile</h1>
      <p className="text-sm text-slate-500 mb-6">Teacher information details.</p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-medium">Name:</span> {teacher.name}
          </p>
          <p>
            <span className="font-medium">Faculty ID:</span> {teacher.id}
          </p>
          <p>
            <span className="font-medium">Department:</span> {teacher.department}
          </p>
          <p>
            <span className="font-medium">Email:</span> {teacher.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {teacher.phone}
          </p>
          <p>
            <span className="font-medium">Joining Date:</span> {teacher.joining}
          </p>
          <p>
            <span className="font-medium">Qualification:</span>{" "}
            {teacher.qualification}
          </p>
        </div>

        <button className="mt-5 px-4 py-2 bg-violet-600 text-white rounded-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
