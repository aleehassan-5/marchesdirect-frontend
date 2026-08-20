export type JourneyKey = "appels-doffres" | "marches-publics" | "sous-traitance";

export const journeys: Record<
  JourneyKey,
  { label: string; tag: string; description: string; color: string }
> = {
  "appels-doffres": {
    label: "Appels d'offres",
    tag: "Marches prives",
    description:
      "Promoteurs, bailleurs et grandes entreprises. Contact direct et reactivite avant tout.",
    color: "var(--card-1)",
  },
  "marches-publics": {
    label: "Marches publics",
    tag: "BOAMP - PLACE - JOUE",
    description:
      "Mairies, Etat, collectivites. Conformite, pieces du DCE et memoire technique generes pour vous.",
    color: "var(--card-2)",
  },
  "sous-traitance": {
    label: "Sous-traitance",
    tag: "Entre entreprises",
    description:
      "Lots a reprendre entre entreprises du batiment. Rapidite et disponibilite en priorite.",
    color: "var(--card-3)",
  },
};

export type Listing = {
  id: string;
  journey: JourneyKey;
  title: string;
  buyer: string;
  location: string;
  distanceKm: number;
  budget: string;
  deadline: string;
  cpv?: string;
  trade: string;
  matchScore: number;
  status: "Non analyse" | "Analyse";
};

export const listings: Listing[] = [
  {
    id: "ao-2201",
    journey: "appels-doffres",
    title: "Renovation facade - residence 84 logements",
    buyer: "Groupe Immobilier Ouest",
    location: "Nantes (44)",
    distanceKm: 12,
    budget: "180 000 - 240 000 EUR",
    deadline: "5 sept. 2026",
    trade: "Ravalement / Facade",
    matchScore: 92,
    status: "Analyse",
  },
  {
    id: "ao-2202",
    journey: "appels-doffres",
    title: "Reprise etancheite toiture-terrasse",
    buyer: "SCI Le Marais",
    location: "Rezé (44)",
    distanceKm: 18,
    budget: "45 000 - 60 000 EUR",
    deadline: "29 aout 2026",
    trade: "Etancheite",
    matchScore: 81,
    status: "Analyse",
  },
  {
    id: "mp-1187",
    journey: "marches-publics",
    title: "Requalification voirie et reseaux - centre-bourg",
    buyer: "Mairie de Saint-Herblain",
    location: "Saint-Herblain (44)",
    distanceKm: 9,
    budget: "620 000 EUR HT",
    deadline: "18 sept. 2026",
    cpv: "45233120",
    trade: "VRD",
    matchScore: 88,
    status: "Analyse",
  },
  {
    id: "mp-1188",
    journey: "marches-publics",
    title: "Renovation energetique groupe scolaire",
    buyer: "Departement de Loire-Atlantique",
    location: "Orvault (44)",
    distanceKm: 15,
    budget: "1 100 000 EUR HT",
    deadline: "2 oct. 2026",
    cpv: "45214200",
    trade: "Menuiserie / Isolation",
    matchScore: 76,
    status: "Non analyse",
  },
  {
    id: "st-3054",
    journey: "sous-traitance",
    title: "Lot electricite a reprendre - immeuble R+4",
    buyer: "Bativa Construction",
    location: "Nantes (44)",
    distanceKm: 6,
    budget: "38 000 EUR",
    deadline: "22 aout 2026",
    trade: "Electricite",
    matchScore: 95,
    status: "Analyse",
  },
  {
    id: "st-3055",
    journey: "sous-traitance",
    title: "Lot plomberie / CVC - lotissement 12 maisons",
    buyer: "SARL Legendre BTP",
    location: "Vertou (44)",
    distanceKm: 21,
    budget: "52 000 EUR",
    deadline: "30 aout 2026",
    trade: "Plomberie / CVC",
    matchScore: 84,
    status: "Analyse",
  },
];

export function listingsFor(journey: JourneyKey) {
  return listings.filter((l) => l.journey === journey);
}

export function listingById(id: string) {
  return listings.find((l) => l.id === id);
}
