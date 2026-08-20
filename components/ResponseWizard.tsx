"use client";

import { useState } from "react";
import { useTranslation, useLanguage } from "@/lib/i18n";

const dceCriteria = [
  { label: "Critere prix", label_en: "Price criterion", weight: "40%" },
  { label: "Critere valeur technique", label_en: "Technical value criterion", weight: "45%" },
  { label: "Critere delais", label_en: "Deadline criterion", weight: "15%" },
];

const requiredDocs = [
  { name: "DC1 - Lettre de candidature", name_en: "DC1 - Letter of application", fromProfile: true },
  { name: "DC2 - Declaration du candidat", name_en: "DC2 - Candidate declaration", fromProfile: true },
  { name: "Attestation d'assurance decennale", name_en: "Ten-year insurance certificate", fromProfile: true },
  { name: "Attestation de vigilance", name_en: "Vigilance certificate", fromProfile: true },
  { name: "Memoire technique", name_en: "Technical memo", fromProfile: false },
  { name: "Bordereau de prix (BPU)", name_en: "Pricing schedule (BPU)", fromProfile: false },
];

const adminDocs = [
  { fr: "DC1 - Lettre de candidature", en: "DC1 - Letter of application" },
  { fr: "DC2 - Declaration du candidat", en: "DC2 - Candidate declaration" },
  { fr: "Acte d'engagement", en: "Engagement act" },
];

const memoSections = [
  { fr: "Presentation de l'entreprise et organisation", en: "Company presentation and organisation" },
  { fr: "Moyens humains et materiels affectes au projet", en: "Human and material resources assigned to the project" },
  { fr: "Methodologie d'execution et phasage", en: "Execution methodology and phasing" },
  { fr: "Planning previsionnel", en: "Preliminary schedule" },
  { fr: "References similaires", en: "Similar references" },
  { fr: "Mesures qualite, securite, environnement", en: "Quality, safety, environmental measures" },
];

const priceRows = [
  { item: "Installation de chantier", item_en: "Site setup", unit: "Forfait", unit_en: "Lump sum", qty: 1 },
  { item: "Depose existant", item_en: "Removal of existing structure", unit: "m2", unit_en: "m2", qty: 240 },
  { item: "Fourniture et pose - lot principal", item_en: "Supply and installation - main package", unit: "m2", unit_en: "m2", qty: 240 },
  { item: "Repli de chantier", item_en: "Site closeout", unit: "Forfait", unit_en: "Lump sum", qty: 1 },
];

