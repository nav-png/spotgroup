"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { communities } from "@/lib/communities";
import { media } from "@/lib/media";

export function HomeHero() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [community, setCommunity] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (keyword.trim()) params.set("keyword", keyword.trim());
    if (community) params.set("community", community);
    const query = params.toString();
    router.push(query ? `/buy?${query}` : "/buy");
  }

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink pb-32 pt-32 text-white">
      {media.heroVideo ? (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={media.heroVideo}
          poster={media.hero}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <Image
          src={media.hero}
          alt="A contemporary Lower Mainland home at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60" />

      <div className="shell relative">
        <p className="eyebrow-light animate-fade-in">Lower Mainland, British Columbia</p>
        <h1 className="display-xl mt-6 max-w-[16ch] animate-fade-up">
          Know the
          <br />
          spot<span className="text-spot">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg text-white/80 md:text-xl">
          Resale homes, development land and new construction — represented by consultants who also
          build, invest and buy in these neighbourhoods.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-12 w-full max-w-3xl rounded-full bg-white/95 p-2 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] backdrop-blur sm:p-2.5"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex-1 px-5 py-2">
              <label htmlFor="hero-keyword" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                Location or MLS® number
              </label>
              <input
                id="hero-keyword"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="City, community, address or MLS®"
                className="field-pill -ml-2 mt-1"
              />
            </div>
            <div className="hidden h-10 w-px bg-ink/10 sm:block" />
            <div className="px-5 py-2 sm:w-56">
              <label htmlFor="hero-community" className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-500">
                Community
              </label>
              <select
                id="hero-community"
                value={community}
                onChange={(event) => setCommunity(event.target.value)}
                className="field-pill -ml-2 mt-1 bg-transparent"
              >
                <option value="">All communities</option>
                {communities.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn-spot w-full px-9 py-4 sm:w-auto">
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="shell relative mt-16 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60">
        <span className="inline-flex h-10 w-[1px] animate-pulse bg-white/40" aria-hidden="true" />
        Scroll
      </div>
    </section>
  );
}
