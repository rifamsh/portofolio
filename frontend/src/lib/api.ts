const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string | null;
  image: string | null;
  technologies: string[];
  category: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getProjects(params?: { category?: string; featured?: boolean }): Promise<Project[]> {
  const searchParams = new URLSearchParams();
  if (params?.category) searchParams.set("category", params.category);
  if (params?.featured) searchParams.set("featured", "true");

  const query = searchParams.toString();
  const res = await fetch(`${API_URL}/projects${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProject(slug: string): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Project not found");
  return res.json();
}

export async function createProject(data: FormData | Record<string, unknown>, token: string): Promise<Project> {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;
  const res = await fetch(`${API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Failed to create project");
  return res.json();
}

export async function updateProject(id: number, data: Record<string, unknown>, token: string): Promise<Project> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update project");
  return res.json();
}

export async function deleteProject(id: number, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete project");
}

export async function login(username: string, password: string): Promise<{ token: string; username: string }> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
}

export interface Skill {
  id: number;
  name: string;
}

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(`${API_URL}/skills`);
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

export async function createSkill(name: string, token: string): Promise<Skill> {
  const res = await fetch(`${API_URL}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error("Failed to create skill");
  return res.json();
}

export async function deleteSkill(id: number, token: string): Promise<void> {
  const res = await fetch(`${API_URL}/skills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to delete skill");
}

export const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Backend",
  "Mobile",
  "DevOps",
];

export const skills = [
  { name: "React", level: 90 },
  { name: "Next.js", level: 85 },
  { name: "TypeScript", level: 85 },
  { name: "Node.js", level: 80 },
  { name: "Tailwind CSS", level: 90 },
  { name: "PostgreSQL", level: 75 },
  { name: "Prisma", level: 80 },
  { name: "Docker", level: 65 },
  { name: "Git", level: 85 },
  { name: "REST API", level: 85 },
];
