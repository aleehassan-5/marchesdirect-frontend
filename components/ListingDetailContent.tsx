"use client";

import Link from "next/link";
import type { Listing, JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { StepIndicator } from "./StepIndicator";
import { useSavedListings } from "@/lib/useSavedListings";

const tagKey: Record<JourneyKey, "journey_tenders_tag" | "journey_public_tag" | "journey_sub_tag"> = {
  "appels-doffres": "journey_tenders_tag",
  "marches-publics": "journey_public_tag",
  "sous-traitance": "journey_sub_tag",
};

export function ListingDetailContent({ listing, journeyKey }: { listing: Listing; journeyKey: JourneyKey }) {
  const t = useTranslation();
  const isAnalyzed = listing.status === "Analyse";
  const { isSaved, toggle } = useSavedListings();
  const saved = isSaved(listing.id);

  return (
    <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
      <div className="mb-7 md:mb-9">
        <StepIndicator
          steps={[t("detail_step_dossier"), t("detail_step_analysis"), t("detail_step_response"), t("detail_step_sending")]}
          current={0}
        />
      </div>

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
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h2 className="font-display font-bold text-[17px]">{t("detail_documents")}</h2>
          <Link href={`/${journeyKey}/${listing.id}/dossier`} className="text-[13px] font-semibold text-gold hover:underline underline-offset-4">
            {t("detail_view_dossier")}
          </Link>
        </div>
        <ul className="flex flex-col gap-1">
          {[
            { label: t("detail_doc_rc"), ext: "PDF" },
            { label: t("detail_doc_cctp"), ext: "PDF" },
            { label: t("detail_doc_bpu"), ext: "XLSX" },
          ].map((doc) => (
            <li
              key={doc.label}
              className="flex items-center gap-3 text-[14px] py-2.5 border-b border-border-soft last:border-b-0"
            >
              <span className="w-4 h-4 rounded-[4px] border-2 border-border shrink-0" aria-hidden />
              <span className="flex-1">{doc.label}</span>
              <span className="text-ink-faint font-mono text-[12px]">{doc.ext}</span>
              <button className="text-ink-faint hover:text-gold shrink-0" aria-label={t("detail_doc_download") as string}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_docs")}</span>
          <span className="font-display font-bold text-[18px] md:text-[20px]">2 / 3</span>
        </div>
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_todo")}</span>
          <span className="font-display font-bold text-[18px] md:text-[20px]">3</span>
        </div>
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_deadline")}</span>
          <span className="font-display font-bold text-[14px] md:text-[15px] font-mono">{listing.deadline}</span>
        </div>
      </div>

      <div className="mt-8 flex gap-3 flex-wrap">
        <Link href={`/repondre/${listing.id}`} className="btn btn-gold">{t("detail_prepare_response")}</Link>
        <button
          onClick={() => toggle(listing.id)}
          aria-pressed={saved}
          className={`btn ${saved ? "btn-gold" : "btn-ghost"}`}
        >
          {saved ? t("detail_saved") : t("detail_save")}
        </button>
        <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}`} className="btn btn-ghost">
          {t("detail_contact_advisor")}
        </Link>
      </div>
    </div>
  );
}
