"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Listing } from "@/lib/data";
import { fetchOpportunityById } from "@/lib/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WizardStepper } from "@/components/WizardStepper";
import { useTranslation } from "@/lib/i18n";

export default function AnalysePage({ params }: { params: { id: string } }) {
  const t = useTranslation();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    fetchOpportunityById(params.id).then(setListing).catch(() => setListing(null));
  }, [params.id]);

  if (listing === undefined) {
    return (
      <>
        <Header />
        <div className="max-w-[900px] mx-auto px-5 py-16 text-ink-soft text-[14px]">{t("state_loading")}</div>
        <Footer />
      </>
    );
  }
  if (listing === null) return notFound();

  const isPublic = listing.journey === "marches-publics";
  const checks = isPublic
    ? ["wiz2_check_1_public", "wiz2_check_2_public", "wiz2_check_3_public", "wiz2_check_4_public"]
    : ["wiz2_check_1_private", "wiz2_check_2_private", "wiz2_check_3_private", "wiz2_check_4_private"];
  const prepList = isPublic
    ? ["wiz2_prep_1_public", "wiz2_prep_2_public", "wiz2_prep_3_public", "wiz2_prep_4_public", "wiz2_prep_5_public"]
    : ["wiz2_prep_1_private", "wiz2_prep_2_private", "wiz2_prep_3_private", "wiz2_prep_4_private", "wiz2_prep_5_private"];

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="mb-7 md:mb-9">
          <WizardStepper
            steps={[t("wiz_step_opportunity"), t("wiz_step_analysis"), t("wiz_step_preparation"), t("wiz_step_validation")]}
            current={1}
          />
        </div>

        <div className="eyebrow mb-4">{t("wiz2_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[26ch]">
          {isPublic ? t("wiz2_title_public") : t("wiz2_title_private")}
        </h1>
        <p className="text-ink-soft mt-2 max-w-[52ch]">{isPublic ? t("wiz2_sub_public") : t("wiz2_sub_private")}</p>

        <div className="mt-6 rounded-[20px] border-2 border-success bg-success/10 p-6">
          <span className="inline-flex items-center gap-2 text-[12px] font-mono font-bold uppercase tracking-wide text-success mb-4">
            <span className="w-5 h-5 rounded-full bg-success/20 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L19 7" />
              </svg>
            </span>
            {t("wiz2_recommended")}
          </span>
          <div className="flex flex-col gap-2.5">
            {checks.map((key) => (
              <div key={key} className="flex items-center gap-3 text-[14.5px] border-b border-success/20 last:border-b-0 pb-2.5 last:pb-0">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--success)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M5 12l5 5L19 7" />
                </svg>
                {t(key as any)}
              </div>
            ))}
          </div>
        </div>

        {!isPublic && (
          <div className="mt-6 card p-6">
            <h2 className="font-display font-bold text-[16px] mb-2">{t("wiz2_network_title")}</h2>
            <p className="text-ink-soft text-[14.5px] leading-relaxed mb-4">{t("wiz2_network_body")}</p>
            <div className="flex flex-wrap gap-2">
              {["wiz2_network_tag_1", "wiz2_network_tag_2", "wiz2_network_tag_3"].map((key) => (
                <span key={key} className="text-[12px] font-semibold px-3 py-1.5 rounded-full border border-gold/50 text-gold">
                  {t(key as any)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-6 card p-6">
          <h2 className="font-display font-bold text-[16px] mb-4">{isPublic ? t("wiz2_prep_title_public") : t("wiz2_prep_title_private")}</h2>
          <div className="flex flex-col gap-2.5">
            {prepList.map((key) => (
              <div key={key} className="flex items-center gap-3 text-[14.5px] border-b border-border-soft last:border-b-0 pb-2.5 last:pb-0">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--gold)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M5 12l5 5L19 7" />
                </svg>
                {t(key as any)}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 card p-6 flex items-start gap-3.5">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v5h1" />
          </svg>
          <div>
            <h3 className="font-display font-bold text-[15px] mb-1">{t("wiz2_limited_title")}</h3>
            <p className="text-ink-soft text-[13.5px] leading-relaxed">
              {isPublic ? t("wiz2_limited_body_public") : t("wiz2_limited_body_private")}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Link href={`/repondre/${listing.id}/preparation`} className="btn btn-gold w-full justify-center">
            {isPublic ? t("wiz2_cta_confide_public") : t("wiz2_cta_confide_private")}
          </Link>
          <Link href={`/contact?ref=${listing.id}&titre=${encodeURIComponent(listing.title)}`} className="btn btn-ghost w-full justify-center">
            {isPublic ? t("wiz2_cta_advisor_public") : t("wiz2_cta_advisor_private")}
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
