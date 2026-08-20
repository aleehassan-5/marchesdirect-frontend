"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingCard } from "@/components/ListingCard";
import { TodayActions } from "@/components/TodayActions";
import { journeys, listings } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { getSession, getMe, type MeResponse } from "@/lib/authClient";

const labelKey: Record<string, "nav_tenders" | "nav_public" | "nav_subcontract"> = {
  "appels-doffres": "nav_tenders",
  "marches-publics": "nav_public",
  "sous-traitance": "nav_subcontract",
};

export default function DashboardPage() {
  const t = useTranslation();
  const router = useRouter();
  const journeyKeys = Object.keys(journeys) as Array<keyof typeof journeys>;

  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // No server-side guard here since the session lives in localStorage
  // (client-only) - this is the earliest point a guard can run. Anyone hitting
  // /dashboard without a session gets bounced to /connexion before any real
  // company data is fetched.
  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
      return;
    }
    getMe()
      .then(setMe)
      .catch(() => router.replace("/connexion"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-[1180px] mx-auto px-5 py-16 text-ink-soft text-[14px]">{t("state_loading")}</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-[1180px] mx-auto px-5 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <div>
            <div className="eyebrow mb-3">{t("dash_eyebrow")}</div>
            <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">
              {t("dash_greeting")}, {me?.company?.name ?? me?.user?.firstName ?? ""}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a href="/mes-reponses" className="btn btn-ghost">{t("dash_my_responses")}</a>
            <a href="/profil-entreprise" className="btn btn-ghost">{t("dash_complete_profile")}</a>
          </div>
        </div>

        <div className="mt-6">
          <TodayActions />
        </div>

        {/* Profile completeness %, matched-opportunity listings below, and TodayActions
            are still mock data (lib/data.ts) - this pass only wires the auth guard and
            the real company name/greeting. Wiring the rest to GET /api/opportunities
            filtered by the company's matched trades (Milestone 6 matching engine) and a
            real profile-completeness calculation is separate follow-up work. */}
        <div className="mt-5 card p-5 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-[13.5px] font-semibold">{t("dash_profile_complete", { pct: 62 })}</span>
            <p className="text-ink-soft text-[13px] mt-1">{t("dash_profile_hint")}</p>
          </div>
          <div className="w-full sm:w-52 h-2 rounded-full bg-border-soft overflow-hidden">
            <div className="h-full bg-gold" style={{ width: "62%" }} />
          </div>
        </div>

        <div className="mt-8 md:mt-10 flex gap-2 border-b border-border-soft overflow-x-auto">
          {journeyKeys.map((key, i) => (
            <div
              key={key}
              className={`px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap border-b-2 -mb-px ${
                i === 0 ? "border-gold text-ink" : "border-transparent text-ink-soft"
              }`}
            >
              {t(labelKey[key])}
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {listings.slice(0, 4).map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
