"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmptyState, ErrorState } from "@/components/States";
import { useTranslation } from "@/lib/i18n";
import { getSession, getMyBids, type MyBid } from "@/lib/authClient";

const statusKeyMap: Record<string, "bid_status_prepare" | "bid_status_progress" | "bid_status_submitted" | "bid_status_won" | "bid_status_lost"> = {
  draft: "bid_status_prepare",
  in_progress: "bid_status_progress",
  submitted: "bid_status_submitted",
  awarded: "bid_status_won",
  lost: "bid_status_lost",
};

const statusStyle: Record<string, string> = {
  bid_status_prepare: "bg-ink-faint/15 text-ink-faint",
  bid_status_progress: "bg-gold/15 text-gold",
  bid_status_submitted: "bg-[color-mix(in_srgb,var(--card-2)_20%,transparent)] text-[var(--card-2)]",
  bid_status_won: "bg-gold text-gold-ink",
  bid_status_lost: "bg-ink-faint/15 text-ink-faint line-through",
};

export default function MyResponsesPage() {
  const t = useTranslation();
  const router = useRouter();
  const [bids, setBids] = useState<MyBid[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
      return;
    }
    getMyBids()
      .then(setBids)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("bids_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">{t("bids_title")}</h1>
        <p className="text-ink-soft mt-2 max-w-[56ch]">{t("bids_sub")}</p>

        <div className="mt-8">
          {loading && <p className="text-ink-soft text-[14px]">{t("state_loading")}</p>}
          {!loading && error && <ErrorState />}
          {!loading && !error && bids.length === 0 && <EmptyState />}
          {!loading && !error && bids.length > 0 && (
            <div className="flex flex-col gap-3">
              {bids.map((bid) => {
                const statusKey = statusKeyMap[bid.status] ?? "bid_status_prepare";
                return (
                  <Link
                    key={bid.id}
                    href={`/repondre/${bid.opportunity_id}`}
                    className="card p-5 flex items-center justify-between gap-4 flex-wrap hover:border-gold transition-colors"
                  >
                    <div>
                      <h3 className="font-display font-bold text-[15.5px] mb-1">{bid.title}</h3>
                      <p className="text-ink-soft text-[13px]">
                        {bid.location_city ?? ""} {bid.deadline ? `\u00b7 ${t("bids_deadline")} ${bid.deadline}` : ""}
                      </p>
                    </div>
                    <span className={`text-[12px] font-mono font-semibold px-3 py-1.5 rounded-full shrink-0 ${statusStyle[statusKey]}`}>
                      {t(statusKey)}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
