"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation, useLanguage } from "@/lib/i18n";

// expiresInDays is relative to "today" in the mock data set (used only to demo the
// expiry-alert UI); in production this would come from real document expiry dates.
const sectionsByLang = {
  fr: [
    { title: "Identite de l'entreprise", desc: "KBIS, forme juridique, effectif, chiffre d'affaires, capital social.", status: "Complet" },
    { title: "Conformite fiscale et sociale", desc: "Attestations fiscales et sociales, attestation de vigilance.", status: "Complet" },
    { title: "Assurances", desc: "Responsabilite civile professionnelle, garantie decennale - avec dates de validite.", status: "A completer", expiresInDays: 18, validUntil: "5 sept. 2026" },
    { title: "Certifications et qualifications", desc: "Qualibat, RGE, et autres qualifications professionnelles.", status: "A completer", expiresInDays: 120, validUntil: "12 dec. 2026" },
    { title: "References et chantiers realises", desc: "Photos, montants, clients, dates - reutilisees automatiquement dans vos memoires techniques.", status: "Incomplet" },
    { title: "Moyens humains et materiels", desc: "Effectif par metier, qualifications, liste du materiel et des vehicules.", status: "Incomplet" },
    { title: "Politique QSE", desc: "Qualite, hygiene-securite, environnement - texte reutilisable d'une reponse a l'autre.", status: "A completer" },
  ],
  en: [
    { title: "Company identity", desc: "Registration certificate (KBIS), legal form, headcount, turnover, share capital.", status: "Complete" },
    { title: "Tax and social compliance", desc: "Tax and social security certificates, vigilance certificate.", status: "Complete" },
    { title: "Insurance", desc: "Professional liability, ten-year (decennale) cover - with validity dates.", status: "To complete", expiresInDays: 18, validUntil: "Sep 5, 2026" },
    { title: "Certifications and qualifications", desc: "Qualibat, RGE, and other professional qualifications.", status: "To complete", expiresInDays: 120, validUntil: "Dec 12, 2026" },
    { title: "References and past projects", desc: "Photos, amounts, clients, dates - automatically reused in your technical memos.", status: "Incomplete" },
    { title: "Human and material resources", desc: "Headcount by trade, qualifications, equipment and vehicle list.", status: "Incomplete" },
    { title: "Quality, health & safety, environmental policy", desc: "Reusable text across submissions.", status: "To complete" },
  ],
};

const statusColor: Record<string, string> = {
  Complet: "text-gold",
  Complete: "text-gold",
  "A completer": "text-ink-soft",
  "To complete": "text-ink-soft",
  Incomplet: "text-ink-faint",
  Incomplete: "text-ink-faint",
};

function expiryBadgeClass(days: number) {
  if (days <= 30) return "badge badge-danger";
  if (days <= 60) return "badge badge-warning";
  return "badge badge-valid";
}

function expiryLabelKey(days: number): "doc_expiry_expired" | "doc_expiry_soon" | "doc_expiry_valid" {
  if (days <= 0) return "doc_expiry_expired";
  if (days <= 60) return "doc_expiry_soon";
  return "doc_expiry_valid";
}

export default function CompanyProfilePage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const sections = sectionsByLang[lang];
  const expiringSoon = sections.filter((s) => typeof s.expiresInDays === "number" && s.expiresInDays <= 60);

  return (
    <>
      <Header />
      <div className="max-w-[820px] mx-auto px-5 py-8 md:py-10">
        <div className="eyebrow mb-4">{t("profile_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">
          {t("profile_title")}
        </h1>
        <p className="text-ink-soft mt-3 max-w-[60ch]">{t("profile_sub")}</p>

        {expiringSoon.length > 0 && (
          <div className="mt-6 card p-4 flex items-center gap-3 border-l-4" style={{ borderLeftColor: "var(--warning)" }}>
            <span className="badge badge-warning shrink-0">{t("doc_expiry_soon")}</span>
            <p className="text-[13.5px]">{t("today_docs_expiring", { count: expiringSoon.length })}</p>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {sections.map((s) => (
            <div key={s.title} className="card p-4 md:p-5 flex items-center justify-between gap-4 flex-wrap">
              <div className="min-w-0">
                <h3 className="font-display font-bold text-[15px] md:text-[15.5px] mb-1">{s.title}</h3>
                <p className="text-ink-soft text-[13px] md:text-[13.5px] max-w-[52ch]">{s.desc}</p>
                {typeof s.expiresInDays === "number" && (
                  <p className="text-ink-faint text-[12px] font-mono mt-1.5">
                    {t("doc_expiry_label")}: {s.validUntil}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className={`font-mono text-[12px] font-semibold ${statusColor[s.status]}`}>
                  {s.status}
                </span>
                {typeof s.expiresInDays === "number" && (
                  <span className={expiryBadgeClass(s.expiresInDays)}>{t(expiryLabelKey(s.expiresInDays))}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
