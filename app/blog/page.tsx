"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";

const posts = [
  {
    slug: "facturation-electronique-2026",
    title: "Facturation electronique 2026 : ce qui change pour les entreprises du BTP",
    excerpt: "Obligatoire pour toutes les entreprises francaises a partir de septembre 2026 - ce qu'il faut preparer des maintenant.",
    date: "12 aout 2026",
  },
  {
    slug: "memoire-technique-erreurs-frequentes",
    title: "Memoire technique : les erreurs qui font perdre des points",
    excerpt: "Les criteres les plus souvent mal traites dans les reponses aux marches publics, et comment les eviter.",
    date: "3 aout 2026",
  },
  {
    slug: "qualibat-rge-guide",
    title: "Qualibat, RGE : quelles qualifications pour quels marches",
    excerpt: "Un guide rapide pour savoir quelle certification demander selon le type de chantier vise.",
    date: "22 juillet 2026",
  },
];

export default function BlogPage() {
  const t = useTranslation();

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("blog_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">{t("blog_title")}</h1>
        <div className="mt-8 flex flex-col gap-4">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-5 hover:border-gold transition-colors">
              <span className="text-[11.5px] font-mono text-ink-faint">{p.date}</span>
              <h3 className="font-display font-bold text-[16.5px] mt-1.5 mb-2">{p.title}</h3>
              <p className="text-ink-soft text-[13.5px]">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
