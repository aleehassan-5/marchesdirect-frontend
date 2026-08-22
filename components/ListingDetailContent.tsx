"use client";

import Link from "next/link";
import type { Listing, JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { WizardStepper } from "./WizardStepper";
import { useSavedListings } from "@/lib/useSavedListings";

export function ListingDetailContent({ listing, journeyKey }: { listing: Listing; journeyKey: JourneyKey }) {
  const t = useTranslation();
  const { isSaved, toggle } = useSavedListings();
  const saved = isSaved(listing.id);
  const isPublic = journeyKey === "marches-publics";

  const why = isPublic
    ? ["wiz1_why_1_public", "wiz1_why_2_public", "wiz1_why_3_public", "wiz1_why_4_public"]
    : ["wiz1_why_1_private", "wiz1_why_2_private", "wiz1_why_3_private", "wiz1_why_4_private"];

  return (
    <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
      <div className="mb-7 md:mb-9">
        <WizardStepper
          steps={[t("wiz_step_opportunity"), t("wiz_step_analysis"), t("wiz_step_preparation"), t("wiz_step_validation")]}
          current={0}
        />
      </div>

      <div className="eyebrow mb-4">{isPublic ? t("wiz1_eyebrow_public") : t("wiz1_eyebrow_private")}</div>
      <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[26ch]">
        {listing.title}
      </h1>
      <p className="text-ink-soft mt-2">{listing.buyer}</p>

      <div className="mt-4 flex items-center gap-2.5 flex-wrap">
        <span className="badge badge-warning">{t("wiz1_badge_new")}</span>
        <span className="inline-flex items-center gap-1.5 text-[12px] font-mono font-semibold px-3 py-1.5 rounded-full border border-success text-success">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 15l6-6 4 4 6-8" />
            <path d="M20 5h-4v4" />
          </svg>
          {t("wiz1_badge_match")}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 card p-5">
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("wiz1_stat_location")}</span>
          <span className="font-mono text-[14px]">{listing.location}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("wiz1_stat_budget")}</span>
          <span className="font-mono text-[14px]">{listing.budget}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">
            {isPublic ? t("wiz1_stat_deadline_public") : t("wiz1_stat_deadline_private")}
          </span>
          <span className="font-mono text-[14px]">{listing.deadline}</span>
        </div>
        <div>
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1">{t("wiz1_stat_duration")}</span>
          <span className="font-mono text-[14px]">{listing.estimatedEndDate ?? "—"}</span>
        </div>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="font-display font-bold text-[16px] mb-2">{t("wiz1_seeking_title")}</h2>
        <p className="text-ink-soft text-[14.5px] leading-relaxed">
          {listing.description ?? t("detail_ai_pending")}
        </p>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="font-display font-bold text-[16px] mb-4">{t("wiz1_why_title")}</h2>
        <div className="flex flex-col gap-3">
          {why.map((key) => (
            <div key={key} className="flex items-center gap-3 text-[14.5px]">
              <span className="w-5 h-5 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12l5 5L19 7" />
                </svg>
              </span>
              {t(key as any)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 card p-6">
        <h2 className="font-display font-bold text-[16px] mb-2">{t("wiz1_rest_title")}</h2>
        <p className="text-ink-soft text-[14.5px] leading-relaxed">
          {isPublic ? t("wiz1_rest_body_public") : t("wiz1_rest_body_private")}
        </p>
      </div>

      <Link
        href={`/${journeyKey}/${listing.id}/dossier`}
        className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-gold hover:underline underline-offset-4"
      >
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
        </svg>
        {isPublic ? t("wiz1_original_docs_public") : t("wiz1_original_docs_private")}
      </Link>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Link href={`/repondre/${listing.id}/analyse`} className="btn btn-gold">
          {t("wiz1_cta_interested")}
        </Link>
        <button
          onClick={() => toggle(listing.id)}
          aria-pressed={saved}
          className={`btn ${saved ? "btn-gold" : "btn-ghost"}`}
        >
          {saved ? t("detail_saved") : t("wiz1_cta_save")}
        </button>
      </div>
    </div>
  );
}
