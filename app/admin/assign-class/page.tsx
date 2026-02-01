// // app/admin/assign-class/page.tsx
// "use client";

// import { useState } from "react";

// export default function AssignClassPage() {
//   const [division, setDivision] = useState("");
//   const [className, setClassName] = useState("");
//   const [ccName, setCcName] = useState("");
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);
//     setError(null);

//     if (!file) {
//       setError("Please upload an Excel file.");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("division", division);
//       formData.append("className", className);
//       formData.append("ccName", ccName);
//       formData.append("file", file);

//       const res = await fetch("/api/admin/assign-class", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Something went wrong");
//       } else {
//         setMessage("Class assigned and students uploaded successfully ✅");
//         // optional: reset form
//         setDivision("");
//         setClassName("");
//         setCcName("");
//         setFile(null);
//         (e.target as HTMLFormElement).reset();
//       }
//     } catch (err: any) {
//       console.error(err);
//       setError("Failed to submit. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
//       <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
//         <h1 className="text-2xl font-semibold mb-4 text-center">
//           Assign Class to Students
//         </h1>

//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4"
//           encType="multipart/form-data"
//         >
//           <div>
//             <label className="block text-sm mb-1">Division</label>
//             <input
//               type="text"
//               value={division}
//               onChange={(e) => setDivision(e.target.value)}
//               placeholder="e.g. A"
//               className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">Class</label>
//             <input
//               type="text"
//               value={className}
//               onChange={(e) => setClassName(e.target.value)}
//               placeholder="e.g. SE COMP"
//               className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">CC Name</label>
//             <input
//               type="text"
//               value={ccName}
//               onChange={(e) => setCcName(e.target.value)}
//               placeholder="Class Coordinator name"
//               className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm mb-1">
//               Upload Excel (.xlsx / .xls)
//             </label>
//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={(e) => {
//                 if (e.target.files && e.target.files[0]) {
//                   setFile(e.target.files[0]);
//                 }
//               }}
//               className="w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-semibold hover:file:bg-indigo-500"
//               required
//             />
//             <p className="mt-1 text-xs text-slate-400">
//               Ensure headers: <code>Name</code>, <code>RollNo</code>,{" "}
//               <code>Batch</code>
//             </p>
//           </div>

//           {error && (
//             <p className="text-sm text-red-400 bg-red-950/40 border border-red-700/50 rounded-md px-3 py-2">
//               {error}
//             </p>
//           )}

//           {message && (
//             <p className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-700/50 rounded-md px-3 py-2">
//               {message}
//             </p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
//           >
//             {loading ? "Uploading..." : "Submit & Assign"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }


//=====


// app/admin/assign-class/page.tsx
"use client";

import { useState } from "react";

export default function AssignClassPage() {
  const [division, setDivision] = useState("");
  const [className, setClassName] = useState("");
  const [ccName, setCcName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!file) {
      setError("Please upload an Excel file.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("division", division.trim());
      formData.append("className", className.trim());
      formData.append("ccName", ccName.trim());
      formData.append("file", file);

      const res = await fetch("/api/admin/assign-class", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setMessage(
          `✅ Class assigned successfully! ${data.studentsAssigned || 0} students processed.`
        );
        // Reset form
        setDivision("");
        setClassName("");
        setCcName("");
        setFile(null);
        const form = e.target as HTMLFormElement;
        form.reset();
      }
    } catch (err: any) {
      console.error(err);
      setError("Failed to submit. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
      ];
      
      if (!validTypes.includes(selectedFile.type)) {
        setError("Please upload a valid Excel file (.xlsx or .xls)");
        setFile(null);
        e.target.value = "";
        return;
      }
      
      // Validate file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size should not exceed 10MB");
        setFile(null);
        e.target.value = "";
        return;
      }
      
      setError(null);
      setFile(selectedFile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur-sm">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          Assign Class to Students
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6">
          Upload an Excel file with student details
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Class Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="e.g., SE COMP, TE IT"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Division <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={division}
              onChange={(e) => setDivision(e.target.value)}
              placeholder="e.g., A, B, C"
              maxLength={2}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Class Coordinator Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={ccName}
              onChange={(e) => setCcName(e.target.value)}
              placeholder="e.g., Dr. John Doe"
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Upload Excel File <span className="text-red-400">*</span>
            </label>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500 file:cursor-pointer cursor-pointer"
              required
            />
            {file && (
              <p className="mt-2 text-xs text-emerald-400">
                ✓ Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
            <div className="mt-2 text-xs text-slate-400 bg-slate-800/50 rounded-md p-2 border border-slate-700/50">
              <p className="font-medium mb-1">📋 Required Excel columns:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>
                  <code className="text-indigo-300">Name</code> - Student full name
                </li>
                <li>
                  <code className="text-indigo-300">RollNo</code> - Roll number
                </li>
                <li>
                  <code className="text-indigo-300">Batch</code> - Batch (e.g., B1, B2)
                </li>
              </ul>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-950/40 border border-red-700/50 rounded-md px-3 py-2.5 flex items-start gap-2">
              <span className="text-lg">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-700/50 rounded-md px-3 py-2.5 flex items-start gap-2">
              <span className="text-lg">✅</span>
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Submit & Assign Class"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}