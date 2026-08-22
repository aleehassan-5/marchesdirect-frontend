"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

type Tab = "regions" | "departments" | "cities";

const regions = ["Ile-de-France", "Auvergne-Rhone-Alpes", "Hauts-de-France", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire"];
const departments = ["Paris (75)", "Rhone (69)", "Nord (59)", "Gironde (33)", "Haute-Garonne (31)", "Loire-Atlantique (44)"];
const cities = ["Paris", "Lyon", "Lille", "Bordeaux", "Toulouse", "Nantes"];

// France map SVG - valid and clean
function FranceMap() {
  return (
    <svg viewBox="0 0 220 240" className="w-full h-auto max-w-[140px] md:max-w-[180px]" fill="none">
      <path
        d="M70 10 L120 8 L140 30 L165 35 L190 55 L185 85 L200 100 L195 130 L170 150 L175 175 L150 200 L120 225 L95 220 L80 195 L50 190 L35 165 L45 140 L20 115 L30 85 L15 60 L45 45 L55 25 Z"
        stroke="var(--border-soft)"
        strokeWidth="1.5"
        fill="var(--bg-elevated-2)"
      />
      <circle cx="100" cy="60" r="4" fill="var(--gold)" />
      <circle cx="130" cy="110" r="4" fill="var(--gold)" />
      <circle cx="55" cy="125" r="4" fill="var(--gold)" />
      <circle cx="95" cy="175" r="4" fill="var(--gold)" />
    </svg>
  );
}

export function RegionsBrowser() {
  const t = useTranslation();
  const [tab, setTab] = useState<Tab>("regions");

  const items = tab === "regions" ? regions : tab === "departments" ? departments : cities;
  const tabs: { key: Tab; label: string }[] = [
    { key: "regions", label: t("home_regions_tab_regions") as string },
    { key: "departments", label: t("home_regions_tab_departments") as string },
    { key: "cities", label: t("home_regions_tab_cities") as string },
  ];

  return (
    <section className="pt-10 pb-4 md:pt-14">
      <div className="max-w-[1380px] mx-auto px-3 md:px-5">
        <div className="eyebrow mb-3">{t("home_regions_eyebrow")}</div>
        <h2 className="font-display font-extrabold text-[clamp(22px,4.4vw,32px)] tracking-tight max-w-[16ch]">
          {t("home_regions_title")}
        </h2>
        <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch]">{t("home_regions_sub")}</p>

        <div className="card mt-6 p-4 md:p-7 w-full">
          <div className="flex flex-row items-start gap-3 md:gap-6">
            {/* France map on the left - smaller on mobile */}
            <div className="shrink-0 w-[100px] md:w-[180px]">
              <FranceMap />
            </div>

            <div className="flex-1 min-w-0">
              {/* Filter buttons - 3 in a row with 0 gap */}
              <div className="flex flex-row gap-0 mb-4 w-full">
                {tabs.map((tb) => (
                  <button
                    key={tb.key}
                    onClick={() => setTab(tb.key)}
                    className={`flex-1 px-2 py-1.5 text-[11px] md:text-[13px] font-semibold border transition-colors text-center first:rounded-l-md last:rounded-r-md ${
                      tab === tb.key 
                        ? "border-gold text-gold bg-gold/5" 
                        : "border-border-soft text-ink-soft hover:text-ink hover:bg-ink-soft/5"
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>

              {/* Items displayed in a table-like grid with smaller text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
                {items.map((item) => (
                  <Link
                    key={item}
                    href="/marches-publics"
                    className="flex items-center justify-between gap-2 text-[12px] md:text-[14px] font-semibold py-1 px-2 hover:bg-ink-soft/5 rounded transition-colors text-ink hover:text-gold"
                  >
                    <span className="truncate">{item}</span>
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="shrink-0">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/marches-publics" className="btn btn-ghost w-full justify-center mt-6 gap-2 text-sm">
            {t("home_regions_see_all")}
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Link
          href="/marches-publics"
          className="card mt-4 p-4 md:p-5 flex items-center gap-4 group hover:border-gold/40 transition-colors"
        >
          <span className="text-gold shrink-0">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </span>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[15px] md:text-[16.5px]">{t("home_intl_title")}</h3>
            <p className="text-ink-soft text-[12.5px] md:text-[13.5px] mt-0.5">{t("home_intl_sub")}</p>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" className="shrink-0 group-hover:translate-x-1 transition-transform">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}