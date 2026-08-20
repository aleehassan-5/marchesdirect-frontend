"use client";

import Link from "next/link";
import type { Listing } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

export function ListingCard({ listing }: { listing: Listing }) {
  const t = useTranslation();
  const isAnalyzed = listing.status === "Analyse";

  return (
    <Link
      href={`/${listing.journey}/${listing.id}`}
      className="card p-4 md:p-5 flex flex-col gap-2 md:gap-3 hover:border-gold active:scale-[0.99] transition-transform"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-bold text-[15px] md:text-[16.5px] leading-snug line-clamp-2">{listing.title}</h3>
        <span
          className={`shrink-0 text-[10.5px] md:text-[11px] font-mono font-semibold px-2 py-1 rounded-full ${
            isAnalyzed ? "bg-gold/15 text-gold" : "bg-ink-faint/15 text-ink-faint"
          }`}
        >
          {isAnalyzed ? t("listing_status_analyzed") : t("listing_status_pending")}
        </span>
      </div>
      <p className="text-ink-soft text-[12.5px] md:text-[13.5px] truncate">{listing.buyer} &middot; {listing.location} &middot; {listing.distanceKm} km</p>

      {/* Compact on mobile: budget + deadline only, CPV/trade tucked into the footer row */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] md:text-[13px] text-ink-soft font-mono">
        <span>{listing.budget}</span>
        <span>{t("listing_deadline")} {listing.deadline}</span>
        {listing.cpv && <span className="hidden sm:inline">CPV {listing.cpv}</span>}
      </div>

      <div className="flex items-center justify-between mt-0.5 md:mt-1 pt-2.5 md:pt-3 border-t border-border-soft">
        <span className="text-[12px] md:text-[13px] text-ink-soft truncate">{listing.trade}</span>
        <span className="shrink-0 text-[12.5px] md:text-[13px] font-semibold text-gold">{listing.matchScore}% {t("listing_match")}</span>
      </div>
    </Link>
  );
}
