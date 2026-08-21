// Thin client for the MarchesDirect backend API.
// Base URL comes from NEXT_PUBLIC_API_URL (see .env.example) so it can point at
// localhost in dev and the real deployed API in production without a code change.

import type { JourneyKey, Listing } from "./data";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Frontend journey keys (URL slugs) <-> backend opportunity_types.code values.
const journeyToApiCode: Record<JourneyKey, string> = {
  "appels-doffres": "tender",
  "marches-publics": "public_procurement",
  "sous-traitance": "subcontracting",
};

const apiCodeToJourney: Record<string, JourneyKey> = Object.fromEntries(
  Object.entries(journeyToApiCode).map(([k, v]) => [v, k as JourneyKey])
) as Record<string, JourneyKey>;

export type ApiOpportunity = {
  id: string;
  title: string;
  description: string | null;
  deadline: string | null;
  publication_date: string;
  estimated_start_date?: string | null;
  estimated_end_date?: string | null;
  estimated_value: number | string | null;
  currency?: string;
  location_city: string | null;
  location_region: string | null;
  ai_classification_status: string;
  ai_summary: string | null;
  ai_extracted_facts?: Record<string, { value: string; available: boolean }> | null;
  status: string;
  journey: string;
  trade_name: string | null;
  cpv_display?: string;
};

export type OpportunitySearchParams = {
  journey?: JourneyKey;
  q?: string;
  trade_id?: string;
  region?: string;
  city?: string;
  department?: string;
  min_value?: string;
  max_value?: string;
  page?: number;
  limit?: number;
};

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiFetch<T>(path: string, params?: Record<string, string | number | undefined>): Promise<T> {
  const url = new URL(path, API_BASE);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") url.searchParams.set(key, String(value));
    }
  }

  let res: Response;
  try {
    // Server Components run this on every request - short revalidate window keeps
    // listing pages reasonably fresh without hitting the DB on every single render.
    res = await fetch(url.toString(), { next: { revalidate: 60 } });
  } catch (err) {
    throw new ApiError(`Could not reach the API at ${API_BASE}. Is the backend running?`);
  }

  if (!res.ok) {
    throw new ApiError(`API request failed (${res.status})`, res.status);
  }

  return res.json() as Promise<T>;
}

function formatBudget(value: number | string | null, currency = "EUR"): string {
  if (value === null || value === undefined || value === "") return "Montant non communique";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(num)) return "Montant non communique";
  return `${num.toLocaleString("fr-FR")} ${currency === "EUR" ? "EUR" : currency}`;
}

function formatDeadline(deadline: string | null): string {
  if (!deadline) return "Non precise";
  const d = new Date(deadline);
  if (Number.isNaN(d.getTime())) return "Non precise";
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });
}

// Adapt a raw API opportunity row to the frontend's existing `Listing` shape so
// components (ListingCard, ListingDetailContent, etc.) don't need to change.
export function toListing(o: ApiOpportunity): Listing {
  return {
    id: o.id,
    journey: apiCodeToJourney[o.journey] ?? "marches-publics",
    title: o.title,
    buyer: o.location_city || "Acheteur non precise",
    location: [o.location_city, o.location_region].filter(Boolean).join(" - ") || "France",
    distanceKm: 0, // real distance requires the matching engine (Milestone 6) - not yet live
    budget: formatBudget(o.estimated_value, o.currency),
    deadline: formatDeadline(o.deadline),
    deadlineIso: o.deadline ?? undefined,
    cpv: o.cpv_display,
    trade: o.trade_name || "Non classe",
    matchScore: 0, // real score requires the matching engine (Milestone 6) - not yet live
    status: o.ai_classification_status === "classified" ? "Analyse" : "Non analyse",
    description: o.description ?? undefined,
    publicationDate: o.publication_date,
    estimatedStartDate: o.estimated_start_date ?? undefined,
    estimatedEndDate: o.estimated_end_date ?? undefined,
    locationCity: o.location_city ?? undefined,
    locationRegion: o.location_region ?? undefined,
    extractedFacts: o.ai_extracted_facts ?? undefined,
  };
}

export async function fetchOpportunities(params: OpportunitySearchParams): Promise<Listing[]> {
  const journeyCode = params.journey ? journeyToApiCode[params.journey] : undefined;
  const data = await apiFetch<{ results: ApiOpportunity[] }>("/api/opportunities", {
    journey: journeyCode,
    q: params.q,
    trade_id: params.trade_id,
    region: params.region,
    city: params.city,
    department: params.department,
    min_value: params.min_value,
    max_value: params.max_value,
    page: params.page,
    limit: params.limit,
  });
  return data.results.map(toListing);
}

export type ApiTrade = { id: string; name: string; slug: string; description: string | null; cpv_code?: string };

export async function fetchTrades(): Promise<ApiTrade[]> {
  return apiFetch<ApiTrade[]>("/api/trades");
}

export async function fetchOpportunityById(id: string): Promise<Listing | null> {
  try {
    const o = await apiFetch<ApiOpportunity>(`/api/opportunities/${id}`);
    return toListing(o);
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) return null;
    throw err;
  }
}
