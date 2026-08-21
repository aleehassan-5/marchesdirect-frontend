"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { useTranslation } from "@/lib/i18n";

const icons: Record<number, React.ReactNode> = {
  1: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="1.2" fill="currentColor" /><path d="M12 2v2M12 20v2" />
    </svg>
  ),
  2: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16l-6 8v6l-4-2v-4L4 5z" />
    </svg>
  ),
  3: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h9l3 3v15H6V3z" /><path d="M9 10h6M9 13h6M9 16h4" />
    </svg>
  ),
  4: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.2-4.2L16.8 4.2a1.7 1.7 0 0 1 2.4 0l.6.6a1.7 1.7 0 0 1 0 2.4L8.2 18.8 4 20z" />
    </svg>
  ),
  5: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l18-8-8 18-2.5-7L3 11z" />
    </svg>
  ),
  6: (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
    </svg>
  ),
};

const personIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="3.5" /><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
  </svg>
);

export default function CommentCaMarchePage() {
  const t = useTranslation();

  const steps = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    icon: icons[n],
    title: t(`process_step${n}_title` as `process_step1_title`),
    body: t(`process_step${n}_body` as `process_step1_body`),
  }));

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="eyebrow mb-3">{t("process_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,3.8vw,34px)] leading-[1.15] tracking-tight max-w-[26ch]">
          {t("process_title")}
        </h1>
        <p className="text-ink-soft mt-3 max-w-[58ch]">{t("process_sub")}</p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s) => (
            <div key={s.n} className="card p-5">
              <span className="font-display font-extrabold text-[22px] text-gold block mb-2">
                {String(s.n).padStart(2, "0")}
              </span>
              <span className="text-gold inline-flex mb-3">{s.icon}</span>
              <h3 className="font-display font-bold text-[16px] mb-1.5">{s.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-ink-soft">{s.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 card p-5 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-full bg-gold/15 text-gold flex items-center justify-center shrink-0">{personIcon}</span>
            <h3 className="font-display font-bold text-[15px]">{t("process_help_title")}</h3>
          </div>
          <AdvisorButtons />
        </div>

        <div className="flex gap-4 justify-center mt-6 text-[13px] font-semibold flex-wrap">
          <a href="/a-propos" className="text-gold hover:underline underline-offset-4">{t("nav_about")} &rarr;</a>
          <a href="/notre-equipe" className="text-gold hover:underline underline-offset-4">{t("nav_team")} &rarr;</a>
          <a href="/faq" className="text-gold hover:underline underline-offset-4">{t("faq_page_title")} &rarr;</a>
        </div>
      </div>

      <Footer />
    </>
  );
}
