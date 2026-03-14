"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import { isValidEmail, requireText } from "@/lib/validation";
type FormDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactPage() {
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const nameError = requireText(formData.name, "Name");
    if (nameError) {
      toast.error(nameError);
      setLoading(false);
      return;
    }

    if (!isValidEmail(formData.email)) {
      toast.error("Enter a valid email address.");
      setLoading(false);
      return;
    }

    const messageError = requireText(formData.message, "Message");
    if (messageError) {
      toast.error(messageError);
      setLoading(false);
      return;
    }
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success("Your message has been sent successfully.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-bold">Contact</h1>
      <p className="mt-4 text-zinc-300">
        Reach out for AI/ML, GenAI, and full-stack opportunities.
      </p>

      <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-zinc-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/30"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/30"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="Enter subject"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-300">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-white/30"
              placeholder="Write your message"
            />
          </div>

          {successMessage && (
            <div className="rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </main>
  );
}
