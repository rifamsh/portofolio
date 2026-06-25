"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createProject } from "@/lib/api";

export default function NewProjectPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "", slug: "", description: "", content: "",
    category: "Full Stack", technologies: "", liveUrl: "", githubUrl: "", featured: false,
  });

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t);
  }, []);

  function generateSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  function handleTitleChange(value: string) {
    setForm({ ...form, title: value, slug: generateSlug(value) });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await createProject({ ...form, technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean) }, token!);
      router.push("/admin");
    } catch { setError("Failed to create project"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--accent)] mb-8 transition-colors">
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-8">New Project</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded">{error}</div>}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Title *</label>
              <input type="text" value={form.title} onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Slug *</label>
              <input type="text" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Description *</label>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none" required />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Content</label>
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6}
              className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none" />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Category</label>
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]">
                {["Full Stack", "Frontend", "Backend", "Mobile", "DevOps"].map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Technologies</label>
              <input type="text" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" placeholder="React, Node.js" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">Live URL</label>
              <input type="url" value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-[var(--text-primary)]">GitHub URL</label>
              <input type="url" value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)]" />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="w-4 h-4 accent-[var(--accent)]" />
            <span className="text-sm font-medium">Featured project</span>
          </label>

          <div className="flex gap-3 pt-4">
            <button type="submit" disabled={loading}
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-8 py-3 rounded hover:bg-[var(--accent)]/10 transition-all disabled:opacity-50">
              {loading ? "Creating..." : "Create Project"}
            </button>
            <Link href="/admin"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-8 py-3 rounded hover:text-[var(--accent)] transition-all">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
