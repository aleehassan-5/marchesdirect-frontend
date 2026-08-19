"use client";

import Link from "next/link";
import type { Listing, JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const tagKey: Record<JourneyKey, "journey_tenders_tag" | "journey_public_tag" | "journey_sub_tag"> = {
  "appels-doffres": "journey_tenders_tag",
  "marches-publics": "journey_public_tag",
  "sous-traitance": "journey_sub_tag",
};

export function ListingDetailContent({ listing, journeyKey }: { listing: Listing; journeyKey: JourneyKey }) {
  const t = useTranslation();
  const isAnalyzed = listing.status === "Analyse";

  return (
    <div className="max-w-[900px] mx-auto px-5 py-10">
      <div className="eyebrow mb-4">{t(tagKey[journeyKey])}</div>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[26ch]">
          {listing.title}
        </h1>
        <span
          className={`shrink-0 text-[12px] font-mono font-semibold px-3 py-1.5 rounded-full ${
            isAnalyzed ? "bg-gold/15 text-gold" : "bg-ink-faint/15 text-ink-faint"
          }`}
        >
          {isAnalyzed ? t("listing_status_analyzed") : t("listing_status_pending")}
        </span>
      </div>
      <p className="text-ink-soft mt-2">
        {listing.buyer} &middot; {listing.location} &middot; {listing.distanceKm} km {t("detail_from_your_hq")}
      </p>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 card p-5">
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("detail_budget")}</span>
          <span className="font-mono text-[14px]">{listing.budget}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("detail_deadline")}</span>
          <span className="font-mono text-[14px]">{listing.deadline}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("detail_trade")}</span>
          <span className="font-mono text-[14px]">{listing.trade}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">
            {listing.cpv ? t("detail_cpv") : t("detail_match")}
          </span>
          <span className="font-mono text-[14px]">{listing.cpv ?? `${listing.matchScore}%`}</span>
        </div>
      </div>

      <div className={`mt-8 p-6 ${isAnalyzed ? "panel-dark" : "card"}`}>
        <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
          <h2 className="font-display font-bold text-[17px]">{t("detail_ai_summary")}</h2>
          {isAnalyzed && <span className="ai-badge">{t("ai_draft_badge")}</span>}
        </div>
        {isAnalyzed ? (
          <p
            className="text-[14.5px] leading-relaxed opacity-80"
            dangerouslySetInnerHTML={{
              __html: t("detail_ai_analyzed", { trade: listing.trade, distance: listing.distanceKm }),
            }}
          />
        ) : (
          <p className="text-ink-faint text-[14.5px] italic">{t("detail_ai_pending")}</p>
        )}
      </div>

      <div className="mt-8 card p-6">
        <h2 className="font-display font-bold text-[17px] mb-4">{t("detail_documents")}</h2>
        <ul className="flex flex-col gap-2.5 text-[14px]">
          <li className="flex items-center justify-between border-b border-border-soft pb-2.5">
            <span>{t("detail_doc_rc")}</span>
            <span className="text-ink-faint font-mono text-[12px]">PDF</span>
          </li>
          <li className="flex items-center justify-between border-b border-border-soft pb-2.5">
            <span>{t("detail_doc_cctp")}</span>
            <span className="text-ink-faint font-mono text-[12px]">PDF</span>
          </li>
          <li className="flex items-center justify-between">
            <span>{t("detail_doc_bpu")}</span>
            <span className="text-ink-faint font-mono text-[12px]">XLSX</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 flex gap-3 flex-wrap">
        <Link href={`/repondre/${listing.id}`} className="btn btn-gold">{t("detail_respond")}</Link>
        <button className="btn btn-ghost">{t("detail_save")}</button>
      </div>
    </div>
  );
}
