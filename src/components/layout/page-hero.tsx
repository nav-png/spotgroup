import Image from "next/image";

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt = "",
  size = "standard",
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  image: string;
  imageAlt?: string;
  size?: "standard" | "tall";
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative isolate flex flex-col justify-end overflow-hidden bg-ink text-white ${
        size === "tall" ? "min-h-[78svh] pb-20 pt-40" : "min-h-[58svh] pb-16 pt-36"
      }`}
    >
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/65" />
      <div className="shell relative">
        {eyebrow ? <p className="eyebrow-light">{eyebrow}</p> : null}
        <h1 className="display-lg mt-5 max-w-[24ch]">{title}</h1>
        {lede ? <p className="mt-6 max-w-2xl text-lg text-white/75">{lede}</p> : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
