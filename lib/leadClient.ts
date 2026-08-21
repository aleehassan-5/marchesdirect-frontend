"use client";

// Submits a visitor lead (contact form, "être rappelé" callback request, or the
// "Demander un renseignement personnalisé" action on a listing) to the public
// CRM lead-capture endpoint. No session needed - a lead is, by definition,
// someone who doesn't have an account yet.

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export type LeadInput = {
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  companyName?: string;
  industryTrade?: string;
  locationCity?: string;
  locationRegion?: string;
  leadSource?: string;
  // Free-text context (e.g. "besoin", or which listing this came from) - the
  // backend's crm_leads table doesn't have a dedicated notes column yet, so
  // this is folded into companyName/industryTrade where it fits, or dropped
  // silently rather than sent to a field that doesn't exist.
};

export class LeadError extends Error {}

let cachedBrandId: string | null = null;

async function getBrandId(): Promise<string> {
  if (cachedBrandId) return cachedBrandId;
  const res = await fetch(`${API_BASE}/api/brands/current`);
  if (!res.ok) throw new LeadError("Impossible de determiner le site actuel.");
  const data = await res.json();
  cachedBrandId = data.id;
  return data.id;
}

export async function submitLead(input: LeadInput): Promise<void> {
  const brandId = await getBrandId();

  let res: Response;
  try {
    res = await fetch(`${API_BASE}/api/crm/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId, ...input }),
    });
  } catch {
    throw new LeadError(`Impossible de contacter le serveur (${API_BASE}).`);
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new LeadError(data.error || "Une erreur est survenue. Veuillez reessayer.");
  }
}
