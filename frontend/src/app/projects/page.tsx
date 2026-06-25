"use client";

import { useState } from "react";
import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";

const allProjects = [
  { id: 1, title: "E-Commerce Platform", slug: "e-commerce-platform", description: "Platform belanja online dengan fitur real-time inventory management dan payment gateway terintegrasi.", image: null, technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS"], category: "Full Stack", featured: true },
  { id: 2, title: "Task Management App", slug: "task-management-app", description: "Aplikasi manajemen tugas kolaboratif dengan drag-and-drop interface dan real-time updates.", image: null, technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket"], category: "Full Stack", featured: true },
  { id: 3, title: "Weather Dashboard", slug: "weather-dashboard", description: "Dashboard cuaca interaktif dengan visualisasi data dan forecast 7 hari.", image: null, technologies: ["React", "Chart.js", "Tailwind CSS", "REST API"], category: "Frontend", featured: false },
  { id: 4, title: "API Gateway Service", slug: "api-gateway-service", description: "Microservice API gateway dengan rate limiting, authentication, dan request logging.", image: null, technologies: ["Node.js", "Redis", "Docker", "TypeScript"], category: "Backend", featured: false },
  { id: 5, title: "Personal Blog Template", slug: "personal-blog-template", description: "Template blog modern dengan MDX support, dark mode, dan SEO optimization.", image: null, technologies: ["Next.js", "MDX", "Tailwind CSS", "TypeScript"], category: "Frontend", featured: false },
  { id: 6, title: "CI/CD Pipeline Tool", slug: "cicd-pipeline-tool", description: "Automated deployment pipeline dengan GitHub Actions, Docker, dan monitoring.", image: null, technologies: ["Docker", "GitHub Actions", "AWS", "Bash"], category: "DevOps", featured: false },
];

const categories = ["All", "Full Stack", "Frontend", "Backend", "DevOps"];

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState("All");

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

        {filteredProjects.length === 0 ? (
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
