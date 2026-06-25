"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  technologies: string[];
  category: string | null;
  featured: boolean;
}

const categories = ["All", "Full Stack", "Frontend", "Backend", "DevOps"];

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => setAllProjects(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors mb-6">
          ← Back to Home
        </Link>
        <h2 className="section-title">
          <span className="section-number">03.</span>
          All Projects
        </h2>

        <p className="mt-6 text-[var(--text-secondary)] max-w-lg leading-relaxed">
          Kumpulan project yang telah saya kerjakan, dari full-stack applications
          hingga tools dan utilities.
        </p>

        <div className="flex flex-wrap gap-3 mt-10 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-[family-name:var(--font-mono)] px-4 py-2 rounded transition-all ${
                activeCategory === cat
                  ? "text-[var(--accent)] bg-[var(--accent)]/10"
                  : "text-[var(--text-secondary)] hover:text-[var(--accent)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[var(--text-secondary)]">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
