"use client";

import Link from "next/link";
import type { JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const icons: Record<JourneyKey, JSX.Element> = {
  "appels-doffres": (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18M11 13v2h2v-2" />
    </svg>
  ),
  "marches-publics": (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16M5 22V10l7-6 7 6v12M9 22v-6h2v6M13 22v-6h2v6M4 10h16" />
    </svg>
  ),
  "sous-traitance": (
    <svg viewBox="0 0 24 24" className="w-[22px] h-[22px] md:w-[26px] md:h-[26px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8.5" cy="8" r="2.8" />
      <circle cx="16" cy="9.5" r="2.3" />
      <path d="M3.5 20v-1.5c0-2.5 2.2-4.5 5-4.5s5 2 5 4.5V20M14.2 13.8c2.1.2 3.8 1.9 3.8 4.2V20" />
    </svg>
  ),
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
      className="card p-4 md:p-7 group hover:-translate-y-1 active:scale-[0.99] transition-transform flex flex-col items-center text-center"
    >
      <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] shrink-0 rounded-full border-2 border-gold flex items-center justify-center mb-3 md:mb-4 text-gold">
        {icons[slug]}
      </div>
      <h3 className="font-display font-bold text-[15px] leading-[1.2] md:text-[20px] mb-3 md:mb-4 text-ink">{label}</h3>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform shrink-0 mt-auto"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </Link>
  );
}
