"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const t = useTranslation();

  return (
    <>
      <Header />
      <div className="max-w-[720px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("blog_post_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">
          {params.slug.replace(/-/g, " ")}
        </h1>
        <p className="text-ink-soft mt-5 leading-relaxed">{t("blog_post_body")}</p>
      </div>
      <Footer />
    </>
  );
}
