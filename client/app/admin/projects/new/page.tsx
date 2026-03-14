"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { API_BASE_URL } from "@/lib/api";
import { getStoredAdminKey, setStoredAdminKey } from "@/lib/adminKey";
import { toast } from "sonner";
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

export default function NewProjectPage() {
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
  const [message, setMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const target = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const titleError = requireText(formData.title, "Title");
    if (titleError) {
      toast.error(titleError);
      setLoading(false);
      return;
    }

    const descriptionError = requireText(formData.description, "Description");
    if (descriptionError) {
      toast.error(descriptionError);
      setLoading(false);
      return;
    }

    const githubError = requireUrl(formData.github, "GitHub URL");
    if (githubError) {
      toast.error(githubError);
      setLoading(false);
      return;
    }

    const categoryError = requireText(formData.category, "Category");
    if (categoryError) {
      toast.error(categoryError);
      setLoading(false);
      return;
    }

    if (!formData.adminKey.trim()) {
      toast.error("Admin key is required.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        github: formData.github,
        live: formData.live,
        category: formData.category,
        featured: formData.featured,
        problem: formData.problem,
        approach: formData.approach,
        outcome: formData.outcome,
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

      const response = await fetch(`${API_BASE_URL}/api/admin/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": formData.adminKey,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create project");
      }

      toast.success("Project created successfully.");
      setMessage("Project created successfully.");

      setFormData({
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
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(errorText);
      setMessage(errorText);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = getStoredAdminKey();

    if (savedKey) {
      setFormData((prev) => ({
        ...prev,
        adminKey: savedKey,
      }));
    }
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-6 pb-20 pt-16">
      <h1 className="text-4xl font-semibold text-white">Create Project</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8"
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

        <input
          name="adminKey"
          type="password"
          placeholder="Admin key"
          value={formData.adminKey}
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
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </main>
  );
}
