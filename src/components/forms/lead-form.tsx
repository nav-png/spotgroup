"use client";

import { useState } from "react";

import type { LeadType } from "@/lib/leads";

export interface LeadField {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select";
  options?: string[];
  placeholder?: string;
  required?: boolean;
  full?: boolean;
}

const coreFields = new Set(["name", "email", "phone", "message"]);

export function LeadForm({
  leadType,
  fields,
  source,
  submitLabel = "Send",
  successTitle = "Thanks — your request is in.",
  successBody = "You will hear back within one business day.",
  bare = false,
  tone = "light",
  footnote = "No obligation. Your information is never sold or shared.",
}: {
  leadType: LeadType;
  fields: LeadField[];
  source?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  /** Renders without the surrounding panel, for use inside cards and modals. */
  bare?: boolean;
  tone?: "light" | "dark";
  footnote?: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dark = tone === "dark";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrors({});

    const data = new FormData(event.currentTarget);
    const details: Record<string, string> = {};
    for (const field of fields) {
      if (!coreFields.has(field.name)) {
        details[field.label] = String(data.get(field.name) ?? "");
      }
    }

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: leadType,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          message: data.get("message"),
          details,
          source,
        }),
      });

      if (response.ok) {
        setStatus("success");
        return;
      }

      const payload = (await response.json().catch(() => null)) as
        | { errors?: Record<string, string> }
        | null;
      setErrors(payload?.errors ?? {});
      setStatus("error");
    } catch {
      setStatus("error");
      setErrors({ form: "Something went wrong. Please call or email us instead." });
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className={`rounded-card px-6 py-12 text-center ${
          dark ? "bg-white/[0.06] text-white" : "border border-ink/10 bg-ink-50"
        }`}
      >
        <p className="font-display text-2xl font-extrabold uppercase leading-tight">
          {successTitle}
        </p>
        <p className={`mx-auto mt-3 max-w-md text-sm ${dark ? "text-white/70" : "text-ink-500"}`}>
          {successBody}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={bare ? "grid gap-5" : `grid gap-5 rounded-card p-6 sm:p-8 ${dark ? "bg-white/[0.06]" : "border border-ink/10 bg-white"}`}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `lead-${leadType}-${field.name}`;
          const error = errors[field.name];
          const describedBy = error ? `${id}-error` : undefined;
          const fieldClass = `field ${dark ? "border-white/20 bg-white/[0.06] text-white placeholder:text-white/40 focus:border-spot" : ""}`;

          return (
            <div
              key={field.name}
              className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}
            >
              <label className={`field-label ${dark ? "text-white/60" : ""}`} htmlFor={id}>
                {field.label}
                {field.required ? <span className="text-spot"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={fieldClass}
                />
              ) : field.type === "select" ? (
                <select
                  id={id}
                  name={field.name}
                  required={field.required}
                  defaultValue=""
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={fieldClass}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {(field.options ?? []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={id}
                  name={field.name}
                  type={field.type ?? "text"}
                  required={field.required}
                  placeholder={field.placeholder}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={describedBy}
                  className={fieldClass}
                />
              )}
              {error ? (
                <p id={`${id}-error`} className="mt-2 text-sm text-red-500">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div aria-live="polite">
        {errors.form ? <p className="text-sm text-red-500">{errors.form}</p> : null}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-spot" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </button>
        <p className={`max-w-xs text-xs ${dark ? "text-white/50" : "text-ink-500"}`}>{footnote}</p>
      </div>
    </form>
  );
}
