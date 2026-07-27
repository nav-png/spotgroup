"use client";

import { useCallback, useEffect, useRef } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Locks body scroll, traps focus, and closes on Escape while `open`. */
export function useOverlay(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  const focusables = useCallback(() => {
    const node = containerRef.current;
    if (!node) return [] as HTMLElement[];
    return Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
  }, []);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const first = focusables()[0] ?? containerRef.current;
    first?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;

      const items = focusables();
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === firstItem || !containerRef.current?.contains(active))) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && active === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose, focusables]);

  return containerRef;
}

export function Modal({
  open,
  onClose,
  label,
  children,
  variant = "center",
  className,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  variant?: "center" | "full" | "sheet" | "top";
  className?: string;
}) {
  const containerRef = useOverlay(open, onClose);
  if (!open) return null;

  const position = {
    center: "items-center justify-center p-4 sm:p-8",
    full: "items-stretch justify-center",
    sheet: "items-end justify-center sm:items-center sm:p-8",
    top: "items-start justify-center",
  }[variant];

  return (
    <div className={`fixed inset-0 z-[100] flex ${position}`} role="presentation">
      <button
        type="button"
        aria-label="Close overlay"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm animate-fade-in"
        tabIndex={-1}
      />
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        className={`relative z-10 w-full animate-fade-up focus:outline-none ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}

export function CloseButton({
  onClose,
  className,
  tone = "dark",
  label = "Close",
}: {
  onClose: () => void;
  className?: string;
  tone?: "dark" | "light";
  label?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClose}
      aria-label={label}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition ${
        tone === "light"
          ? "border-white/30 text-white hover:border-spot hover:bg-spot hover:text-ink"
          : "border-ink/15 text-ink hover:border-ink hover:bg-ink hover:text-white"
      } ${className ?? ""}`}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
        <path
          d="M5 5l14 14M19 5L5 19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </button>
  );
}
