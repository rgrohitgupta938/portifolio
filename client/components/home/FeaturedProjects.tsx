"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { slugify } from "@/lib/slug";
import type { Project } from "@/types/project";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/projects`);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const text = await response.text();
        const data = text ? JSON.parse(text) : [];

        if (!Array.isArray(data)) {
          throw new Error("Projects response is not an array");
        }

        const featuredProjects = data
          .filter((item: Project) => item.featured)
          .slice(0, 3);

        setProjects(featuredProjects);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to load projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="mt-16 border-t border-white/10 pt-12">
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
            Featured Work
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Selected Projects
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-400 md:text-base">
            A selection of AI, machine learning, and intelligent product work
            focused on practical delivery and production-oriented thinking.
          </p>
        </div>

        <Link
          href="/projects"
          className="w-fit rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/5"
        >
          View All
        </Link>
      </div>

      {loading && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          Loading featured projects...
        </div>
      )}

      {errorMessage && (
        <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-6 text-red-300">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && projects.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          No featured projects found.
        </div>
      )}

      {!loading && !errorMessage && projects.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id || project.title}
              className="group flex h-full min-h-[320px] flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                  {project.category}
                </span>

                {project.featured && (
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-2xl font-semibold leading-tight text-white">
                {project.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-300">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={`/projects/${slugify(project.title)}`}
                  className="rounded-full bg-white px-4 py-2 text-sm text-black transition hover:opacity-90"
                >
                  View Details
                </Link>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
                >
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
