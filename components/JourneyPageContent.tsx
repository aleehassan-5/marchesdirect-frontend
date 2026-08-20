"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { ListingCard } from "@/components/ListingCard";
import { EmptyState, ErrorState } from "@/components/States";
import type { Listing, JourneyKey } from "@/lib/data";
import type { ApiTrade } from "@/lib/api";
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

export function JourneyPageContent({
  journeyKey,
  results,
  error,
  trades = [],
  activeTradeId,
  activeQuery,
}: {
  journeyKey: JourneyKey;
  results: Listing[];
  error?: string | null;
  trades?: ApiTrade[];
  activeTradeId?: string;
  activeQuery?: string;
}) {
  const t = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  // Sous-traitance is a two-sided marketplace (site owners posting work vs.
  // companies offering to take it), so it gets this extra toggle the other two
  // journeys don't need. Visual only for now - both tabs show the same results
  // until the backend distinguishes "posted by" from "looking for" listings.
  const [subMode, setSubMode] = useState<"site" | "partner">("site");

  // Trade filter and free-text search are real - they update the URL, which the
  // server component re-reads and re-queries the backend with (trade_id/q params
  // on GET /api/opportunities). Radius and sort are still visual-only: radius
  // needs geocoding + distance calc, sort-by-distance needs the matching engine
  // (Milestone 6) - neither is built yet, so wiring them here would just be a
  // second fake filter next to a real one.
  const updateParam = (key: "trade" | "q", value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="max-w-[1180px] mx-auto px-5 py-10">
      <div className="eyebrow mb-4">{t(tagKey[journeyKey])}</div>
      <h1 className="font-display font-extrabold text-[clamp(24px,4vw,38px)] tracking-tight max-w-[20ch]">
        {t(labelKey[journeyKey])}
      </h1>
      <p className="text-ink-soft mt-3 max-w-[54ch]">{t(descKey[journeyKey])}</p>

      {journeyKey === "sous-traitance" && (
        <div className="mt-6 inline-flex rounded-full border border-border p-1 gap-1">
          <button
            onClick={() => setSubMode("site")}
            className={`px-4 py-2 rounded-full text-[13.5px] font-semibold transition-colors ${
              subMode === "site" ? "bg-gold text-gold-ink" : "text-ink-soft"
            }`}
          >
            {t("journey_sub_toggle_site")}
          </button>
          <button
            onClick={() => setSubMode("partner")}
            className={`px-4 py-2 rounded-full text-[13.5px] font-semibold transition-colors ${
              subMode === "partner" ? "bg-gold text-gold-ink" : "text-ink-soft"
            }`}
          >
            {t("journey_sub_toggle_partner")}
          </button>
        </div>
      )}

      <div className="mt-8 card p-3 flex flex-wrap gap-3 items-center">
        <select
          className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]"
          value={activeTradeId ?? ""}
          onChange={(e) => updateParam("trade", e.target.value)}
        >
          <option value="">{t("journey_filter_trade")}</option>
          {trades.map((trade) => (
            <option key={trade.id} value={trade.id}>
              {trade.name}
            </option>
          ))}
        </select>
        <input
          type="search"
          defaultValue={activeQuery ?? ""}
          placeholder={t("search_location_placeholder")}
          className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px] outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") updateParam("q", (e.target as HTMLInputElement).value);
          }}
        />
        <select className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]" disabled>
          <option>{t("journey_filter_radius")}</option>
          <option>{t("journey_filter_radius_100")}</option>
          <option>{t("search_radius_national")}</option>
        </select>
        <select className="bg-transparent border border-border rounded-full px-3.5 py-2 text-[13.5px]" disabled>
          <option>{t("search_sort_relevance")}</option>
          <option>{t("search_sort_deadline")}</option>
          <option>{t("search_sort_distance")}</option>
        </select>
        <span className="ml-auto text-[13px] text-ink-soft font-mono">{results.length} {t("search_results")}</span>
      </div>

      {error ? (
        <div className="mt-6">
          <ErrorState message={error} />
        </div>
      ) : results.length > 0 ? (
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
