export default function Hero() {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center px-6 pt-20"
    >
      <div className="max-w-6xl mx-auto w-full">
        <p className="section-number mb-5">Hi, my name is</p>
        <h1 className="text-[clamp(40px,8vw,80px)] font-bold text-[var(--text-primary)] leading-[1.1]">
          Maulana Arif H.S.
        </h1>
        <h2 className="text-[clamp(40px,8vw,80px)] font-bold text-[var(--text-secondary)] leading-[1.1] mt-1">
          I build things for the web.
        </h2>
        <p className="mt-8 max-w-lg text-[var(--text-secondary)] text-lg leading-relaxed">
          I&apos;m a Full Stack Developer specializing in building exceptional
          digital experiences. Currently, I&apos;m focused on building
          accessible, human-centered products.
        </p>
        <div className="mt-10">
          <a
            href="/projects"
            className="inline-block text-sm font-[family-name:var(--font-mono)] text-[var(--accent)] border-2 border-[var(--accent)] px-7 py-4 rounded hover:bg-[var(--accent)]/10 transition-all"
          >
            Check out my work!
          </a>
        </div>
      </div>
    </section>
  );
}
