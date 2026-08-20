"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label="Switch language / Changer de langue"
      className="h-[38px] px-3 rounded-full border border-border bg-bg-elevated flex items-center justify-center gap-1.5 text-[12.5px] font-mono font-semibold text-ink-soft hover:border-gold hover:text-gold transition-colors"
    >
      <span className={lang === "fr" ? "text-gold" : ""}>FR</span>
      <span className="text-ink-faint">/</span>
      <span className={lang === "en" ? "text-gold" : ""}>EN</span>
    </button>
  );
}
