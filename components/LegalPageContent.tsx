"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/lib/i18n";
import { legalContent, type LegalKey } from "@/lib/legal-content";

export function LegalPageContent({ pageKey }: { pageKey: LegalKey }) {
  const { lang } = useLanguage();
  const content = legalContent[pageKey];

  return (
    <>
      <Header />
      <div className="max-w-[720px] mx-auto px-5 py-14">
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight mb-6">
          {content.title[lang]}
        </h1>
        <div className="flex flex-col gap-4">
          {content.body[lang].map((p, i) => (
            <p key={i} className="text-ink-soft text-[14.5px] leading-relaxed">{p}</p>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
