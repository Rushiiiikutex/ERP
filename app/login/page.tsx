
"use client";


import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";


export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") || "/dashboard";

  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Login failed");
      return;
    }

    // Fetch user info
    const userRes = await fetch("/api/auth/me");
    if (userRes.ok) {
      const data = await userRes.json();
      const user = data.user;

      if (user && user.role) {
        if (user.role === "ADMIN") {
          router.push("/admin");
        } else if (user.role === "TEACHER") {
          router.push("/teacher");
        } else {
          router.push("/student");
        }
      } else {
        router.push(next);
      }
    } else {
      router.push(next);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 transform hover:scale-[1.02] disabled:scale-100 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-2">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">Demo credentials:</p>
            <div className="space-y-1 text-xs">
              <div>
                <span className="font-medium text-blue-600">Admin:</span> admin@admin.com / admin123
              </div>
              <div>
                <span className="font-medium text-green-600">Teacher:</span> teacher@teacher.com / password
              </div>
              <div>
                <span className="font-medium text-purple-600">Student:</span> test@test.com / password
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


