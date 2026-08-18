"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { listings } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const bids = [
  { listing: listings[0], statusKey: "bid_status_progress" as const },
  { listing: listings[2], statusKey: "bid_status_submitted" as const },
  { listing: listings[4], statusKey: "bid_status_prepare" as const },
  { listing: listings[1], statusKey: "bid_status_won" as const },
];

const statusStyle: Record<string, string> = {
  bid_status_prepare: "bg-ink-faint/15 text-ink-faint",
  bid_status_progress: "bg-gold/15 text-gold",
  bid_status_submitted: "bg-[color-mix(in_srgb,var(--card-2)_20%,transparent)] text-[var(--card-2)]",
  bid_status_won: "bg-gold text-gold-ink",
  bid_status_lost: "bg-ink-faint/15 text-ink-faint line-through",
};

export default function MyResponsesPage() {
  const t = useTranslation();

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("bids_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">{t("bids_title")}</h1>
        <p className="text-ink-soft mt-2 max-w-[56ch]">{t("bids_sub")}</p>

        <div className="mt-8 flex flex-col gap-3">
          {bids.map(({ listing, statusKey }) => (
            <Link
              key={listing.id}
              href={`/repondre/${listing.id}`}
              className="card p-5 flex items-center justify-between gap-4 flex-wrap hover:border-gold transition-colors"
            >
              <div>
                <h3 className="font-display font-bold text-[15.5px] mb-1">{listing.title}</h3>
                <p className="text-ink-soft text-[13px]">{listing.buyer} &middot; {t("bids_deadline")} {listing.deadline}</p>
              </div>
              <span className={`text-[12px] font-mono font-semibold px-3 py-1.5 rounded-full shrink-0 ${statusStyle[statusKey]}`}>
                {t(statusKey)}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
