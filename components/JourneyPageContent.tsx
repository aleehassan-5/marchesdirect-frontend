"use client";

import { ListingCard } from "@/components/ListingCard";
import { EmptyState } from "@/components/States";
import type { Listing, JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const labelKey: Record<JourneyKey, "nav_tenders" | "nav_public" | "nav_subcontract"> = {
  "appels-doffres": "nav_tenders",
  "marches-publics": "nav_public",
  "sous-traitance": "nav_subcontract",
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

export function JourneyPageContent({ journeyKey, results }: { journeyKey: JourneyKey; results: Listing[] }) {
  const t = useTranslation();

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10">
      <div className="eyebrow mb-4">{t(tagKey[journeyKey])}</div>
      <h1 className="font-display font-extrabold text-[clamp(24px,4vw,38px)] tracking-tight max-w-[20ch]">
        {t(labelKey[journeyKey])}
      </h1>
      <p className="text-ink-soft mt-3 max-w-[54ch]">{t(descKey[journeyKey])}</p>

      <div className="mt-8 card p-3 flex flex-wrap gap-3 items-center">
        <select className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]">
          <option>{t("journey_filter_trade")}</option>
          <option>Electricite</option>
          <option>VRD</option>
          <option>Plomberie / CVC</option>
        </select>
        <select className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]">
          <option>{t("journey_filter_radius")}</option>
          <option>{t("journey_filter_radius_100")}</option>
          <option>{t("search_radius_national")}</option>
        </select>
        <select className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]">
          <option>{t("search_sort_relevance")}</option>
          <option>{t("search_sort_deadline")}</option>
          <option>{t("search_sort_distance")}</option>
        </select>
        <span className="ml-auto text-[13px] text-ink-soft font-mono">{results.length} {t("search_results")}</span>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 md:gap-4">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState />
        </div>
      )}
    </div>
  );
}
