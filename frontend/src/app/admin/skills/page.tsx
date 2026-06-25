"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { getSkills, createSkill, deleteSkill, Skill } from "@/lib/api";

export default function AdminSkillsPage() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { router.push("/admin/login"); return; }
    setToken(t);
    loadSkills();
  }, []);

  async function loadSkills() {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch {
      console.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd() {
    if (!newName.trim()) return;
    try {
      const skill = await createSkill(newName.trim(), token!);
      setSkills([...skills, skill]);
      setNewName("");
    } catch {
      alert("Failed to add skill (maybe already exists)");
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this skill?")) return;
    try {
      await deleteSkill(id, token!);
      setSkills(skills.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete");
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full" /></div>;
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded hover:bg-[var(--bg-secondary)] transition-colors">
            <ArrowLeft size={18} className="text-[var(--text-secondary)]" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Manage Skills</h1>
            <p className="text-[var(--text-secondary)] text-sm mt-1">Add or remove your technical skills</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-8">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new skill..."
            className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border)] rounded px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)] transition-colors"
          />
          <button
            onClick={handleAdd}
            className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-5 py-2.5 rounded hover:bg-[var(--accent)]/10 transition-all inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={14} /> Add Skill
          </button>
        </div>

        <div className="bg-[var(--bg-secondary)] rounded overflow-hidden">
          {skills.length === 0 ? (
            <div className="px-6 py-12 text-center text-[var(--text-secondary)]">No skills yet. Add your first one above.</div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center justify-between px-6 py-4 hover:bg-[var(--bg-tertiary)]/30 transition-colors">
                  <span className="font-medium">{skill.name}</span>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="p-2 rounded hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
