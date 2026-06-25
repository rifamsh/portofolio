# Maulana Arif H.S — Portfolio

![Website Screenshot](public/screenshot.png)

Portfolio website personal untuk Maulana Arif Hikmat Suci — Full Stack Developer.  
Dibangun dengan Next.js, Tailwind CSS, Express.js, dan MySQL.  
Desain terinspirasi dari Brittany Chiang dengan tema dark/light dan aksen biru.

## Fitur

- **Landing page** — Hero, skills, featured projects, contact section
- **Dark/Light mode** — Toggle theme di navbar
- **Project gallery** — Grid dengan filter kategori (Full Stack, Frontend, Backend, DevOps)
- **Project detail** — Halaman detail dengan tech stack, link demo & source code
- **About page** — Profil, timeline experience, education, download CV
- **Admin panel** — Login, CRUD projects (tambah/edit/hapus)

## Tech Stack

| Frontend     | Backend    | Database |
| ------------ | ---------- | -------- |
| Next.js 16   | Express.js | MySQL    |
| Tailwind CSS | Prisma ORM | Railway  |
| TypeScript   | JWT Auth   | Vercel   |

## Struktur Project

```
porto/
├── frontend/          # Next.js app (Vercel)
│   └── src/
│       ├── app/       # Pages (landing, projects, about, admin)
│       ├── components/# UI components
│       └── lib/       # API client
├── backend/           # Express.js API (Railway)
│   ├── prisma/        # Schema & migrations
│   └── src/
│       ├── routes/    # Auth & projects CRUD
│       ├── middleware/ # JWT auth
│       └── seed.ts    # Seeder admin + sample projects
├── public/            # Screenshot
└── README.md
```

## Cara Menjalankan

### Prerequisites

- Node.js 22+
- MySQL (via Laragon atau langsung)
- Database `portofolio` sudah dibuat

### Backend

```bash
cd backend
npm install
npx prisma db push
npm run seed
npm run dev
```

API berjalan di `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:3000`.

## Admin Panel

|          |                |
| -------- | -------------- |
| URL      | `/admin/login` |
| Username | `maulana`      |
| Password | `admin123`     |

## Deploy

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Railway](https://railway.app)
- **Database** → Railway MySQL / PlanetScale

## License

MIT
