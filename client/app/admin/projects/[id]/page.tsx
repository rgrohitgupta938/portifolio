"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import { getStoredAdminKey, setStoredAdminKey } from "@/lib/adminKey";
import { requireText, requireUrl } from "@/lib/validation";

type ProjectForm = {
  title: string;
  description: string;
  github: string;
  live: string;
  techStack: string;
  category: string;
  featured: boolean;
  problem: string;
  approach: string;
  outcome: string;
  features: string;
  screenshots: string;
  adminKey: string;
};

export default function EditProjectPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const [formData, setFormData] = useState<ProjectForm>({
    title: "",
    description: "",
    github: "",
    live: "",
    techStack: "",
    category: "",
    featured: false,
    problem: "",
    approach: "",
    outcome: "",
    features: "",
    screenshots: "",
    adminKey: "",
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedKey = getStoredAdminKey();

    if (savedKey) {
      setFormData((prev) => ({
        ...prev,
        adminKey: savedKey,
      }));
    }
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const loadProject = async () => {
    if (!formData.adminKey.trim()) {
      const errorText = "Admin key is required.";
      setMessage(errorText);
      toast.error(errorText);
      return;
    }

    if (!id) {
      const errorText = "Project ID is missing.";
      setMessage(errorText);
      toast.error(errorText);
      return;
    }

    setFetching(true);
    setMessage("");
    setStoredAdminKey(formData.adminKey);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, {
        headers: {
          "x-admin-key": formData.adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load project");
      }

      setFormData((prev) => ({
        ...prev,
        title: data.title || "",
        description: data.description || "",
        github: data.github || "",
        live: data.live || "",
        category: data.category || "",
        featured: Boolean(data.featured),
        problem: data.problem || "",
        approach: data.approach || "",
        outcome: data.outcome || "",
        techStack: Array.isArray(data.techStack)
          ? data.techStack.join(", ")
          : "",
        features: Array.isArray(data.features) ? data.features.join(", ") : "",
        screenshots: Array.isArray(data.screenshots)
          ? data.screenshots.join(", ")
          : "",
      }));

      toast.success("Project loaded successfully.");
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Failed to load project";

      setMessage(errorText);
      toast.error(errorText);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const titleError = requireText(formData.title, "Title");
    if (titleError) {
      setLoading(false);
      setMessage(titleError);
      toast.error(titleError);
      return;
    }

    const descriptionError = requireText(formData.description, "Description");
    if (descriptionError) {
      setLoading(false);
      setMessage(descriptionError);
      toast.error(descriptionError);
      return;
    }

    const githubError = requireUrl(formData.github, "GitHub URL");
    if (githubError) {
      setLoading(false);
      setMessage(githubError);
      toast.error(githubError);
      return;
    }

    if (formData.live.trim()) {
      const liveError = requireUrl(formData.live, "Live URL");
      if (liveError) {
        setLoading(false);
        setMessage(liveError);
        toast.error(liveError);
        return;
      }
    }

    const categoryError = requireText(formData.category, "Category");
    if (categoryError) {
      setLoading(false);
      setMessage(categoryError);
      toast.error(categoryError);
      return;
    }

    if (!formData.adminKey.trim()) {
      const errorText = "Admin key is required.";
      setLoading(false);
      setMessage(errorText);
      toast.error(errorText);
      return;
    }

    try {
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        github: formData.github.trim(),
        live: formData.live.trim(),
        category: formData.category.trim(),
        featured: formData.featured,
        problem: formData.problem.trim(),
        approach: formData.approach.trim(),
        outcome: formData.outcome.trim(),
        techStack: formData.techStack
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        features: formData.features
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
        screenshots: formData.screenshots
          .split(",")
          .map((x) => x.trim())
          .filter(Boolean),
      };

      setStoredAdminKey(formData.adminKey);

      const response = await fetch(`${API_BASE_URL}/api/admin/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": formData.adminKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update project");
      }

      const successText = "Project updated successfully.";
      setMessage(successText);
      toast.success(successText);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Something went wrong";

      setMessage(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-16">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold text-white">Edit Project</h1>
          <p className="mt-3 text-zinc-300">
            Update an existing portfolio project.
          </p>
        </div>

        <Link
          href="/admin/projects"
          className="rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition hover:bg-white/5"
        >
          Back
        </Link>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <label className="mb-3 block text-sm text-zinc-300">Admin Key</label>
        <div className="flex flex-col gap-3 md:flex-row">
          <input
            type="password"
            name="adminKey"
            value={formData.adminKey}
            onChange={handleChange}
            placeholder="Enter admin key"
            className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
          />
          <button
            type="button"
            onClick={loadProject}
            disabled={fetching}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5 disabled:opacity-60"
          >
            {fetching ? "Loading..." : "Load Project"}
          </button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="live"
          placeholder="Live URL"
          value={formData.live}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="techStack"
          placeholder="Tech stack comma separated"
          value={formData.techStack}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <textarea
          name="problem"
          placeholder="Problem"
          value={formData.problem}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <textarea
          name="approach"
          placeholder="Approach"
          value={formData.approach}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <textarea
          name="outcome"
          placeholder="Outcome"
          value={formData.outcome}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="features"
          placeholder="Features comma separated"
          value={formData.features}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <input
          name="screenshots"
          placeholder="Screenshot paths comma separated"
          value={formData.screenshots}
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white"
        />

        <label className="flex items-center gap-3 text-zinc-300">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured project
        </label>

        {message && (
          <div className="rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-zinc-300">
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Update Project"}
        </button>
      </form>
    </main>
  );
}