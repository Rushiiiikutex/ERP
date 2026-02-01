import React from "react";

export default function TeacherSyllabusPage() {
  const uploadedFiles = [
    {
      subject: "Cloud Computing",
      desc: "AWS, Azure, Virtualization fundamentals",
      uploaded: "2025-07-15",
    },
    {
      subject: "Deep Learning",
      desc: "CNN, RNN, backpropagation",
      uploaded: "2025-07-22",
    },
    {
      subject: "Javascript",
      desc: "DOM, ES6, async programming",
      uploaded: "2025-07-25",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-2xl font-semibold mb-2">Syllabus & Resources</h1>
      <p className="text-sm text-slate-500 mb-6">
        Upload new syllabus PDFs and manage course resources.
      </p>

      {/* Upload Box */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8">
        <h2 className="text-sm font-semibold text-slate-700 mb-2">
          Upload New Syllabus
        </h2>
        <div className="flex items-center gap-4">
          <input
            type="file"
            className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
          />
          <button className="px-5 py-2 bg-violet-600 text-white rounded-lg">
            Upload
          </button>
        </div>
      </div>

      {/* Uploaded Files */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {uploadedFiles.map((file, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 rounded-xl p-5"
          >
            <h3 className="font-semibold text-slate-800">{file.subject}</h3>
            <p className="text-sm text-slate-600">{file.desc}</p>
            <p className="text-xs text-slate-500 mt-2">
              Uploaded: {file.uploaded}
            </p>

            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 border border-slate-300 rounded-lg">
                View
              </button>
              <button className="px-4 py-2 border border-slate-300 rounded-lg">
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
