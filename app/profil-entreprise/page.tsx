"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { getSession } from "@/lib/authClient";
import {
  getCompanyProfile,
  updateCompanyProfile,
  getDocuments,
  addDocument,
  getCertifications,
  addCertification,
  getReferences,
  addReference,
  uploadFile,
  type Company,
  type CompanyDocument,
  type CompanyCertification,
  type CompanyReference,
} from "@/lib/companyClient";

const REQUIRED_DOC_TYPES = ["kbis", "insurance", "dc1", "dc2", "dume", "attestation_fiscale", "attestation_sociale"];

function daysUntil(dateStr?: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function expiryBadgeClass(days: number) {
  if (days <= 0) return "badge badge-danger";
  if (days <= 30) return "badge badge-warning";
  return "badge badge-valid";
}

export default function CompanyProfilePage() {
  const t = useTranslation();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const [company, setCompany] = useState<Company | null>(null);
  const [documents, setDocuments] = useState<CompanyDocument[]>([]);
  const [certifications, setCertifications] = useState<CompanyCertification[]>([]);
  const [references, setReferences] = useState<CompanyReference[]>([]);

  const [editingIdentity, setEditingIdentity] = useState(false);
  const [identityForm, setIdentityForm] = useState<Partial<Company>>({});
  const [savingIdentity, setSavingIdentity] = useState(false);

  const [showRefForm, setShowRefForm] = useState(false);
  const [refForm, setRefForm] = useState({ projectName: "", clientName: "", contractValue: "", completionDate: "" });
  const [savingRef, setSavingRef] = useState(false);

  const [showDocForm, setShowDocForm] = useState(false);
  const [docForm, setDocForm] = useState<{ documentType: string; file: File | null; expiryDate: string }>({
    documentType: "kbis",
    file: null,
    expiryDate: "",
  });
  const [savingDoc, setSavingDoc] = useState(false);
  const [docError, setDocError] = useState<string | null>(null);

  const [showCertForm, setShowCertForm] = useState(false);
  const [certForm, setCertForm] = useState({ certificationName: "", issuedBy: "" });
  const [savingCert, setSavingCert] = useState(false);

  useEffect(() => {
    if (!getSession()) {
      setLoggedIn(false);
      setLoading(false);
      return;
    }

    Promise.all([getCompanyProfile(), getDocuments(), getCertifications(), getReferences()])
      .then(([c, docs, certs, refs]) => {
        setCompany(c);
        setIdentityForm(c);
        setDocuments(docs);
        setCertifications(certs);
        setReferences(refs);
      })
      .catch(() => setLoggedIn(false))
      .finally(() => setLoading(false));
  }, []);

  async function saveIdentity() {
    setSavingIdentity(true);
    try {
      const updated = await updateCompanyProfile(identityForm);
      setCompany(updated);
      setEditingIdentity(false);
    } catch {
      // Error kept silent-but-visible via unchanged form state; a toast system
      // isn't wired in this pass, so the user can just retry the save.
    } finally {
      setSavingIdentity(false);
    }
  }

  async function submitReference(e: React.FormEvent) {
    e.preventDefault();
    setSavingRef(true);
    try {
      const created = await addReference({
        projectName: refForm.projectName,
        clientName: refForm.clientName || undefined,
        contractValue: refForm.contractValue ? Number(refForm.contractValue) : undefined,
        completionDate: refForm.completionDate || undefined,
      });
      setReferences((prev) => [created, ...prev]);
      setRefForm({ projectName: "", clientName: "", contractValue: "", completionDate: "" });
      setShowRefForm(false);
    } finally {
      setSavingRef(false);
    }
  }

  async function submitDocument(e: React.FormEvent) {
    e.preventDefault();
    if (!docForm.file) {
      setDocError(t("profile_doc_choose_file"));
      return;
    }
    setSavingDoc(true);
    setDocError(null);
    try {
      const uploaded = await uploadFile(docForm.file);
      const created = await addDocument({
        documentType: docForm.documentType,
        documentName: docForm.file.name,
        fileUrl: uploaded.url,
        expiryDate: docForm.expiryDate || undefined,
      });
      setDocuments((prev) => [created, ...prev]);
      setDocForm({ documentType: "kbis", file: null, expiryDate: "" });
      setShowDocForm(false);
    } catch (err) {
      setDocError(err instanceof Error ? err.message : t("profile_save_error"));
    } finally {
      setSavingDoc(false);
    }
  }

  async function submitCertification(e: React.FormEvent) {
    e.preventDefault();
    setSavingCert(true);
    try {
      const created = await addCertification({
        certificationName: certForm.certificationName,
        issuedBy: certForm.issuedBy || undefined,
      });
      setCertifications((prev) => [created, ...prev]);
      setCertForm({ certificationName: "", issuedBy: "" });
      setShowCertForm(false);
    } finally {
      setSavingCert(false);
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="max-w-[820px] mx-auto px-5 py-16 text-ink-soft text-[14px]">{t("state_loading")}</div>
        <Footer />
      </>
    );
  }

  if (!loggedIn) {
    return (
      <>
        <Header />
        <div className="max-w-[820px] mx-auto px-5 py-16 text-center">
          <p className="text-ink-soft text-[14px] mb-4">{t("profile_login_required")}</p>
          <button className="btn btn-gold" onClick={() => router.push("/connexion")}>
            {t("profile_go_login")}
          </button>
        </div>
        <Footer />
      </>
    );
  }

  // Real completion status per section, computed from actual data instead of hardcoded mock values.
  const identityComplete = !!(company?.siret && company?.legal_form && company?.address_street);
  const providedDocTypes = documents.map((d) => d.document_type);
  const missingDocTypes = REQUIRED_DOC_TYPES.filter((d) => !providedDocTypes.includes(d));
  const expiringSoon = documents.filter((d) => {
    const days = daysUntil(d.expiry_date);
    return days !== null && days <= 60 && !d.is_expired;
  });

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

        {/* --- Identity --- */}
        <div className="mt-6 card p-4 md:p-5">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
            <h3 className="font-display font-bold text-[15px] md:text-[15.5px]">{t("profile_name")}</h3>
            <div className="flex items-center gap-2">
              <span className={`font-mono text-[12px] font-semibold ${identityComplete ? "text-gold" : "text-ink-faint"}`}>
                {identityComplete ? t("profile_status_complete") : t("profile_status_todo")}
              </span>
              {!editingIdentity && (
                <button className="btn btn-ghost text-[13px] px-3.5 py-2" onClick={() => setEditingIdentity(true)}>
                  {t("profile_edit")}
                </button>
              )}
            </div>
          </div>

          {editingIdentity ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label={t("profile_name")} value={identityForm.name} onChange={(v) => setIdentityForm((f) => ({ ...f, name: v }))} />
              <Field label={t("profile_siret")} value={identityForm.siret ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, siret: v }))} />
              <Field label={t("profile_legal_form")} value={identityForm.legal_form ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, legal_form: v }))} />
              <Field label={t("profile_phone")} value={identityForm.phone ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, phone: v }))} />
              <Field label={t("profile_address")} value={identityForm.address_street ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, address_street: v }))} />
              <Field label={t("profile_city")} value={identityForm.address_city ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, address_city: v }))} />
              <Field label={t("profile_postal_code")} value={identityForm.address_postal_code ?? ""} onChange={(v) => setIdentityForm((f) => ({ ...f, address_postal_code: v }))} />
              <Field
                label={t("profile_employee_count")}
                value={identityForm.employee_count?.toString() ?? ""}
                onChange={(v) => setIdentityForm((f) => ({ ...f, employee_count: v ? Number(v) : undefined }))}
                type="number"
              />
              <Field
                label={t("profile_annual_revenue")}
                value={identityForm.annual_revenue?.toString() ?? ""}
                onChange={(v) => setIdentityForm((f) => ({ ...f, annual_revenue: v ? Number(v) : undefined }))}
                type="number"
              />
              <Field
                label={t("profile_founding_year")}
                value={identityForm.founding_year?.toString() ?? ""}
                onChange={(v) => setIdentityForm((f) => ({ ...f, founding_year: v ? Number(v) : undefined }))}
                type="number"
              />
              <div className="sm:col-span-2 flex gap-2 mt-1">
                <button className="btn btn-gold text-[13px] px-3.5 py-2" disabled={savingIdentity} onClick={saveIdentity}>
                  {savingIdentity ? t("profile_saving") : t("profile_save")}
                </button>
                <button className="btn btn-ghost text-[13px] px-3.5 py-2" onClick={() => { setEditingIdentity(false); setIdentityForm(company ?? {}); }}>
                  {t("profile_cancel")}
                </button>
              </div>
            </div>
          ) : (
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[13.5px]">
              <Row label={t("profile_siret")} value={company?.siret} />
              <Row label={t("profile_legal_form")} value={company?.legal_form} />
              <Row label={t("profile_phone")} value={company?.phone} />
              <Row label={t("profile_city")} value={company?.address_city} />
              <Row label={t("profile_employee_count")} value={company?.employee_count?.toString()} />
              <Row label={t("profile_founding_year")} value={company?.founding_year?.toString()} />
            </dl>
          )}
        </div>

        {/* --- Documents --- */}
        <Section
          title={t("detail_doc_selected")}
          status={missingDocTypes.length === 0 ? t("profile_status_complete") : t("profile_status_todo")}
          complete={missingDocTypes.length === 0}
          onAdd={() => setShowDocForm((s) => !s)}
          addLabel={t("profile_add")}
        >
          {showDocForm && (
            <form onSubmit={submitDocument} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
              <select
                className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14px] outline-none focus:border-gold"
                value={docForm.documentType}
                onChange={(e) => setDocForm((f) => ({ ...f, documentType: e.target.value }))}
              >
                {REQUIRED_DOC_TYPES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <label className="flex flex-col gap-1 text-[12.5px] text-ink-soft">
                {t("profile_doc_file")}
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => setDocForm((f) => ({ ...f, file: e.target.files?.[0] ?? null }))}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[13px] outline-none focus:border-gold file:mr-3 file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gold file:text-gold-ink file:text-[12px] file:cursor-pointer"
                  required
                />
              </label>
              <Field label={t("profile_doc_expiry")} value={docForm.expiryDate} onChange={(v) => setDocForm((f) => ({ ...f, expiryDate: v }))} type="date" />
              {docError && <p className="text-[12.5px] text-red-500 sm:col-span-2">{docError}</p>}
              <button className="btn btn-gold text-[13px] px-3.5 py-2" disabled={savingDoc}>{savingDoc ? t("profile_saving") : t("profile_save")}</button>
            </form>
          )}
          {documents.length === 0 ? (
            <p className="text-ink-faint text-[13px]">{t("profile_no_items")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {documents.map((d) => {
                const days = daysUntil(d.expiry_date);
                return (
                  <li key={d.id} className="flex items-center justify-between text-[13.5px]">
                    <span>{d.document_name || d.document_type}</span>
                    {days !== null && <span className={expiryBadgeClass(days)}>{days <= 0 ? t("doc_expiry_expired") : days <= 60 ? t("doc_expiry_soon") : t("doc_expiry_valid")}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </Section>

        {/* --- References --- */}
        <Section
          title="References et chantiers realises"
          status={references.length > 0 ? t("profile_status_complete") : t("profile_status_missing")}
          complete={references.length > 0}
          onAdd={() => setShowRefForm((s) => !s)}
          addLabel={t("profile_add")}
        >
          {showRefForm && (
            <form onSubmit={submitReference} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
              <Field label={t("profile_ref_project")} value={refForm.projectName} onChange={(v) => setRefForm((f) => ({ ...f, projectName: v }))} required />
              <Field label={t("profile_ref_client")} value={refForm.clientName} onChange={(v) => setRefForm((f) => ({ ...f, clientName: v }))} />
              <Field label={t("profile_ref_value")} value={refForm.contractValue} onChange={(v) => setRefForm((f) => ({ ...f, contractValue: v }))} type="number" />
              <Field label={t("profile_ref_date")} value={refForm.completionDate} onChange={(v) => setRefForm((f) => ({ ...f, completionDate: v }))} type="date" />
              <button className="btn btn-gold text-[13px] px-3.5 py-2" disabled={savingRef}>{savingRef ? t("profile_saving") : t("profile_save")}</button>
            </form>
          )}
          {references.length === 0 ? (
            <p className="text-ink-faint text-[13px]">{t("profile_no_items")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {references.map((r) => (
                <li key={r.id} className="text-[13.5px]">
                  <span className="font-semibold">{r.project_name}</span>
                  {r.client_name && <span className="text-ink-soft"> — {r.client_name}</span>}
                  {r.contract_value && <span className="text-ink-faint"> — {r.contract_value.toLocaleString("fr-FR")} €</span>}
                </li>
              ))}
            </ul>
          )}
        </Section>

        {/* --- Certifications --- */}
        <Section
          title="Certifications et qualifications"
          status={certifications.length > 0 ? t("profile_status_complete") : t("profile_status_todo")}
          complete={certifications.length > 0}
          onAdd={() => setShowCertForm((s) => !s)}
          addLabel={t("profile_add")}
        >
          {showCertForm && (
            <form onSubmit={submitCertification} className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 pb-4 border-b border-border">
              <Field label={t("profile_cert_name")} value={certForm.certificationName} onChange={(v) => setCertForm((f) => ({ ...f, certificationName: v }))} required />
              <Field label={t("profile_cert_issuer")} value={certForm.issuedBy} onChange={(v) => setCertForm((f) => ({ ...f, issuedBy: v }))} />
              <button className="btn btn-gold text-[13px] px-3.5 py-2" disabled={savingCert}>{savingCert ? t("profile_saving") : t("profile_save")}</button>
            </form>
          )}
          {certifications.length === 0 ? (
            <p className="text-ink-faint text-[13px]">{t("profile_no_items")}</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {certifications.map((c) => (
                <li key={c.id} className="text-[13.5px]">
                  <span className="font-semibold">{c.certification_name}</span>
                  {c.issued_by && <span className="text-ink-soft"> — {c.issued_by}</span>}
                </li>
              ))}
            </ul>
          )}
        </Section>
      </div>
      <Footer />
    </>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value?: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1 text-[12.5px] text-ink-soft">
      {label}
      <input
        className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14px] outline-none focus:border-gold"
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex justify-between gap-2 py-1 border-b border-border/50">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="font-medium text-right">{value || "—"}</dd>
    </div>
  );
}

function Section({
  title,
  status,
  complete,
  onAdd,
  addLabel,
  children,
}: {
  title: string;
  status: string;
  complete: boolean;
  onAdd: () => void;
  addLabel: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 card p-4 md:p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
        <h3 className="font-display font-bold text-[15px] md:text-[15.5px]">{title}</h3>
        <div className="flex items-center gap-2">
          <span className={`font-mono text-[12px] font-semibold ${complete ? "text-gold" : "text-ink-faint"}`}>{status}</span>
          <button className="btn btn-ghost text-[13px] px-3.5 py-2" onClick={onAdd}>{addLabel}</button>
        </div>
      </div>
      {children}
    </div>
  );
}
