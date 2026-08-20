"use client";

import { useTheme } from "./ThemeProvider";
import { useLanguage } from "@/lib/i18n";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { lang } = useLanguage();

  return (
    <button
      onClick={toggle}
      aria-label={lang === "fr" ? "Changer de theme" : "Switch theme"}
      className="w-[38px] h-[38px] rounded-full border border-border bg-bg-elevated flex items-center justify-center text-ink-soft hover:border-gold hover:text-gold transition-colors"
    >
      {theme === "dark" ? (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z" />
        </svg>
      )}
    </button>
  );
}
