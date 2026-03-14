"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { API_BASE_URL } from "@/lib/api";
import { slugify } from "@/lib/slug";
import type { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("API_BASE_URL:", API_BASE_URL);
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

        setProjects(data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to fetch projects"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category).filter(Boolean))
    );
    return ["All", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return projects;
    }

    return projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <main className="mx-auto max-w-7xl px-6 pb-20 pt-16">
      <section className="border-b border-white/10 pb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-400">
          Projects
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Selected AI, ML, and full-stack work.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
          A curated set of projects focused on practical delivery, product
          thinking, and production-oriented engineering across machine learning,
          generative AI, and intelligent systems.
        </p>
      </section>

      <section className="pt-10">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => {
            const isActive = activeFilter === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  isActive
                    ? "bg-white text-black"
                    : "border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {loading && (
        <section className="pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
            Loading projects...
          </div>
        </section>
      )}

      {errorMessage && (
        <section className="pt-10">
          <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-6 text-red-300">
            {errorMessage}
          </div>
        </section>
      )}

      {!loading && !errorMessage && filteredProjects.length === 0 && (
        <section className="pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
            No projects found for this category.
          </div>
        </section>
      )}

      {!loading && !errorMessage && filteredProjects.length > 0 && (
        <section className="grid gap-6 pt-10 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project._id || project.title}
              className="group flex h-full min-h-[340px] flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
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

              <h2 className="mt-5 text-2xl font-semibold leading-tight text-white">
                {project.title}
              </h2>

              <p className="mt-4 flex-1 text-sm leading-7 text-zinc-300">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
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

                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
