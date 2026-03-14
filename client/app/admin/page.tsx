"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import type { Project } from "@/types/project";
import {
  clearStoredAdminKey,
  getStoredAdminKey,
  setStoredAdminKey,
} from "@/lib/adminKey";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedKey = getStoredAdminKey();
    if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  const fetchProjects = async () => {
    if (!adminKey.trim()) {
      const errorText = "Enter admin key first.";
      setMessage(errorText);
      toast.error(errorText);
      return;
    }

    setStoredAdminKey(adminKey);
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/projects`, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch projects");
      }

      setProjects(data);
      toast.success("Projects loaded successfully.");
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Something went wrong";

      setMessage(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      return;
    }

    const confirmed = window.confirm("Delete this project?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete project");
      }

      setProjects((prev) => prev.filter((item) => item._id !== id));

      const successText = "Project deleted successfully.";
      setMessage(successText);
      toast.success(successText);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Failed to delete project";

      setMessage(errorText);
      toast.error(errorText);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold text-white">Admin Projects</h1>
          <p className="mt-3 text-zinc-300">
            View, edit, and manage portfolio projects.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:opacity-90"
        >
          New Project
        </Link>
      </div>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <label className="mb-3 block text-sm text-zinc-300">Admin Key</label>

        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            placeholder="Enter admin key"
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
          />

          <button
            type="button"
            onClick={fetchProjects}
            disabled={loading}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load Projects"}
          </button>

          <button
            type="button"
            onClick={() => {
              clearStoredAdminKey();
              setAdminKey("");
              setProjects([]);
              setMessage("Stored admin key cleared.");
              toast.success("Stored admin key cleared.");
            }}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5"
          >
            Clear Key
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-zinc-300">
            {message}
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-6">
        {!loading && projects.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-zinc-300">
            No projects loaded yet.
          </div>
        )}

        {projects.map((project) => (
          <div
            key={project._id || project.title}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
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

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {project.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project._id && (
                  <Link
                    href={`/admin/projects/${project._id}`}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
                  >
                    Edit
                  </Link>
                )}

                {project._id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(project._id)}
                    className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/15"
                  >
                    Delete
                  </button>
                )}

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
          </div>
        ))}
      </div>
    </main>
  );
}