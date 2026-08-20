"use client";

import Link from "next/link";
import type { JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const icons: Record<JourneyKey, JSX.Element> = {
  "appels-doffres": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" />
    </svg>
  ),
  "marches-publics": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16M5 22V10l7-6 7 6v12M9 22v-6h2v6M13 22v-6h2v6M4 10h16" />
    </svg>
  ),
  "sous-traitance": (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 9.5l-5 5M9 4l2 2-3 3-2-2 3-3zM18 13l2 2-3 3-2-2 3-3zM6 15l-2 2 3 3 2-2M15 6l2-2 3 3-2 2" />
    </svg>
  ),
};

const tagKey: Record<JourneyKey, "journey_tenders_tag" | "journey_public_tag" | "journey_sub_tag"> = {
  "appels-doffres": "journey_tenders_tag",
  "marches-publics": "journey_public_tag",
  "sous-traitance": "journey_sub_tag",
};

const descKey: Record<JourneyKey, "journey_tenders_desc" | "journey_public_desc" | "journey_sub_desc"> = {
  "appels-doffres": "journey_tenders_desc",
  "marches-publics": "journey_public_desc",
  "sous-traitance": "journey_sub_desc",
};

const labelKey: Record<JourneyKey, "nav_tenders" | "nav_public" | "nav_subcontract"> = {
  "appels-doffres": "nav_tenders",
  "marches-publics": "nav_public",
  "sous-traitance": "nav_subcontract",
};

export function JourneyCard({
  slug,
  color,
}: {
  slug: JourneyKey;
  label: string;
  tag: string;
  description: string;
  color: string;
}) {
  const t = useTranslation();
  const label = t(labelKey[slug]);

  return (
    <Link
      href={`/${slug}`}
      className="card p-5 md:p-6 group hover:-translate-y-1 active:scale-[0.99] transition-transform flex md:block items-center gap-4 md:gap-0"
      style={{ borderTop: "1px solid var(--border)", borderLeft: `4px solid ${color}` }}
    >
      <div
        className="w-[48px] h-[48px] md:w-[42px] md:h-[42px] shrink-0 rounded-[12px] flex items-center justify-center mb-0 md:mb-4"
        style={{ background: `color-mix(in srgb, ${color} 16%, transparent)`, color }}
      >
        {icons[slug]}
      </div>
      <div className="flex-1 min-w-0">
        <span className="font-mono text-[10.5px] uppercase tracking-wide font-semibold block mb-1 md:mb-2.5" style={{ color }}>
          {t(tagKey[slug])}
        </span>
        <h3 className="font-display font-bold text-[17px] md:text-[19px] mb-1 md:mb-2">{label}</h3>
        <p className="hidden md:block text-ink-soft text-[14px] leading-relaxed">{t(descKey[slug])}</p>
        <div className="mt-1 md:mt-4 text-[13.5px] font-bold flex items-center gap-1.5" style={{ color }}>
          {t("home_explore")}
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="group-hover:translate-x-1 transition-transform shrink-0">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
