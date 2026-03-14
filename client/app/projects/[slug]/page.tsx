"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";
import { slugify } from "@/lib/slug";
import type { Project } from "@/types/project";

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

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

        setProjects(data);
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Failed to fetch project"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const project = useMemo(() => {
    return projects.find((item) => slugify(item.title) === slug);
  }, [projects, slug]);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          Loading project...
        </div>
      </main>
    );
  }

  if (errorMessage) {
    return (
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-16">
        <div className="rounded-3xl border border-red-500/25 bg-red-500/10 p-6 text-red-300">
          {errorMessage}
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="mx-auto max-w-5xl px-6 pb-20 pt-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-zinc-300">
          Project not found.
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 pb-20 pt-16">
      <div className="mb-8">
        <Link
          href="/projects"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/5"
        >
          Back to Projects
        </Link>
      </div>

      <section className="rounded-[32px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
            {project.category}
          </span>

          {project.featured && (
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
              Featured
            </span>
          )}
        </div>

        <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
          {project.title}
        </h1>

        <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-300 md:text-lg">
          {project.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Problem</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {project.problem || "Add project problem statement here."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Approach</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {project.approach || "Add project approach here."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Outcome</h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              {project.outcome || "Add project outcome here."}
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Key Features</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {(project.features || []).map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Screenshots</h2>

            {project.screenshots && project.screenshots.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {project.screenshots.map((imagePath) => (
                  <div
                    key={imagePath}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                  >
                    <img
                      src={imagePath}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-zinc-400">
                No screenshots added yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            View GitHub
          </a>

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/5"
            >
              Live Demo
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
