"use client";

import Image from "next/image";
import { useState } from "react";

export function ListingGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
        <Image src={current} alt={alt} fill priority className="object-cover" sizes="(min-width: 1024px) 760px, 100vw" />
      </div>

      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show photo ${index + 1}`}
              aria-current={index === active}
              className={`relative aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                index === active ? "border-brass" : "border-transparent hover:border-ink/20"
              }`}
            >
              <Image src={image} alt="" fill className="object-cover" sizes="180px" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