export function ResponseWizard() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const [step, setStep] = useState(0);
  const isEn = lang === "en";

  const steps = [t("wiz_step_dce"), t("wiz_step_admin"), t("wiz_step_memo"), t("wiz_step_pricing"), t("wiz_step_final")];

  return (
    <div className="mt-8">
      <div className="flex gap-1 overflow-x-auto border-b border-border-soft">
        {steps.map((label, i) => (
          <button
            key={label}
            onClick={() => setStep(i)}
            className={`px-3.5 py-2.5 text-[13px] font-semibold whitespace-nowrap border-b-2 -mb-px ${
              i === step ? "border-gold text-ink" : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {i + 1}. {label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {step === 0 && (
          <div className="flex flex-col gap-5">
            <div className="card p-5">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <h3 className="font-display font-bold text-[15.5px]">{t("wiz_criteria_title")}</h3>
                <span className="ai-badge">{t("ai_draft_badge")}</span>
              </div>
              <p className="text-ink-soft text-[13px] mb-1">{t("wiz_criteria_sub")}</p>
              <p className="text-ink-faint text-[12px] mb-4">{t("ai_review_required")}</p>
              <div className="flex flex-col gap-2">
                {dceCriteria.map((c) => (
                  <div key={c.label} className="flex items-center justify-between text-[14px] border-b border-border-soft pb-2">
                    <span>{isEn ? c.label_en : c.label}</span>
                    <span className="font-mono text-gold">{c.weight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <h3 className="font-display font-bold text-[15.5px]">{t("wiz_checklist_title")}</h3>
                <span className="text-[12px] font-mono text-ink-faint">
                  {requiredDocs.filter((d) => d.fromProfile).length} / {requiredDocs.length}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-border-soft overflow-hidden mb-4">
                <div
                  className="h-full bg-gold rounded-full"
                  style={{ width: `${(requiredDocs.filter((d) => d.fromProfile).length / requiredDocs.length) * 100}%` }}
                />
              </div>
              <div className="flex flex-col gap-1">
                {requiredDocs.map((d) => (
                  <div key={d.name} className="flex items-center gap-2.5 text-[14px] py-1.5 border-b border-border-soft last:border-b-0">
                    {d.fromProfile ? (
                      <span className="w-4 h-4 rounded-full bg-gold text-gold-ink flex items-center justify-center shrink-0">
                        <svg viewBox="0 0 24 24" width="10" height="10" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12l5 5L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                        <path d="M12 9v4m0 4h.01M10.3 3.9L2.7 17.5a1.5 1.5 0 0 0 1.3 2.3h16a1.5 1.5 0 0 0 1.3-2.3L13.7 3.9a1.5 1.5 0 0 0-2.6 0z" />
                      </svg>
                    )}
                    <span className="flex-1">{isEn ? d.name_en : d.name}</span>
                    <span className={`text-[12px] font-mono font-semibold shrink-0 ${d.fromProfile ? "text-gold" : "text-ink-faint"}`}>
                      {d.fromProfile ? t("wiz_from_profile") : t("wiz_to_generate")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-1">{t("wiz_admin_title")}</h3>
            <p className="text-ink-soft text-[13px] mb-4">{t("wiz_admin_sub")}</p>
            <div className="flex flex-col gap-2.5">
              {adminDocs.map((d) => (
                <div key={d.fr} className="flex items-center justify-between border border-border-soft rounded-[10px] px-4 py-3">
                  <span className="text-[14px]">{isEn ? d.en : d.fr}</span>
                  <button className="text-[13px] font-semibold text-gold">{t("wiz_preview")}</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="card p-5">
            <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
              <h3 className="font-display font-bold text-[15.5px]">{t("wiz_memo_title")}</h3>
              <span className="ai-badge">{t("ai_draft_badge")}</span>
            </div>
            <p className="text-ink-soft text-[13px] mb-1">{t("wiz_memo_sub")}</p>
            <p className="text-ink-faint text-[12px] mb-4 font-semibold">{t("ai_review_required")}</p>
            <div className="flex flex-col gap-2">
              {memoSections.map((s, i) => (
                <div key={s.fr} className="flex items-center justify-between gap-3 border-b border-border-soft py-2.5">
                  <span className="text-[14px]">{i + 1}. {isEn ? s.en : s.fr}</span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <input type="checkbox" className="accent-[var(--gold)]" aria-label={t("ai_review_done") as string} />
                    <span className="text-[12px] font-mono text-gold whitespace-nowrap">{t("wiz_draft_ready")}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card p-5 overflow-x-auto">
            <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
              <h3 className="font-display font-bold text-[15.5px]">{t("wiz_pricing_title")}</h3>
              <span className="ai-badge">{t("ai_draft_badge")}</span>
            </div>
            <p className="text-ink-soft text-[13px] mb-4">{t("wiz_pricing_sub")}</p>
            <table className="w-full text-[13.5px] min-w-[480px]">
              <thead>
                <tr className="text-left text-ink-faint text-[11px] uppercase tracking-wide">
                  <th className="pb-2 font-semibold">{t("wiz_col_item")}</th>
                  <th className="pb-2 font-semibold">{t("wiz_col_unit")}</th>
                  <th className="pb-2 font-semibold">{t("wiz_col_qty")}</th>
                  <th className="pb-2 font-semibold">{t("wiz_col_price")}</th>
                </tr>
              </thead>
              <tbody>
                {priceRows.map((r) => (
                  <tr key={r.item} className="border-t border-border-soft">
                    <td className="py-2.5">{isEn ? r.item_en : r.item}</td>
                    <td className="py-2.5 font-mono">{isEn ? r.unit_en : r.unit}</td>
                    <td className="py-2.5 font-mono">{r.qty}</td>
                    <td className="py-2.5">
                      <input placeholder="EUR" className="bg-transparent border border-border rounded-md px-2 py-1 w-24 text-[13px] outline-none focus:border-gold" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {step === 4 && (
          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-4">{t("wiz_final_title")}</h3>
            <div className="flex flex-col gap-2.5">
              {["wiz_final_1", "wiz_final_2", "wiz_final_3", "wiz_final_4", "wiz_final_5"].map((key) => (
                <label key={key} className="flex items-center gap-2.5 text-[14px]">
                  <input type="checkbox" className="accent-[var(--gold)]" />
                  {t(key as any)}
                </label>
              ))}
            </div>
            <button className="btn btn-gold mt-5">{t("wiz_final_export")}</button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="btn btn-ghost"
          disabled={step === 0}
        >
          {t("wiz_prev")}
        </button>
        <button
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          className="btn btn-gold"
          disabled={step === steps.length - 1}
        >
          {t("wiz_next")}
        </button>
      </div>
    </div>
  );
}
