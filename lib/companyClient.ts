"use client";

import { getSession, AuthError } from "@/lib/authClient";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function authedFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const session = getSession();
  if (!session) throw new AuthError("Not logged in");

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new AuthError(`Impossible de contacter le serveur (${API_BASE}).`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new AuthError(data.error || "Une erreur est survenue.");
  }
  return data as T;
}

export type Company = {
  id: string;
  name: string;
  kbis_number?: string | null;
  legal_form?: string | null;
  siret?: string | null;
  phone?: string | null;
  website_url?: string | null;
  address_street?: string | null;
  address_city?: string | null;
  address_postal_code?: string | null;
  industry_sector?: string | null;
  employee_count?: number | null;
  annual_revenue?: number | null;
  founding_year?: number | null;
  working_radius_km?: number | null;
};

export type CompanyDocument = {
  id: string;
  document_type: string;
  document_name?: string | null;
  file_url: string;
  issued_date?: string | null;
  expiry_date?: string | null;
  is_expired: boolean;
};

export type CompanyCertification = {
  id: string;
  certification_name: string;
  certification_code?: string | null;
  issued_by?: string | null;
  issued_date?: string | null;
  expiry_date?: string | null;
};

export type CompanyReference = {
  id: string;
  project_name: string;
  description?: string | null;
  client_name?: string | null;
  contract_value?: number | null;
  contract_type?: string | null;
  completion_date?: string | null;
};

export type CompanyResource = {
  id: string;
  resource_type: string;
  name: string;
  category?: string | null;
  quantity?: number | null;
  description?: string | null;
};

export type CompanyPolicy = {
  id: string;
  policy_type: string;
  policy_text: string;
  effective_date?: string | null;
};

export const getCompanyProfile = () => authedFetch<Company>("/api/companies/me");
export const updateCompanyProfile = (fields: Partial<Company>) =>
  authedFetch<Company>("/api/companies/me", { method: "PUT", body: JSON.stringify(fields) });

export type UploadResult = { url: string; sizeBytes: number; mimeType: string; originalName: string };

/** Uploads a real file (multipart/form-data) and returns the URL to store on a document/certification record. */
export async function uploadFile(file: File): Promise<UploadResult> {
  const session = getSession();
  if (!session) throw new AuthError("Not logged in");

  const formData = new FormData();
  formData.append("file", file);

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/uploads`, {
      method: "POST",
      headers: { Authorization: `Bearer ${session.accessToken}` }, // no Content-Type: browser sets the multipart boundary
      body: formData,
    });
  } catch {
    throw new AuthError(`Impossible de contacter le serveur (${API_BASE}).`);
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new AuthError(data.error || "Échec de l'envoi du fichier.");
  return data as UploadResult;
}

export const getDocuments = () => authedFetch<CompanyDocument[]>("/api/companies/me/documents");
export const addDocument = (doc: {
  documentType: string;
  documentName?: string;
  fileUrl: string;
  issuedDate?: string;
  expiryDate?: string;
}) => authedFetch<CompanyDocument>("/api/companies/me/documents", { method: "POST", body: JSON.stringify(doc) });
export const deleteDocument = (id: string) =>
  authedFetch<{ success: boolean }>(`/api/companies/me/documents/${id}`, { method: "DELETE" });

export const getCertifications = () => authedFetch<CompanyCertification[]>("/api/companies/me/certifications");
export const addCertification = (cert: {
  certificationName: string;
  certificationCode?: string;
  issuedBy?: string;
  issuedDate?: string;
  expiryDate?: string;
}) => authedFetch<CompanyCertification>("/api/companies/me/certifications", { method: "POST", body: JSON.stringify(cert) });

export const getReferences = () => authedFetch<CompanyReference[]>("/api/companies/me/references");
export const addReference = (ref: {
  projectName: string;
  description?: string;
  clientName?: string;
  contractValue?: number;
  contractType?: string;
  completionDate?: string;
}) => authedFetch<CompanyReference>("/api/companies/me/references", { method: "POST", body: JSON.stringify(ref) });

export const getResources = () => authedFetch<CompanyResource[]>("/api/companies/me/resources");
export const addResource = (res: {
  resourceType: string;
  name: string;
  category?: string;
  quantity?: number;
  description?: string;
}) => authedFetch<CompanyResource>("/api/companies/me/resources", { method: "POST", body: JSON.stringify(res) });

export const getPolicies = () => authedFetch<CompanyPolicy[]>("/api/companies/me/policies");
export const addPolicy = (policy: { policyType: string; policyText: string; effectiveDate?: string }) =>
  authedFetch<CompanyPolicy>("/api/companies/me/policies", { method: "POST", body: JSON.stringify(policy) });
