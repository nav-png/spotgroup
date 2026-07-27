"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import { CloseButton, Modal } from "@/components/ui/modal";

export function PropertyGallery({ images, address }: { images: string[]; address: string }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const open = lightboxIndex !== null;

  const step = useCallback(
    (direction: 1 | -1) =>
      setLightboxIndex((current) =>
        current === null ? current : (current + direction + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, step]);

  const [hero, ...rest] = images;

  return (
    <>
      <div className="grid gap-3 md:grid-cols-[1.6fr_1fr]">
        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          className="media media-zoom group aspect-[4/3] rounded-card md:aspect-[3/2]"
          aria-label="Open full screen gallery"
        >
          <Image
            src={hero}
            alt={`${address} — photo 1`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover"
          />
          <span className="absolute bottom-4 left-4 tag">{images.length} photos</span>
        </button>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          {rest.slice(0, 3).map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setLightboxIndex(index + 1)}
              className="media media-zoom aspect-[4/3] rounded-card md:aspect-auto md:h-full"
              aria-label={`Open photo ${index + 2}`}
            >
              <Image
                src={image}
                alt={`${address} — photo ${index + 2}`}
                fill
                sizes="(max-width: 768px) 50vw, 30vw"
                className="object-cover"
              />
            </button>
          ))}
          {rest.length > 3 ? (
            <button type="button" onClick={() => setLightboxIndex(4)} className="btn-outline">
              View all {images.length} photos
            </button>
          ) : null}
        </div>
      </div>

      <Modal
        open={open}
        onClose={() => setLightboxIndex(null)}
        label={`${address} photo gallery`}
        variant="full"
        className="h-full max-w-none"
      >
        <div className="flex h-full flex-col bg-ink/95">
          <div className="flex items-center justify-between px-6 py-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.18em]">
              {(lightboxIndex ?? 0) + 1} / {images.length}
            </p>
            <CloseButton onClose={() => setLightboxIndex(null)} tone="light" label="Close gallery" />
          </div>

          <div className="relative flex-1">
            {open ? (
              <Image
                src={images[lightboxIndex]}
                alt={`${address} — photo ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            ) : null}
          </div>

          <div className="flex items-center justify-center gap-4 px-6 py-6">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-spot hover:bg-spot hover:text-ink"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-spot hover:bg-spot hover:text-ink"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
