import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  const admin = await prisma.admin.upsert({
    where: { username: 'maulana' },
    update: {},
    create: {
      username: 'maulana',
      password,
    },
  });

  console.log('Admin user created:', admin.username);

  const projects = [
    {
      title: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'Platform belanja online dengan fitur real-time inventory management dan payment gateway terintegrasi.',
      content: 'Full-stack e-commerce platform built with React, Node.js, and PostgreSQL.',
      image: null,
      technologies: JSON.stringify(['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS']),
      category: 'Full Stack',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Task Management App',
      slug: 'task-management-app',
      description: 'Aplikasi manajemen tugas kolaboratif dengan drag-and-drop interface dan real-time updates.',
      content: 'Collaborative task management application with real-time updates using WebSocket.',
      image: null,
      technologies: JSON.stringify(['Next.js', 'TypeScript', 'Prisma', 'WebSocket']),
      category: 'Full Stack',
      liveUrl: '#',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Weather Dashboard',
      slug: 'weather-dashboard',
      description: 'Dashboard cuaca interaktif dengan visualisasi data dan forecast 7 hari.',
      content: 'Interactive weather dashboard consuming OpenWeatherMap API.',
      image: null,
      technologies: JSON.stringify(['React', 'Chart.js', 'Tailwind CSS', 'REST API']),
      category: 'Frontend',
      liveUrl: '#',
      githubUrl: '#',
      featured: false,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }

  console.log('Sample projects created');

  const skillNames = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Git',
    'Docker', 'REST APIs',
  ];

  for (const name of skillNames) {
    await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log('Default skills created');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
