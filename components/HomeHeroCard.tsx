"use client";

import Link from "next/link";
import Image from "next/image";
import type { JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { AdvisorButtons } from "@/components/AdvisorButtons";

// Icons matched to the client's reference mockup: a classic institution/
// pediment building for public procurement, a city skyline for private
// tenders, and a handshake for subcontracting - distinct from the circular
// JourneyCard icons used on /[journey] listing pages, which follow a
// different (rounded, single-stroke-shape) icon set by design.
const rowIcons: Record<JourneyKey, JSX.Element> = {
  "marches-publics": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-6 9 6" />
      <path d="M4 10v9M8 10v9M12 10v9M16 10v9M20 10v9" />
      <path d="M2.5 19.5h19" />
    </svg>
  ),
  "appels-doffres": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="7" height="10" />
      <rect x="12" y="4" width="9" height="16" />
      <path d="M5.5 13h2M5.5 16h2M14.5 7h4M14.5 10h4M14.5 13h4M14.5 16h4" />
    </svg>
  ),
  "sous-traitance": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l4-3 3.5 2.5L14 8l4 3" />
      <path d="M6 9l3 3-1.5 1.5a1.6 1.6 0 0 1-2.3 0 1.6 1.6 0 0 1 0-2.3L9 7.5" />
      <path d="M18 9l-3 3 1.5 1.5a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3L15 7.5" />
    </svg>
  ),
};

const labelKey: Record<JourneyKey, "nav_public" | "nav_tenders" | "nav_subcontract"> = {
  "marches-publics": "nav_public",
  "appels-doffres": "nav_tenders",
  "sous-traitance": "nav_subcontract",
};

const order: JourneyKey[] = ["marches-publics", "appels-doffres", "sous-traitance"];

export function HomeHeroCard() {
  const t = useTranslation();

  return (
    <section className="pt-4 pb-4 md:pt-14 md:pb-10">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="card border-gold/60 p-5 md:p-9 relative overflow-hidden">
          {/* Upward trend line - purely decorative, echoes the client's reference
              (an orange arrow trending up behind the hero title). */}
          <svg
            viewBox="0 0 200 140"
            className="pointer-events-none absolute right-0 top-0 w-[46%] max-w-[220px] h-auto opacity-90"
            fill="none"
          >
            <path
              d="M10 110 L55 85 L85 100 L120 55 L150 65 L185 15"
              stroke="var(--gold)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M185 15 L170 20 M185 15 L182 32" stroke="var(--gold)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h1 className="font-display font-extrabold text-[clamp(24px,6vw,40px)] leading-[1.12] tracking-tight max-w-[16ch] relative">
            {t("home_title_1")} <span className="text-gold">{t("home_title_2")}</span>
          </h1>
          <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch] relative">{t("home_hero_sub")}</p>

          <div className="mt-6 flex flex-col gap-2.5">
            {order.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="card flex items-center gap-3.5 px-4 py-3.5 md:py-4 group hover:border-gold/60 transition-colors"
              >
                <span className="text-gold shrink-0">{rowIcons[key]}</span>
                <span className="font-display font-bold text-[15.5px] md:text-[17px] flex-1">{t(labelKey[key])}</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" className="shrink-0 group-hover:translate-x-1 transition-transform">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>

          <AdvisorButtons className="mt-5" />
        </div>

        {/* Qui sommes-nous - separate card right under the hero, per reference. */}
        <Link
          href="/notre-equipe"
          className="card mt-4 p-4 md:p-5 flex items-center gap-4 group hover:border-gold/40 transition-colors"
        >
          <div className="w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-full shrink-0 overflow-hidden relative">
            <Image src="/images/team-circle.webp" alt="" fill sizes="76px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-[15px] md:text-[16.5px]">{t("home_who_title")}</h3>
            <p className="text-ink-soft text-[12.5px] md:text-[13.5px] mt-0.5">{t("home_who_body")}</p>
            <span className="inline-flex items-center gap-1.5 text-gold text-[12.5px] font-semibold mt-2 group-hover:gap-2.5 transition-all">
              {t("home_who_discover")}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
