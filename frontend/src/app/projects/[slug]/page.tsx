"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    id: 1, title: "E-Commerce Platform", slug: "e-commerce-platform",
    description: "Platform belanja online dengan fitur real-time inventory management dan payment gateway terintegrasi.",
    content: "Full-stack e-commerce platform built with React, Node.js, and PostgreSQL.\n\nThis project demonstrates my ability to build complex full-stack applications with modern web technologies. The platform handles thousands of concurrent users with real-time inventory updates through WebSocket connections.",
    technologies: ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "WebSocket", "Redis"],
    category: "Full Stack", liveUrl: "#", githubUrl: "#", featured: true,
  },
  {
    id: 2, title: "Task Management App", slug: "task-management-app",
    description: "Aplikasi manajemen tugas kolaboratif dengan drag-and-drop interface dan real-time updates.",
    content: "Collaborative task management application with real-time updates using WebSocket.\n\nThe app supports multiple workspaces, role-based access control, and integrates with popular tools like Slack and GitHub.",
    technologies: ["Next.js", "TypeScript", "Prisma", "WebSocket", "PostgreSQL", "Tailwind CSS"],
    category: "Full Stack", liveUrl: "#", githubUrl: "#", featured: true,
  },
  {
    id: 3, title: "Weather Dashboard", slug: "weather-dashboard",
    description: "Dashboard cuaca interaktif dengan visualisasi data dan forecast 7 hari.",
    content: "Interactive weather dashboard consuming OpenWeatherMap API. Features 7-day forecast, interactive charts, and location-based weather.",
    technologies: ["React", "Chart.js", "Tailwind CSS", "REST API"],
    category: "Frontend", liveUrl: "#", githubUrl: "#", featured: false,
  },
  {
    id: 4, title: "API Gateway Service", slug: "api-gateway-service",
    description: "Microservice API gateway dengan rate limiting, authentication, dan request logging.",
    content: "A robust API gateway built for microservices architecture with rate limiting using Redis and JWT-based authentication.",
    technologies: ["Node.js", "Redis", "Docker", "TypeScript", "Express"],
    category: "Backend", liveUrl: "#", githubUrl: "#", featured: false,
  },
  {
    id: 5, title: "Personal Blog Template", slug: "personal-blog-template",
    description: "Template blog modern dengan MDX support, dark mode, dan SEO optimization.",
    content: "A modern blog template with MDX support, automatic dark mode, full SEO optimization, and blazing fast page loads.",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "TypeScript", "ISR"],
    category: "Frontend", liveUrl: "#", githubUrl: "#", featured: false,
  },
  {
    id: 6, title: "CI/CD Pipeline Tool", slug: "cicd-pipeline-tool",
    description: "Automated deployment pipeline dengan GitHub Actions, Docker, dan monitoring.",
    content: "End-to-end CI/CD pipeline automation with GitHub Actions, Docker containerization, and AWS ECS deployment.",
    technologies: ["Docker", "GitHub Actions", "AWS", "Bash", "Terraform"],
    category: "DevOps", liveUrl: "#", githubUrl: "#", featured: false,
  },
];

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

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

        <div className="aspect-video rounded bg-[var(--bg-secondary)] flex items-center justify-center mb-10">
          <span className="text-8xl font-bold text-[var(--text-secondary)] opacity-20">
            {project.title.charAt(0)}
          </span>
        </div>

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
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-6 py-3 rounded hover:bg-[var(--accent)]/10 transition-all"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className="text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-6 py-3 rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
            >
              Source Code
            </a>
          )}
        </div>

        <div className="border-t border-[var(--border)] pt-8">
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">About This Project</h2>
          {project.content?.split("\n\n").map((paragraph, i) => (
            <p key={i} className="text-[var(--text-secondary)] leading-relaxed mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
