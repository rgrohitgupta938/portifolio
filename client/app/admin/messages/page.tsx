"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "@/lib/api";
import {
  clearStoredAdminKey,
  getStoredAdminKey,
  setStoredAdminKey,
} from "@/lib/adminKey";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  handled?: boolean;
  createdAt?: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [adminKey, setAdminKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const savedKey = getStoredAdminKey();
    if (savedKey) {
      setAdminKey(savedKey);
    }
  }, []);

  const loadMessages = async () => {
    if (!adminKey.trim()) {
      const errorText = "Enter admin key first.";
      setMessageText(errorText);
      toast.error(errorText);
      return;
    }

    setStoredAdminKey(adminKey);
    setLoading(true);
    setMessageText("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/messages`, {
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch messages");
      }

      setMessages(data);
      toast.success("Messages loaded successfully.");
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Something went wrong";

      setMessageText(errorText);
      toast.error(errorText);
    } finally {
      setLoading(false);
    }
  };

  const toggleHandled = async (id: string, handled: boolean) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/messages/${id}/handled`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "x-admin-key": adminKey,
          },
          body: JSON.stringify({ handled: !handled }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update message");
      }

      setMessages((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, handled: !handled } : item,
        ),
      );

      toast.success(
        !handled ? "Message marked as handled." : "Message marked as pending.",
      );
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Failed to update message";

      setMessageText(errorText);
      toast.error(errorText);
    }
  };

  const deleteMessage = async (id: string) => {
    const confirmed = window.confirm("Delete this message?");
    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/messages/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete message");
      }

      setMessages((prev) => prev.filter((item) => item._id !== id));

      const successText = "Message deleted successfully.";
      setMessageText(successText);
      toast.success(successText);
    } catch (error) {
      const errorText =
        error instanceof Error ? error.message : "Failed to delete message";

      setMessageText(errorText);
      toast.error(errorText);
    }
  };

  return (
    <main className="mx-auto max-w-6xl px-6 pb-20 pt-16">
      <div className="mb-10">
        <h1 className="text-4xl font-semibold text-white">Admin Messages</h1>
        <p className="mt-3 text-zinc-300">
          Review, mark handled, and delete contact submissions.
        </p>
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
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
            onClick={loadMessages}
            disabled={loading}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Load Messages"}
          </button>

          <button
            type="button"
            onClick={() => {
              clearStoredAdminKey();
              setAdminKey("");
              setMessages([]);
              setMessageText("Stored admin key cleared.");
              toast.success("Stored admin key cleared.");
            }}
            className="rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:bg-white/5"
          >
            Clear Key
          </button>
        </div>

        {messageText && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/60 px-4 py-3 text-zinc-300">
            {messageText}
          </div>
        )}
      </section>

      <section className="mt-10 grid gap-6">
        {!loading && messages.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-zinc-300">
            No messages loaded yet.
          </div>
        )}

        {messages.map((item) => (
          <div
            key={item._id}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                    {item.email}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      item.handled
                        ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                        : "border border-yellow-500/20 bg-yellow-500/10 text-yellow-300"
                    }`}
                  >
                    {item.handled ? "Handled" : "Pending"}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold text-white">
                  {item.name}
                </h2>

                {item.subject && (
                  <p className="mt-2 text-sm text-zinc-400">
                    Subject: {item.subject}
                  </p>
                )}

                {item.createdAt && (
                  <p className="mt-2 text-xs text-zinc-500">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                )}

                <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-900/60 p-4 text-sm leading-7 text-zinc-300">
                  {item.message}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => toggleHandled(item._id, Boolean(item.handled))}
                  className="rounded-full border border-white/15 px-4 py-2 text-sm text-white transition hover:bg-white/5"
                >
                  {item.handled ? "Mark Pending" : "Mark Handled"}
                </button>

                <button
                  type="button"
                  onClick={() => deleteMessage(item._id)}
                  className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/15"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
