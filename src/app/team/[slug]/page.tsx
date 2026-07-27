import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LeadForm } from "@/components/forms/lead-form";
import { Reveal } from "@/components/ui/reveal";
import { team } from "@/lib/team";

function getMember(slug: string) {
  return team.find((member) => member.slug === slug);
}

export function generateStaticParams() {
  return team.map((member) => ({ slug: member.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const member = getMember(params.slug);
  if (!member) return { title: "Team member not found" };

  return {
    title: member.name,
    description: `${member.name}, ${member.role} at SPOT Group — ${member.focus.join(", ")}.`,
    alternates: { canonical: `/team/${member.slug}` },
    openGraph: { title: member.name, images: [{ url: member.photo }] },
  };
}

export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = getMember(params.slug);
  if (!member) notFound();

  return (
    <section className="pb-28 pt-32 lg:pt-44">
      <div className="shell">
        <Link href="/team" className="link-underline text-xs">
          <span aria-hidden="true">←</span> All team
        </Link>

        <div className="mt-12 grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="media aspect-[4/5] rounded-card">
              <Image
                src={member.photo}
                alt={`${member.name}, ${member.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>
            <div className="mt-8 space-y-2 text-sm">
              {member.phone ? (
                <a
                  href={`tel:${member.phone.replace(/[^\d+]/g, "")}`}
                  className="block hover:text-spot"
                >
                  {member.phone}
                </a>
              ) : null}
              {member.email ? (
                <a href={`mailto:${member.email}`} className="block hover:text-spot">
                  {member.email}
                </a>
              ) : null}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display-lg">
              {member.name}
              <span className="text-spot">.</span>
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
              {member.role}
            </p>
            {member.licence ? <p className="mt-2 text-xs text-ink-400">{member.licence}</p> : null}

            <div className="mt-10 space-y-6">
              {member.bio.map((paragraph) => (
                <p key={paragraph} className="max-w-prose text-base leading-relaxed text-ink-700">
                  {paragraph}
                </p>
              ))}
            </div>

            <h2 className="display-sm mt-14">What {member.name.split(" ")[0]} works on</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {member.focus.map((focus) => (
                <li key={focus} className="border-b border-ink/10 pb-3 text-sm text-ink-700">
                  {focus}
                </li>
              ))}
            </ul>

            <div className="mt-14 rounded-card bg-ink-50 p-7 sm:p-9">
              <h2 className="display-sm">Get in touch with {member.name.split(" ")[0]}</h2>
              <div className="mt-7">
                <LeadForm
                  leadType="contact"
                  bare
                  source={`team:${member.slug}`}
                  submitLabel="Send message"
                  fields={[
                    { name: "name", label: "Name", required: true },
                    { name: "email", label: "Email", type: "email", required: true },
                    { name: "phone", label: "Phone", type: "tel" },
                    { name: "message", label: "How can we help?", type: "textarea", full: true },
                  ]}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
