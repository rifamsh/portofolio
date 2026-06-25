# Frontend — Portfolio Website

Next.js 16 app dengan Tailwind CSS. Desain terinspirasi Brittany Chiang.

## Pages

| Route | Halaman |
|---|---|
| `/` | Landing (hero, skills, featured projects, contact) |
| `/projects` | Semua project dengan filter kategori |
| `/projects/[slug]` | Detail project |
| `/about` | About me, experience timeline, education |
| `/admin/login` | Login admin |
| `/admin` | Dashboard CRUD projects |
| `/admin/projects/new` | Tambah project |
| `/admin/projects/edit?slug=` | Edit project |

## Commands

```bash
npm run dev     # Development server
npm run build   # Production build
npm run lint    # ESLint
```

## Design System

- Font: Inter (body) + JetBrains Mono (code/labels)
- Warna: CSS variables di `globals.css` (`--bg-primary`, `--accent`, etc.)
- Dark/Light: class `.light` di `<html>`, toggle via `ThemeToggle.tsx`
