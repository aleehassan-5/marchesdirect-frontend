"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const phoneIcon = (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export function AdvisorButtons({ className = "" }: { className?: string }) {
  const t = useTranslation();

  return (
    <div className={`flex gap-2.5 flex-wrap ${className}`}>
      <Link href="/contact" className="btn btn-gold flex-1 sm:flex-none justify-center gap-2">
        {phoneIcon}
        {t("home_advisor_book")}
      </Link>
      <Link href="/contact" className="btn btn-ghost flex-1 sm:flex-none justify-center gap-2">
        {phoneIcon}
        {t("cta_callback")}
      </Link>
    </div>
  );
}
