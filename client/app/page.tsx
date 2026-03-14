import Link from "next/link";
import AboutSkills from "@/components/home/AboutSkills";
import FeaturedProjects from "@/components/home/FeaturedProjects";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-16">
      <section className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-zinc-400 md:text-sm">
            AI Engineer • Data Scientist • GenAI Builder
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-white md:text-7xl">
            Building modern AI products and full-stack applications.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-8 text-zinc-300 md:text-lg">
            I build ML systems, LLM applications, data-driven products, and
            modern web experiences using Next.js, TypeScript, Node.js, MongoDB,
            and cloud deployment workflows.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-white px-7 py-3 text-sm font-medium text-black transition hover:opacity-90"
            >
              View Projects
            </Link>

            <a
              href="https://github.com/rgrohit"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              GitHub
            </a>

            <a
              href="/Rohit_Gupta_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Resume
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              LLM Apps
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              ML Pipelines
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              GenAI Systems
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              Full-Stack Products
            </span>
          </div>
        </div>

        <div className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/25">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-white">
              Profile Snapshot
            </h2>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              Open to Work
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-sm text-zinc-400">Location</p>
              <p className="mt-3 text-xl font-medium text-white">
                Rewa, Madhya Pradesh
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-sm text-zinc-400">Education</p>
              <p className="mt-3 text-xl font-medium text-white">
                M.Tech, BITS Pilani
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-sm text-zinc-400">Focus</p>
              <p className="mt-3 text-xl font-medium text-white">
                LLMs + ML + Full Stack
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5">
              <p className="text-sm text-zinc-400">Stack</p>
              <p className="mt-3 text-xl font-medium text-white">
                Next.js + Node + MongoDB
              </p>
            </div>
          </div>
        </div>
      </section>

      <AboutSkills />
      <FeaturedProjects />
    </main>
  );
}
