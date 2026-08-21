"use client";

import Link from "next/link";
import type { Listing } from "@/lib/data";
import { useTranslation, useLanguage } from "@/lib/i18n";

function monthsBetween(startIso?: string, endIso?: string): number | null {
  if (!startIso || !endIso) return null;
  const start = new Date(startIso);
  const end = new Date(endIso);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  return Math.max(1, months);
}

function isWithinDays(iso: string | undefined, days: number, direction: "past" | "future"): boolean {
  if (!iso) return false;
  const date = new Date(iso).getTime();
  if (isNaN(date)) return false;
  const now = Date.now();
  const diffMs = direction === "future" ? date - now : now - date;
  return diffMs >= 0 && diffMs <= days * 24 * 60 * 60 * 1000;
}

export function SousTraitanceDetailContent({ listing }: { listing: Listing }) {
  const t = useTranslation();
  const { lang } = useLanguage();

  const isNew = isWithinDays(listing.publicationDate, 7, "past");
  const isUrgent = isWithinDays(listing.deadlineIso, 7, "future");
  const durationMonths = monthsBetween(listing.estimatedStartDate, listing.estimatedEndDate);
  const startDateDisplay = listing.estimatedStartDate
    ? new Date(listing.estimatedStartDate).toLocaleDateString(lang === "en" ? "en-GB" : "fr-FR", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  const facts = listing.extractedFacts
    ? Object.entries(listing.extractedFacts).filter(([, f]) => f.available)
    : [];

  return (
    <div className="max-w-[1000px] mx-auto px-5 py-8 md:py-10">
      <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[30ch]">
        {listing.title}
      </h1>

      <div className="flex gap-2 mt-3">
        {isNew && (
          <span className="text-[11.5px] font-mono font-semibold px-2.5 py-1 rounded-full border border-gold text-gold">
            {t("sub_badge_new")}
          </span>
        )}
        {isUrgent && (
          <span
            className="text-[11.5px] font-mono font-semibold px-2.5 py-1 rounded-full"
            style={{ background: "color-mix(in srgb, var(--danger) 15%, transparent)", color: "var(--danger)" }}
          >
            {t("sub_badge_urgent")}
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
        <div>
          <span className="block text-[11px] uppercase text-ink-faint font-semibold mb-1">{t("detail_location")}</span>
          <span className="text-[14.5px] font-semibold">{listing.location}</span>
        </div>
        <div>
          <span className="block text-[11px] uppercase text-ink-faint font-semibold mb-1">{t("sub_ordering_company")}</span>
          <span className="text-[14.5px] font-semibold">{listing.buyer}</span>
        </div>
        <div>
          <span className="block text-[11px] uppercase text-ink-faint font-semibold mb-1">{t("sub_trade")}</span>
          <span className="text-[14.5px] font-semibold">{listing.trade}</span>
        </div>
        {startDateDisplay && (
          <div>
            <span className="block text-[11px] uppercase text-ink-faint font-semibold mb-1">{t("sub_start_date")}</span>
            <span className="text-[14.5px] font-semibold">{startDateDisplay}</span>
          </div>
        )}
        {durationMonths && (
          <div>
            <span className="block text-[11px] uppercase text-ink-faint font-semibold mb-1">{t("sub_duration")}</span>
            <span className="text-[14.5px] font-semibold">{t("sub_duration_months", { n: durationMonths })}</span>
          </div>
        )}
      </div>

      <div className="mt-6 card p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display font-bold text-[15px] mb-1">{t("sub_interested_title")}</h3>
          <p className="text-[13.5px] text-ink-soft">{t("sub_interested_sub")}</p>
        </div>
        <div className="flex gap-3 flex-wrap shrink-0">
          <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}`} className="btn btn-gold">
            {t("sub_book_appointment")}
          </Link>
          <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}&rappel=1`} className="btn btn-ghost">
            {t("sub_be_called_back")}
          </Link>
        </div>
      </div>

      <div className="mt-4 flex gap-3 flex-wrap">
        <Link href={`/${listing.journey}/${listing.id}/dossier`} className="btn btn-gold flex-1 sm:flex-none">
          {t("sub_view_full")}
        </Link>
        <Link href={`/${listing.journey}/${listing.id}/dossier`} className="btn btn-ghost flex-1 sm:flex-none">
          {t("sub_download_brief")}
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {listing.description && (
          <div className="card p-5">
            <h3 className="font-display font-bold text-[15px] mb-3">{t("sub_description_title")}</h3>
            <p className="text-[13.5px] leading-relaxed text-ink-soft whitespace-pre-line">{listing.description}</p>
          </div>
        )}

        <div className="card p-5">
          <h3 className="font-display font-bold text-[15px] mb-3">{t("sub_budget_title")}</h3>
          <p className="font-display font-bold text-[19px]">{listing.budget}</p>
        </div>

        {facts.length > 0 && (
          <div className="card p-5 md:col-span-2">
            <h3 className="font-display font-bold text-[15px] mb-3">{t("sub_facts_title")}</h3>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {facts.map(([key, fact]) => (
                <div key={key}>
                  <dt className="text-[11px] uppercase text-ink-faint font-semibold mb-0.5">{key.replace(/_/g, " ")}</dt>
                  <dd className="text-[13.5px]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}

        {(listing.locationCity || listing.distanceKm > 0) && (
          <div className="card p-5 md:col-span-2">
            <h3 className="font-display font-bold text-[15px] mb-3">{t("sub_zone_title")}</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-gold" />
              </div>
              <p className="text-[13.5px] text-ink-soft">
                {listing.locationCity ? t("sub_zone_around", { city: listing.locationCity }) : listing.location}
              </p>
            </div>
          </div>
        )}

        <div className="card p-5 md:col-span-2">
          <h3 className="font-display font-bold text-[15px] mb-3">{t("sub_docs_title")}</h3>
          <p className="text-[13.5px] text-ink-faint">{t("sub_docs_none")}</p>
        </div>
      </div>

      <div className="mt-8 panel-dark p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display font-bold text-[15px] mb-1">{t("sub_help_title")}</h3>
          <p className="text-[13.5px] opacity-75">{t("sub_help_sub")}</p>
        </div>
        <div className="flex gap-3 flex-wrap shrink-0">
          <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}`} className="btn btn-gold">
            {t("sub_book_appointment")}
          </Link>
          <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}&rappel=1`} className="btn btn-ghost">
            {t("sub_be_called_back")}
          </Link>
        </div>
      </div>
    </div>
  );
}
