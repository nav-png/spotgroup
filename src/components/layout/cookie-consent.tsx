"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "spot-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // Storage unavailable (private mode): stay quiet rather than nagging.
    }
  }, []);

  function decide(choice: "accepted" | "declined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, choice);
    } catch {
      // Ignore storage failures; the banner still closes for this session.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-3 bottom-3 z-[70] rounded-card bg-ink p-5 text-white shadow-2xl sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-white/80">
        We use essential cookies to run this site, and measurement cookies to understand which
        properties and guides people find useful. You can decline the optional ones.{" "}
        <Link href="/privacy" className="underline decoration-spot underline-offset-4">
          Privacy policy
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={() => decide("accepted")} className="btn-spot px-6 py-3 text-xs">
          Accept
        </button>
        <button
          type="button"
          onClick={() => decide("declined")}
          className="btn-outline-light px-6 py-3 text-xs"
        >
          Essential only
        </button>
      </div>
    </div>
  );
}
