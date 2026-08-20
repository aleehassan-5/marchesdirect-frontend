"use client";

import { useState } from "react";
import Link from "next/link";
import type { Listing } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";
import { StepIndicator } from "./StepIndicator";

type Doc = { label: string; ext: string };

export function DossierContent({ listing }: { listing: Listing }) {
  const t = useTranslation();

  const docs: Doc[] = [
    { label: t("detail_doc_rc") as string, ext: "PDF" },
    { label: t("detail_doc_cctp") as string, ext: "PDF" },
    { label: t("detail_doc_bpu") as string, ext: "XLSX" },
  ];

  const [checked, setChecked] = useState<boolean[]>(docs.map(() => false));
  const selectedCount = checked.filter(Boolean).length;

  const toggle = (i: number) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const selectAll = () => setChecked(docs.map(() => true));

  return (
    <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
      <div className="mb-6 md:mb-8">
        <StepIndicator
          steps={[t("detail_step_dossier"), t("detail_step_analysis"), t("detail_step_response"), t("detail_step_sending")]}
          current={0}
        />
      </div>

      <h1 className="font-display font-extrabold text-[clamp(20px,3.4vw,28px)] tracking-tight max-w-[26ch]">
        {t("detail_documents")}
      </h1>
      <p className="text-ink-soft mt-2 text-[14px]">{listing.title}</p>

      <div className="mt-6 card p-4 md:p-6">
        <ul className="flex flex-col gap-1">
          {docs.map((doc, i) => (
            <li
              key={doc.label}
              className="flex items-center gap-3 text-[14px] py-3 border-b border-border-soft last:border-b-0"
            >
              <button
                onClick={() => toggle(i)}
                aria-pressed={checked[i]}
                aria-label={doc.label}
                className={`w-5 h-5 rounded-[4px] border-2 shrink-0 flex items-center justify-center transition-colors ${
                  checked[i] ? "bg-gold border-gold" : "border-border"
                }`}
              >
                {checked[i] && (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="var(--gold-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                )}
              </button>
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

        <div className="mt-4 pt-4 border-t border-border-soft flex items-center justify-between flex-wrap gap-3">
          <span className="text-[13px] text-ink-soft">
            {selectedCount} {t("detail_doc_selected")}
          </span>
          <div className="flex items-center gap-3">
            <button onClick={selectAll} className="text-[13px] font-semibold text-ink-soft underline underline-offset-4 hover:text-ink">
              {t("detail_doc_selectall")}
            </button>
            <button className="btn btn-gold py-2 px-4 text-[13.5px]">
              {t("detail_doc_download_selected")}
            </button>
          </div>
        </div>
      </div>

      <h2 className="font-display font-bold text-[16px] mt-8 mb-3">{t("detail_prep_title")}</h2>
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_docs")}</span>
          <span className="font-display font-bold text-[18px] md:text-[20px]">
            {selectedCount} / {docs.length}
          </span>
        </div>
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_todo")}</span>
          <span className="font-display font-bold text-[18px] md:text-[20px]">{docs.length - selectedCount}</span>
        </div>
        <div className="card p-4">
          <span className="text-[11px] uppercase text-ink-faint font-semibold block mb-1.5">{t("detail_prep_deadline")}</span>
          <span className="font-display font-bold text-[14px] md:text-[15px] font-mono">{listing.deadline}</span>
        </div>
      </div>

      <div className="mt-6 panel-dark p-5 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="font-display font-bold text-[15px] mb-1">{t("detail_ai_assist_title")}</h3>
          <p className="text-[13.5px] opacity-75">{t("detail_ai_assist_desc")}</p>
          <span className="ai-badge mt-2 inline-block">{t("detail_ai_assist_soon")}</span>
        </div>
        <button disabled className="btn btn-ghost opacity-50 cursor-not-allowed shrink-0">
          {t("detail_ai_assist_launch")}
        </button>
      </div>

      <div className="mt-8 flex gap-3 flex-wrap">
        <Link href={`/${listing.journey}/${listing.id}`} className="btn btn-ghost">
          {t("detail_back_to_listing")}
        </Link>
        <Link href={`/repondre/${listing.id}`} className="btn btn-gold">
          {t("detail_prepare_response")}
        </Link>
      </div>
    </div>
  );
}
