import Link from "next/link";

export default function CTABand() {
  return (
    <section id="contact" className="px-6 py-32 text-center">
      <div className="max-w-xl mx-auto">
        <p className="section-number mb-4">04. What&apos;s Next?</p>
        <h2 className="text-[clamp(40px,5vw,60px)] font-bold text-[var(--text-primary)] leading-[1.1]">
          Get In Touch
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
          I&apos;m currently open to new opportunities and always happy to chat
          about tech, projects, or collaboration. Feel free to reach out!
        </p>
        <div className="mt-10">
          <a
            href="mailto:maulana@example.com"
            className="inline-block text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-8 py-4 rounded hover:bg-[var(--accent)]/10 transition-all"
          >
            Say Hello
          </a>
        </div>
      </div>
    </section>
  );
}
