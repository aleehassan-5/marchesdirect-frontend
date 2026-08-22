"use client";

import { useTranslation } from "@/lib/i18n";
import { AdvisorButtons } from "@/components/AdvisorButtons";

export function CTA() {
  const t = useTranslation();

  return (
    <div className="card border-gold/60 p-8 py-12 md:py-14 text-center relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[260px] h-[220px]"
        style={{ background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--gold) 30%, transparent), transparent 70%)" }}
      />
      <span className="relative inline-flex mb-5 text-gold">
        <svg viewBox="0 0 24 24" width="56" height="56" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 14a8 8 0 0 1 16 0" />
          <rect x="3" y="14" width="4" height="6" rx="1.5" />
          <rect x="17" y="14" width="4" height="6" rx="1.5" />
          <path d="M9 21h4a2 2 0 0 0 2-2v-1" />
          <circle cx="12" cy="9" r="3.4" />
          <path d="M9.3 11.6a4 4 0 0 0 5.4 0" />
        </svg>
      </span>
      <h3 className="font-display font-extrabold text-[clamp(22px,3.8vw,30px)] leading-tight max-w-[18ch] mx-auto mb-3 relative">
        {t("cta_title")} <span className="text-gold">{t("cta_title_accent")}</span>
      </h3>
      <p className="text-[14.5px] mb-6 relative opacity-80 max-w-[38ch] mx-auto">{t("cta_sub")}</p>
      <div className="relative flex justify-center">
        <AdvisorButtons />
      </div>
    </div>
  );
}
