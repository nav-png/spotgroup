import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

export type LeadType = "cash-offer" | "contact" | "listing-inquiry" | "exclusive-access";

export interface Lead {
  type: LeadType;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  /** Free-form answers specific to the form the lead came from. */
  details?: Record<string, string>;
  source?: string;
  receivedAt: string;
}

export interface LeadInput {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  details?: unknown;
  source?: unknown;
}

const leadTypes: LeadType[] = ["cash-offer", "contact", "listing-inquiry", "exclusive-access"];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ValidationResult =
  | { ok: true; lead: Lead }
  | { ok: false; errors: Record<string, string> };

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateLead(input: LeadInput): ValidationResult {
  const errors: Record<string, string> = {};

  const type = text(input.type) as LeadType;
  if (!leadTypes.includes(type)) errors.type = "Unknown form type.";

  const name = text(input.name);
  if (name.length < 2) errors.name = "Please enter your name.";

  const email = text(input.email);
  if (!emailPattern.test(email)) errors.email = "Please enter a valid email address.";

  const phone = text(input.phone);
  if (type === "cash-offer" && phone.replace(/\D/g, "").length < 10) {
    errors.phone = "A phone number is required so we can discuss your offer.";
  }

  const details: Record<string, string> = {};
  if (input.details && typeof input.details === "object" && !Array.isArray(input.details)) {
    for (const [key, value] of Object.entries(input.details as Record<string, unknown>)) {
      const parsed = text(value);
      if (parsed) details[key] = parsed.slice(0, 2000);
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  return {
    ok: true,
    lead: {
      type,
      name: name.slice(0, 200),
      email: email.slice(0, 200),
      phone: phone ? phone.slice(0, 40) : undefined,
      message: text(input.message).slice(0, 4000) || undefined,
      details: Object.keys(details).length > 0 ? details : undefined,
      source: text(input.source).slice(0, 200) || undefined,
      receivedAt: new Date().toISOString(),
    },
  };
}

/**
 * Persists a lead. Writes newline-delimited JSON to LEADS_FILE (default
 * ./data/leads.jsonl) and, when LEADS_WEBHOOK_URL is set, forwards it to a CRM
 * or automation endpoint. Swap this for a database or CRM client later.
 */
export async function saveLead(lead: Lead): Promise<void> {
  const filePath = process.env.LEADS_FILE ?? path.join(process.cwd(), "data", "leads.jsonl");

  try {
    await mkdir(path.dirname(filePath), { recursive: true });
    await appendFile(filePath, `${JSON.stringify(lead)}\n`, "utf8");
  } catch (error) {
    console.error("Failed to write lead to disk", error);
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (error) {
      console.error("Failed to forward lead to webhook", error);
    }
  }
}
