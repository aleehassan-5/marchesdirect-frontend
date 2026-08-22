"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import type { Listing } from "@/lib/data";
import { fetchOpportunityById } from "@/lib/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WizardStepper } from "@/components/WizardStepper";
import { useTranslation } from "@/lib/i18n";

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center justify-between gap-4 py-2.5 border-b border-border-soft last:border-b-0 cursor-pointer">
      <span className="text-[14.5px] flex-1">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`w-11 h-6 rounded-full shrink-0 relative transition-colors ${checked ? "bg-success" : "bg-border"}`}
      >
        <span
          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-[22px]" : "translate-x-0.5"}`}
        />
      </button>
    </label>
  );
}

export default function ValidationPage({ params }: { params: { id: string } }) {
  const t = useTranslation();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);
  const [t1, setT1] = useState(true);
  const [t2, setT2] = useState(true);
  const [t3, setT3] = useState(true);
  const [submitted, setSubmitted] = useState(false);

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
    ? ["wiz4_check_1_public", "wiz4_check_2_public", "wiz4_check_3_public", "wiz4_check_4_public", "wiz4_check_5_public"]
    : ["wiz4_check_1_private", "wiz4_check_2_private", "wiz4_check_3_private", "wiz4_check_4_private", "wiz4_check_5_private"];
  const allOn = t1 && t2 && t3;

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="mb-7 md:mb-9">
          <WizardStepper
            steps={[t("wiz_step_opportunity"), t("wiz_step_analysis"), t("wiz_step_preparation"), t("wiz_step_validation")]}
            current={3}
          />
        </div>

        <div className="eyebrow mb-4">{t("wiz4_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[26ch]">
          {isPublic ? t("wiz4_title_public") : t("wiz4_title_private")}
        </h1>
        <p className="text-ink-soft mt-2 max-w-[52ch]">{isPublic ? t("wiz4_sub_public") : t("wiz4_sub_private")}</p>

        <div className="mt-6 card p-6">
          <span className="inline-flex items-center gap-2 text-[12px] font-mono font-bold uppercase tracking-wide badge-success px-3 py-1.5 rounded-full mb-4">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L19 7" />
            </svg>
            {isPublic ? t("wiz4_ready_badge_public") : t("wiz4_ready_badge_private")}
          </span>
          <div className="flex flex-col gap-1">
            {checks.map((key) => (
              <div key={key} className="flex items-center gap-3 text-[14.5px] py-2 border-b border-border-soft last:border-b-0">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--success)" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                  <path d="M5 12l5 5L19 7" />
                </svg>
                {t(key as any)}
              </div>
            ))}
            <div className="flex items-center gap-3 text-[14px] text-ink-soft pt-3">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              {isPublic ? (
                <span>{t("wiz4_deposit_before")} <span className="text-gold font-semibold">{listing.deadline}</span></span>
              ) : (
                <span>{t("wiz4_transmission_today")}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 card p-6">
          <h2 className="font-display font-bold text-[16px] mb-2">{t("wiz4_validation_title")}</h2>
          <div>
            <Toggle checked={t1} onChange={() => setT1((v) => !v)} label={t("wiz4_toggle_1") as string} />
            <Toggle checked={t2} onChange={() => setT2((v) => !v)} label={t(isPublic ? "wiz4_toggle_2_public" : "wiz4_toggle_2_private") as string} />
            <Toggle checked={t3} onChange={() => setT3((v) => !v)} label={t(isPublic ? "wiz4_toggle_3_public" : "wiz4_toggle_3_private") as string} />
          </div>
        </div>

        <div className="mt-6 card p-6 flex items-start gap-3.5">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8h.01M11 12h1v5h1" />
          </svg>
          <div>
            <h3 className="font-display font-bold text-[15px] mb-1">{t("wiz4_after_title")}</h3>
            <p className="text-ink-soft text-[13.5px] leading-relaxed">
              {isPublic ? t("wiz4_after_body_public") : t("wiz4_after_body_private")}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-[20px] border-2 border-success bg-success/10 p-6 text-center">
            <p className="font-display font-bold text-[15.5px] text-success">
              {isPublic ? t("wiz4_cta_validate_public") : t("wiz4_cta_validate_private")} ✓
            </p>
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-3">
            <button disabled={!allOn} onClick={() => setSubmitted(true)} className="btn btn-gold w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
              {isPublic ? t("wiz4_cta_validate_public") : t("wiz4_cta_validate_private")}
            </button>
            <button className="btn btn-ghost w-full justify-center">{t("wiz4_cta_modify")}</button>
          </div>
        )}

        <p className="text-ink-faint text-[12.5px] mt-5 flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="10" width="14" height="9" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {isPublic ? t("wiz4_footer_public") : t("wiz4_footer_private")}
        </p>
      </div>
      <Footer />
    </>
  );
}
