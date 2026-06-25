import Link from "next/link";

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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative bg-[var(--bg-secondary)] rounded overflow-hidden hover:-translate-y-2 transition-all duration-300"
    >
      {project.image ? (
        <div className="aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="flex items-center justify-between p-7 pb-0">
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
      )}

      <div className="p-7">
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
      </div>
    </Link>
  );
}
