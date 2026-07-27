import { NextResponse } from "next/server";

import { saveLead, validateLead } from "@/lib/leads";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: { form: "Invalid request." } }, { status: 400 });
  }

  const result = validateLead((body ?? {}) as Record<string, unknown>);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  await saveLead(result.lead);

  return NextResponse.json({ ok: true });
}
