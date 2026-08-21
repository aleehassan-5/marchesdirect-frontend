"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function MobileActionBar() {
  const t = useTranslation();

  return (
    <div
      className="md:hidden fixed bottom-[64px] inset-x-0 z-40 flex gap-2 px-3 py-2 border-t border-border-soft bg-[var(--bg-elevated-2)]"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <Link
        href="/contact"
        className="btn btn-gold flex-1 flex items-center justify-center gap-1.5 text-[13px] py-2.5"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        {t("mobilebar_rdv")}
      </Link>
      <Link
        href="/contact"
        className="btn btn-ghost flex-1 flex items-center justify-center gap-1.5 text-[13px] py-2.5"
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .3 2 .7 2.9a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.3a2 2 0 0 1 2.1-.4c.9.4 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
        </svg>
        {t("mobilebar_callback")}
      </Link>
    </div>
  );
}
