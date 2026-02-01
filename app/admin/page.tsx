// app/admin/page.tsx
import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Admin Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Quick actions and overview for managing classes & teachers.
          </p>
        </div>
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
          Role: Admin
        </span>
      </header>

      {/* Content */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Class & Teacher Management
          </h2>
          <p className="text-sm text-slate-500">Use the cards below to start.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Assign Class */}
          <DashboardCard
            title="Assign Class to Students"
            description="Upload Excel files to assign divisions, roll numbers, and batches for a class."
            href="/admin/assign-class"
            buttonLabel="Go to Assign Class"
            meta="Uses Excel upload"
          />

          {/* Assign Teacher to Class */}
          <DashboardCard
            title="Assign Teacher to Classes"
            description="Map teachers to courses and sections for the current academic year."
            href="/admin/assign-teacher-class"
            buttonLabel="Assign Teacher to Class"
            meta="Course & section mapping"
          />

          {/* Assign Teacher to Batch */}
          <DashboardCard
            title="Assign Teacher to Batches"
            description="Allocate mentors or lab in-charges for each student batch (B1, B2, etc.)."
            href="/admin/assign-teacher-batch"
            buttonLabel="Assign Teacher to Batch"
            meta="Batch-wise allocation"
          />

          {/* Placeholder / future feature */}
          <DashboardCard
            title="Reports & Logs"
            description="(Coming soon) View logs of all admin actions and download reports."
            href="#"
            buttonLabel="Coming Soon"
            disabled
            meta="Audit & history"
          />
        </div>
      </section>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  href,
  buttonLabel,
  meta,
  disabled,
}: {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
  meta?: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-4 shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
        {meta && (
          <p className="mt-2 text-xs font-medium text-slate-500 uppercase tracking-wide">
            {meta}
          </p>
        )}
      </div>

      <div className="mt-4">
        {disabled ? (
          <button
            disabled
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-400 cursor-not-allowed bg-slate-100"
          >
            {buttonLabel}
          </button>
        ) : (
          <Link
            href={href}
            className="inline-flex items-center rounded-md border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-900 hover:text-white transition-colors"
          >
            {buttonLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
