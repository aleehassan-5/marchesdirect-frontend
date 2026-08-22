"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

type Tab = "regions" | "departments" | "cities";

const regions = ["Ile-de-France", "Auvergne-Rhone-Alpes", "Hauts-de-France", "Nouvelle-Aquitaine", "Occitanie", "Pays de la Loire"];
const departments = ["Paris (75)", "Rhone (69)", "Nord (59)", "Gironde (33)", "Haute-Garonne (31)", "Loire-Atlantique (44)"];
const cities = ["Paris", "Lyon", "Lille", "Bordeaux", "Toulouse", "Nantes"];

// Simplified illustrative France outline - decorative, not survey-accurate,
// matching the abstract stylised map used in the client's reference mockup.
function FranceMap() {
  return (
    <svg viewBox="0 0 220 240" className="w-full h-auto max-w-[180px]" fill="none">
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
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="eyebrow mb-3">{t("home_regions_eyebrow")}</div>
        <h2 className="font-display font-extrabold text-[clamp(22px,4.4vw,32px)] tracking-tight max-w-[16ch]">
          {t("home_regions_title")}
        </h2>
        <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch]">{t("home_regions_sub")}</p>

        <div className="card mt-6 p-5 md:p-7">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="shrink-0 mx-auto md:mx-0">
              <FranceMap />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex gap-2 flex-wrap mb-4">
                {tabs.map((tb) => (
                  <button
                    key={tb.key}
                    onClick={() => setTab(tb.key)}
                    className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                      tab === tb.key ? "border-gold text-gold" : "border-border-soft text-ink-soft hover:text-ink"
                    }`}
                  >
                    {tb.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {items.map((item) => (
                  <Link
                    key={item}
                    href="/marches-publics"
                    className="flex items-center justify-between gap-2 text-[14px] font-semibold py-1 text-ink hover:text-gold transition-colors"
                  >
                    <span className="truncate">{item}</span>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="shrink-0">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link href="/marches-publics" className="btn btn-ghost w-full justify-center mt-6 gap-2">
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
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="1.6">
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
