"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit3, Trash2, LogOut, Code2, ExternalLink } from "lucide-react";
import { getProjects, deleteProject } from "@/lib/api";

interface Project {
  id: number; title: string; slug: string; category: string | null; featured: boolean; createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    const u = localStorage.getItem("admin_username");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t); setUsername(u || "Admin"); loadProjects();
  }, []);

  async function loadProjects() {
    try { const data = await getProjects(); setProjects(data); } catch { console.error("Failed to load projects"); }
    finally { setLoading(false); }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    try { await deleteProject(id, token!); setProjects(projects.filter((p) => p.id !== id)); }
    catch { alert("Failed to delete"); }
  }

  function handleLogout() {
    localStorage.removeItem("admin_token"); localStorage.removeItem("admin_username"); router.push("/admin/login");
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Welcome back, {username}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-5 py-2.5 rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all inline-flex items-center gap-2">
              <ExternalLink size={14} /> Back to Site
            </Link>
            <Link href="/admin/skills"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-5 py-2.5 rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all inline-flex items-center gap-2">
              <Code2 size={14} /> Skills
            </Link>
            <Link href="/admin/projects/new"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-5 py-2.5 rounded hover:bg-[var(--accent)]/10 transition-all inline-flex items-center gap-2">
              <Plus size={14} /> New Project
            </Link>
            <button onClick={handleLogout}
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-5 py-2.5 rounded hover:text-[var(--accent)] transition-all inline-flex items-center gap-2">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left text-sm font-medium text-[var(--text-secondary)] px-6 py-4">Title</th>
                  <th className="text-left text-sm font-medium text-[var(--text-secondary)] px-6 py-4">Category</th>
                  <th className="text-left text-sm font-medium text-[var(--text-secondary)] px-6 py-4">Status</th>
                  <th className="text-left text-sm font-medium text-[var(--text-secondary)] px-6 py-4">Date</th>
                  <th className="text-right text-sm font-medium text-[var(--text-secondary)] px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-[var(--border)] hover:bg-[var(--bg-tertiary)]/30 transition-colors">
                    <td className="px-6 py-4"><span className="font-medium">{project.title}</span></td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{project.category || "—"}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-[family-name:var(--font-mono)] px-3 py-1 rounded ${
                        project.featured ? "text-[var(--accent)] bg-[var(--accent)]/10" : "text-[var(--text-secondary)] bg-[var(--bg-tertiary)]"
                      }`}>{project.featured ? "Featured" : "Draft"}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--text-secondary)]">{new Date(project.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/projects/edit?slug=${project.slug}`} className="p-2 rounded hover:bg-[var(--bg-primary)] transition-colors">
                          <Edit3 size={14} className="text-[var(--text-secondary)]" />
                        </Link>
                        <button onClick={() => handleDelete(project.id)} className="p-2 rounded hover:bg-red-500/10 transition-colors">
                          <Trash2 size={14} className="text-red-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--text-secondary)]">No projects yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
