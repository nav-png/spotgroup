"use client";

import { useId, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function NewsletterForm({
  tone = "dark",
  source = "newsletter",
}: {
  tone?: "dark" | "light";
  source?: string;
}) {
  const fieldId = useId();
  const statusId = `${fieldId}-status`;
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "").trim();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "newsletter", email, source }),
      });
      const data: { errors?: Record<string, string> } = await response.json().catch(() => ({}));

      if (!response.ok) {
        setStatus("error");
        setMessage(data.errors?.email ?? "That did not go through. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You are on the list. Watch for the next release of inventory.");
      form.reset();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  const light = tone === "light";

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div
        className={`flex flex-col gap-3 sm:flex-row ${
          light ? "" : ""
        }`}
      >
        <label htmlFor={fieldId} className="sr-only">
          Email address
        </label>
        <input
          id={fieldId}
          name="email"
          type="email"
          required
          placeholder="Your email address"
          aria-describedby={statusId}
          className={`w-full rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-spot ${
            light
              ? "border border-ink/15 bg-white text-ink placeholder:text-ink-400"
              : "border border-white/20 bg-white/10 text-white placeholder:text-white/50"
          }`}
        />
        <button type="submit" className="btn-spot shrink-0" disabled={status === "submitting"}>
          {status === "submitting" ? "Joining…" : "Join the list"}
        </button>
      </div>
      <p
        id={statusId}
        role="status"
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-xs ${
          status === "error"
            ? "text-red-400"
            : light
              ? "text-ink-500"
              : "text-white/60"
        }`}
      >
        {message}
      </p>
    </form>
  );
}
