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

