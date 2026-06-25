"use client";

import { useEffect, useState } from "react";
import { getSkills } from "@/lib/api";

export default function SkillsSection() {
  const [skills, setSkills] = useState<string[]>([]);

  useEffect(() => {
    getSkills()
      .then((data) => setSkills(data.map((s) => s.name)))
      .catch(() => {});
  }, []);

  return (
    <section id="experience" className="px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="section-title">
          <span className="section-number">02.</span>
          Technologies I Work With
        </h2>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <div
              key={skill}
              className="bg-[var(--bg-secondary)] rounded px-4 py-3 text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] hover:bg-[var(--bg-tertiary)] transition-all cursor-default"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
