"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  technologies: string[];
  category: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    getProject(slug)
      .then((data) => setProject(data))
      .catch(() => setProject(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen px-6 pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen px-6 pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-[var(--accent)] hover:underline">Back to projects</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
            ← Home
          </Link>
          <span className="text-[var(--text-secondary)] opacity-30">/</span>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Projects
          </Link>
        </div>

        {project.image ? (
          <div className="rounded overflow-hidden mb-8 max-h-80">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="rounded bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-center mb-8 h-48 overflow-hidden relative">
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, var(--accent) 1px, transparent 1px),
                                  radial-gradient(circle at 75% 75%, var(--accent) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
              }} />
            </div>
            <div className="relative flex flex-col items-center gap-2">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)] opacity-40">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--text-secondary)] opacity-30">
                {project.category}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded">
            {project.category}
          </span>
          {project.featured && (
            <span className="text-xs font-[family-name:var(--font-mono)] text-[var(--accent)] bg-[var(--accent)]/10 px-3 py-1 rounded">
              Featured
            </span>
          )}
        </div>

        <h1 className="text-[clamp(32px,5vw,48px)] font-bold text-[var(--text-primary)] leading-[1.1] mb-4">
          {project.title}
        </h1>

        <p className="text-[var(--text-secondary)] mb-8">{project.description}</p>

        <div className="flex flex-wrap gap-4 mb-10">
          {project.technologies.map((tech) => (
            <span key={tech} className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)]">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mb-12">
          {project.liveUrl && project.liveUrl !== "#" && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-6 py-3 rounded hover:bg-[var(--accent)]/10 transition-all"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && project.githubUrl !== "#" && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-6 py-3 rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
            >
              Source Code
            </a>
          )}
        </div>

        {project.content && (
          <div className="border-t border-[var(--border)] pt-8">
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">About This Project</h2>
            {project.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-4">{paragraph}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
