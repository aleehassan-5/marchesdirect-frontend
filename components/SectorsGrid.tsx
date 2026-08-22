"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const sectors: { key: string; icon: JSX.Element }[] = [
  {
    key: "sector_construction",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 21V9l7-5 7 5v12" />
        <path d="M12 4v9M12 13l6-3M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    key: "sector_energy",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6c-3 3-3 9 0 12 3-3 3-9 0-12z" />
      </svg>
    ),
  },
  {
    key: "sector_industry",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3.2" />
        <path d="M12 3v2.5M12 18.5V21M21 12h-2.5M5.5 12H3M18 6l-1.7 1.7M7.7 16.3L6 18M18 18l-1.7-1.7M7.7 7.7L6 6" />
      </svg>
    ),
  },
  {
    key: "sector_it",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="12" rx="1.5" />
        <path d="M8 21h8M12 17v4M9.5 9.5a3.5 3.5 0 0 1 5 0M11 11.2a1 1 0 0 1 2 0" />
      </svg>
    ),
  },
  {
    key: "sector_transport",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8h11v8H2z" />
        <path d="M13 11h4l4 3v2h-8z" />
        <circle cx="6.5" cy="18" r="1.6" />
        <circle cx="16.5" cy="18" r="1.6" />
        <path d="M2 12h6" />
      </svg>
    ),
  },
  {
    key: "sector_services",
    icon: (
      <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="18" height="12" rx="1.5" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        <rect x="10.5" y="12.5" width="3" height="2.5" />
      </svg>
    ),
  },
];

export function SectorsGrid() {
  const t = useTranslation();

  return (
    <section className="pt-10 pb-4 md:pt-14">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="eyebrow mb-3">{t("home_sectors_eyebrow")}</div>
        <h2 className="font-display font-extrabold text-[clamp(22px,4.4vw,32px)] tracking-tight max-w-[16ch]">
          {t("home_sectors_title")}
        </h2>
        <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch]">{t("home_sectors_sub")}</p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-6">
          {sectors.map((s) => (
            <Link
              key={s.key}
              href="/marches-publics"
              className="card p-5 flex flex-col items-center text-center gap-3 hover:border-gold/50 transition-colors"
            >
              <span className="text-gold">{s.icon}</span>
              <span className="font-display font-bold text-[14.5px] leading-tight">{t(s.key)}</span>
            </Link>
          ))}
        </div>

        <Link href="/marches-publics" className="btn btn-ghost w-full justify-center mt-5 gap-2">
          {t("home_sectors_see_all")}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>

        <p className="text-center text-ink-faint text-[13px] mt-5">
          {t("nav_public")} &bull; {t("nav_tenders")} &bull; {t("nav_subcontract")}
        </p>
      </div>
    </section>
  );
}
