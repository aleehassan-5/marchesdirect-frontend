"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { submitLead, LeadError } from "@/lib/leadClient";

export default function ContactPage() {
  const t = useTranslation();
  const searchParams = useSearchParams();
  const listingRef = searchParams.get("ref");
  const listingTitle = searchParams.get("titre");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState(listingTitle ? `${t("contact_re_listing")} ${listingTitle}` : "");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const [firstName, ...rest] = name.trim().split(/\s+/);
      await submitLead({
        firstName: firstName || undefined,
        lastName: rest.join(" ") || undefined,
        email,
        phone: phone || undefined,
        companyName: company || undefined,
        // The backend's crm_leads table has no free-text notes column, so the
        // "besoin" message and the listing reference (if any) are folded into
        // industryTrade - not ideal long-term, but it means the information
        // isn't silently thrown away either.
        industryTrade: [need, listingRef ? `(ref: ${listingRef})` : ""].filter(Boolean).join(" - ") || undefined,
        leadSource: listingRef ? "listing_renseignement" : "contact_page",
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof LeadError ? err.message : t("contact_error_generic"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[520px] mx-auto px-5 py-14 md:py-20">
        <h1 className="font-display font-extrabold text-[26px] md:text-[30px] tracking-tight mb-2">
          {t("contact_title")}
        </h1>
        <p className="text-ink-soft text-[14.5px] mb-8">{t("contact_sub")}</p>

        {sent ? (
          <div className="card p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center text-gold mx-auto mb-3">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-display font-bold text-[17px] mb-1.5">{t("contact_success_title")}</h2>
            <p className="text-ink-soft text-[14px]">{t("contact_success_body")}</p>
          </div>
        ) : (
          <form className="card p-6 flex flex-col gap-4" onSubmit={onSubmit}>
            {listingTitle && (
              <div className="text-[13px] bg-gold/10 text-gold rounded-[10px] px-3.5 py-2.5 font-medium">
                {t("contact_re_listing")} {listingTitle}
              </div>
            )}
            {error && (
              <div className="text-[13px] text-danger bg-danger/10 border border-danger/30 rounded-[10px] px-3.5 py-2.5">
                {error}
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold">{t("contact_name")}</label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold">{t("contact_company")}</label>
              <input
                type="text" value={company} onChange={(e) => setCompany(e.target.value)}
                className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("contact_email")}</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("contact_phone")}</label>
                <input
                  type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold">{t("contact_need")}</label>
              <textarea
                rows={4} value={need} onChange={(e) => setNeed(e.target.value)}
                placeholder={t("contact_need_placeholder") as string}
                className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold resize-none"
              />
            </div>
            <button type="submit" disabled={submitting} className="btn btn-gold mt-1 disabled:opacity-60">
              {submitting ? t("contact_submitting") : t("contact_submit")}
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}
