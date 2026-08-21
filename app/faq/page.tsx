"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqItem } from "@/components/FaqItem";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { useTranslation, useLanguage, faqItems } from "@/lib/i18n";

export default function FaqPage() {
  const t = useTranslation();
  const { lang } = useLanguage();

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-10 md:py-14">
        <div className="mb-10">
          <span className="eyebrow inline-block mb-3">{t("faq_eyebrow")}</span>
          <h1 className="font-display font-extrabold text-[clamp(24px,4vw,36px)] tracking-tight">
            {t("faq_page_title")}
          </h1>
          <p className="text-ink-soft mt-3 max-w-[56ch]">{t("faq_page_sub")}</p>
        </div>

        <div className="flex flex-col gap-3 mb-12">
          {faqItems.map((item) => (
            <FaqItem key={item.q.fr} question={item.q[lang]} answer={item.a[lang]} />
          ))}
        </div>

        <div className="panel-dark p-6 md:p-7">
          <h3 className="font-display font-bold text-[22px] md:text-[26px] leading-tight mb-2">
            {t("faq_cta_title_1")} <span className="text-gold">{t("faq_cta_title_2")}</span>
          </h3>
          <p className="text-[14px] opacity-75 mb-5">{t("faq_cta_sub")}</p>
          <AdvisorButtons />
        </div>
      </div>

      <Footer />
    </>
  );
}
