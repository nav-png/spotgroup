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
  compact = false,
}: {
  leadType: LeadType;
  fields: LeadField[];
  source?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

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
        className="rounded-2xl border border-brass/40 bg-brass/10 px-6 py-10 text-center"
      >
        <p className="font-display text-2xl font-semibold">{successTitle}</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={
        compact
          ? "grid gap-4"
          : "grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm sm:p-8"
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => {
          const id = `lead-${field.name}`;
          const error = errors[field.name];
          return (
            <div key={field.name} className={field.full || field.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="field-label" htmlFor={id}>
                {field.label}
                {field.required ? <span className="text-brass"> *</span> : null}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  id={id}
                  name={field.name}
                  rows={4}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="field"
                />
              ) : field.type === "select" ? (
                <select id={id} name={field.name} required={field.required} className="field" defaultValue="">
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
                  className="field"
                />
              )}
              {error ? <p className="mt-1 text-sm text-red-600">{error}</p> : null}
            </div>
          );
        })}
      </div>

      {errors.form ? <p className="text-sm text-red-600">{errors.form}</p> : null}

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : submitLabel}
        </button>
        <p className="text-xs text-ink-muted">
          No obligation. Your information is never sold or shared.
        </p>
      </div>
    </form>
  );
}
