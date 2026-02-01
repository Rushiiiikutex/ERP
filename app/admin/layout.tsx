// app/admin/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-6xl gap-6 py-6 px-4">
        {/* LEFT SIDEBAR */}
        <aside className="w-64 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col">
          <div className="p-5 border-b border-slate-100">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Admin Panel
            </p>
            <p className="mt-2 text-lg font-semibold">Welcome, Admin 👋</p>
            <p className="text-xs text-slate-500">
              Manage classes, teachers & batches
            </p>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Navigation
            </p>

            <SidebarLink href="/admin" label="Dashboard" />
            <SidebarLink href="/admin/assign-class" label="Assign Class" />
            <SidebarLink
              href="/admin/assign-teacher-class"
              label="Assign Teacher to Class"
            />
            <SidebarLink
              href="/admin/assign-teacher-batch"
              label="Assign Teacher to Batch"
            />
          </nav>

          <div className="p-4 border-t border-slate-100 text-xs text-slate-500">
            <p className="font-medium">Current Session</p>
            <p>AY 2025–2026</p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 rounded-3xl bg-white border border-slate-200 shadow-sm p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Simple sidebar link component
function SidebarLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
    >
      {label}
    </Link>
  );
}
