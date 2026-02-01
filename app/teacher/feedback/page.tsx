import React from "react";

export default function TeacherFeedbackPage() {
  const feedbackList = [
    {
      date: "2025-10-20",
      student: "Aarav Patil",
      text: "Need more examples in OS lectures.",
      reply: "Noted — will add next week.",
    },
    {
      date: "2025-10-18",
      student: "Riya Deshmukh",
      text: "Lab PC 14 not working.",
      reply: "Sent request to lab assistant.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-semibold mb-2">Student Feedback</h1>
      <p className="text-sm text-slate-500 mb-6">
        View feedback from students and respond.
      </p>

      {feedbackList.map((fb, i) => (
        <div
          key={i}
          className="bg-white border border-slate-200 rounded-xl p-5 mb-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800">{fb.student}</p>
              <p className="text-xs text-slate-500">{fb.date}</p>
            </div>

            <button className="text-sm text-violet-700 border border-violet-300 px-3 py-1 rounded-lg">
              Reply
            </button>
          </div>

          <p className="mt-3 text-slate-700 text-sm">{fb.text}</p>

          <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm">
            <span className="font-semibold">Your response:</span>{" "}
            {fb.reply || "No response yet."}
          </div>
        </div>
      ))}
    </div>
  );
}
