"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await login(username, password);
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_username", res.username);
      router.push("/admin");
    } catch {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Admin</h1>
          <p className="text-[var(--text-secondary)] mt-2 text-sm">Sign in to manage your portfolio</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] rounded p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors" required />
          </div>
          <button type="submit" disabled={loading}
            className="w-full text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] py-3 rounded hover:bg-[var(--accent)]/10 transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
