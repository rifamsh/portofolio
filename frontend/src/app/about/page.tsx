import Link from "next/link";
import { Download, MapPin, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="section-title">
          <span className="section-number">01.</span>
          About Me
        </h2>

        <div className="mt-12 grid md:grid-cols-[1fr_2fr] gap-12">
          <div className="order-2 md:order-1">
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Hi! I&apos;m Maulana, a Full Stack Developer based in Indonesia.
              I enjoy creating things that live on the internet — from
              full-stack applications to beautiful, responsive interfaces.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              I specialize in React, Next.js, Node.js, and TypeScript, and I&apos;m
              passionate about building products that make a real difference.
            </p>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <MapPin size={14} className="text-[var(--accent)]" />
                Indonesia
              </div>
              <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Mail size={14} className="text-[var(--accent)]" />
                maulana@example.com
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-6 py-3 rounded hover:bg-[var(--accent)]/10 transition-all"
              >
                <Download size={14} />
                Download CV
              </a>
              <a
                href="mailto:maulana@example.com"
                className="inline-flex items-center gap-2 text-sm font-[family-name:var(--font-mono)] text-[var(--text-secondary)] border border-[var(--border)] px-6 py-3 rounded hover:text-[var(--accent)] hover:border-[var(--accent)] transition-all"
              >
                <Mail size={14} />
                Contact Me
              </a>
            </div>
          </div>

          <div className="order-1 md:order-2">
            <div className="relative w-60 h-60 mx-auto md:mx-0">
              <div className="w-full h-full rounded bg-[var(--accent)]/20 flex items-center justify-center text-6xl font-bold text-[var(--accent)]/30">
                M
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full rounded border-2 border-[var(--accent)] -z-10" />
            </div>
          </div>
        </div>

        <h2 className="section-title mt-20">
          <span className="section-number">02.</span>
          Experience
        </h2>

        <div className="mt-12 space-y-8">
          {[
            {
              role: "Full Stack Developer",
              company: "Tech Company",
              period: "2023 — Present",
              items: [
                "Develop and maintain web applications using React, Node.js, and PostgreSQL",
                "Collaborate with cross-functional teams to deliver high-quality features",
                "Implement CI/CD pipelines and automated testing workflows",
              ],
            },
            {
              role: "Frontend Developer",
              company: "Digital Agency",
              period: "2021 — 2023",
              items: [
                "Built responsive user interfaces with React and Tailwind CSS",
                "Optimized application performance and accessibility",
                "Mentored junior developers and conducted code reviews",
              ],
            },
            {
              role: "Junior Developer",
              company: "Startup",
              period: "2020 — 2021",
              items: [
                "Contributed to full-stack feature development",
                "Learned and adopted modern web development practices",
              ],
            },
          ].map((exp, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] mt-1.5" />
                <div className="w-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="pb-8">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{exp.role}</h3>
                  <span className="text-[var(--accent)]">@</span>
                  <span className="text-[var(--accent)]">{exp.company}</span>
                </div>
                <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--text-secondary)] mb-3">{exp.period}</p>
                <ul className="space-y-1.5">
                  {exp.items.map((item, j) => (
                    <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--accent)] mt-1.5">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <h2 className="section-title mt-12">
          <span className="section-number">03.</span>
          Education
        </h2>

        <div className="mt-12 space-y-8">
          {[
            {
              degree: "S1 Teknik Informatika",
              school: "Universitas Indonesia",
              period: "2016 — 2020",
              items: ["Lulus dengan predikat cumlaude", "Fokus pada pengembangan web dan basis data"],
            },
          ].map((edu, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] mt-1.5" />
                <div className="w-px flex-1 bg-[var(--border)]" />
              </div>
              <div className="pb-4">
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{edu.degree}</h3>
                <p className="text-[var(--accent)] mb-1">{edu.school}</p>
                <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--text-secondary)] mb-3">{edu.period}</p>
                <ul className="space-y-1.5">
                  {edu.items.map((item, j) => (
                    <li key={j} className="text-sm text-[var(--text-secondary)] flex gap-2">
                      <span className="text-[var(--accent)] mt-1.5">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
