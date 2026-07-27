import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { PageHero } from "@/components/layout/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { media } from "@/lib/media";
import { team } from "@/lib/team";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the SPOT Group team — Lower Mainland real estate consultants who also build, invest and buy in the communities they represent.",
  alternates: { canonical: "/team" },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title={
          <>
            Consultants, builders, investors<span className="text-spot">.</span>
          </>
        }
        lede="A small team on purpose. You deal with the person who walked your property, not a coordinator two steps removed from the file."
        image={media.team}
      />

      <section className="section">
        <div className="shell space-y-24">
          {team.map((member, index) => (
            <Reveal key={member.slug}>
              <article
                className={`grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link href={`/team/${member.slug}`} className="group block">
                  <div className="media media-zoom aspect-[4/5] rounded-card">
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover object-top"
                      priority={index === 0}
                    />
                  </div>
                </Link>

                <div>
                  <h2 className="display-md">{member.name}</h2>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
                    {member.role}
                  </p>
                  {member.licence ? (
                    <p className="mt-2 text-xs text-ink-400">{member.licence}</p>
                  ) : null}
                  <p className="mt-7 max-w-prose text-base leading-relaxed text-ink-700">
                    {member.bio[0]}
                  </p>
                  <ul className="mt-8 flex flex-wrap gap-2">
                    {member.focus.map((focus) => (
                      <li key={focus} className="chip">
                        {focus}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-9 flex flex-wrap items-center gap-6 text-sm">
                    <Link href={`/team/${member.slug}`} className="btn-dark">
                      Full profile
                    </Link>
                    {member.phone ? (
                      <a href={`tel:${member.phone.replace(/[^\d+]/g, "")}`} className="hover:text-spot">
                        {member.phone}
                      </a>
                    ) : null}
                    {member.email ? (
                      <a href={`mailto:${member.email}`} className="hover:text-spot">
                        {member.email}
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
