"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProjects } from "@/lib/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  category: string | null;
  featured: boolean;
}

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects({ featured: true })
      .then((data) => setProjects(data))
      .catch(() => {});
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="work" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <span className="section-number">03.</span>
          Some Things I&apos;ve Built
        </h2>

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group relative bg-[var(--bg-secondary)] rounded p-7 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-8">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>

              <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-2">
                {project.title}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-[family-name:var(--font-mono)] text-[var(--text-secondary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/projects"
            className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border border-[var(--accent)] px-6 py-3 rounded hover:bg-[var(--accent)]/10 transition-all inline-block"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
