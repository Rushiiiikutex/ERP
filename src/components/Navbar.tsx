'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-4 py-2 shadow">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">🎓 College ERP</h1>
        <ul className="flex gap-6 text-sm">
          <li><Link href="/student">Student</Link></li>
          <li><Link href="/teacher">Teacher</Link></li>
          <li><Link href="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}
