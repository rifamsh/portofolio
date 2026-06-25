import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().optional(),
  image: z.string().optional(),
  technologies: z.array(z.string()).default([]),
  category: z.string().optional(),
  liveUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  featured: z.boolean().default(false),
});

function formatProject(project: any) {
  return {
    ...project,
    technologies:
      typeof project.technologies === 'string'
        ? JSON.parse(project.technologies)
        : project.technologies,
  };
}

router.get('/', async (req: Request, res: Response) => {
  try {
    const { category, featured } = req.query;
    const where: Record<string, unknown> = {};

    if (typeof category === 'string') {
      where.category = category;
    }
    if (featured === 'true') {
      where.featured = true;
    }

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(projects.map(formatProject));
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const project = await prisma.project.findUnique({
      where: { slug },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json(formatProject(project));
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const data = projectSchema.parse(req.body);

    const existing = await prisma.project.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return res.status(409).json({ error: 'Project with this slug already exists' });
    }

    const project = await prisma.project.create({
      data: {
        ...data,
        technologies: JSON.stringify(data.technologies),
      },
    });

    res.status(201).json(formatProject(project));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    const data = projectSchema.partial().parse(req.body);

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...data,
        technologies: data.technologies
          ? JSON.stringify(data.technologies)
          : undefined,
      },
    });

    res.json(formatProject(project));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.issues });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string, 10);
    await prisma.project.delete({ where: { id } });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
