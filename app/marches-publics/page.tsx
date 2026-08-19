"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { FilterTab, FilterDropdown } from "@/components/FilterPill";
import ListingCard, { Listing } from "@/components/ListingCard";
import BottomNav from "@/components/BottomNav";
import { SectionEyebrow } from "@/components/Misc";

const listings: Listing[] = [
  {
    id: "mp-2026-184",
    kind: "PUBLIC",
    title: "Extension et restructuration d'un groupe scolaire",
    buyer: "Ville de Montpellier",
    location: "Montpellier (34)",
    deadlineDay: "27",
    deadlineMonth: "AOÛT",
    deadlineTime: "12h00",
    tags: ["Travaux", "Gros œuvre"],
    procedure: "MAPA",
    ref: "MP-2026-184",
    href: "/marche",
  },
  {
    id: "mp-2026-317",
    kind: "PUBLIC",
    title: "Réhabilitation énergétique de bâtiments communaux",
    buyer: "Communauté de communes du Jura",
    location: "Lons-le-Saunier (39)",
    deadlineDay: "03",
    deadlineMonth: "SEPT.",
    deadlineTime: "12h00",
    tags: ["Isolation", "CVC"],
    procedure: "Appel ouvert",
    ref: "MP-2026-317",
    href: "/marche",
  },
  {
    id: "mp-2026-502",
    kind: "PUBLIC",
    title: "Entretien des installations électriques",
    buyer: "Métropole Européenne de Lille",
    location: "Lille (59)",
    deadlineDay: "11",
    deadlineMonth: "SEPT.",
    deadlineTime: "12h00",
    tags: ["Maintenance"],
    procedure: "Accord-cadre",
    ref: "MP-2026-502",
    href: "/marche",
  },
];

const categories = ["Tous", "Travaux", "Services", "Fournitures"];

const departements = Array.from(
  new Set(listings.map((l) => l.location.match(/\(([^)]+)\)/)?.[1] ?? ""))
).filter(Boolean);
const procedures = Array.from(new Set(listings.map((l) => l.procedure)));
const dateLimiteOptions = ["Cette semaine", "Ce mois-ci", "Plus tard"];

export default function MarchesPublicsPage() {
  return (
    <Suspense fallback={null}>
      <MarchesPublicsContent />
    </Suspense>
  );
}

function MarchesPublicsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState("Tous");
  const [departement, setDepartement] = useState("");
  const [dateLimite, setDateLimite] = useState("");
  const [procedure, setProcedure] = useState("");
  const [sortDesc, setSortDesc] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const filtered = useMemo(() => {
    let result = listings.filter((l) => {
      const haystack = `${l.title} ${l.buyer} ${l.location} ${l.ref}`.toLowerCase();
      const matchesQuery = query.trim() === "" || haystack.includes(query.trim().toLowerCase());
      const matchesCategory =
        category === "Tous" || l.tags.some((t) => t.toLowerCase() === category.toLowerCase());
      const matchesDept = !departement || l.location.includes(`(${departement})`);
      const matchesProcedure = !procedure || l.procedure === procedure;
      return matchesQuery && matchesCategory && matchesDept && matchesProcedure;
    });

    result = [...result].sort((a, b) => {
      const da = Number(a.deadlineDay);
      const db = Number(b.deadlineDay);
      return sortDesc ? db - da : da - db;
    });

    return result;
  }, [query, category, departement, procedure, sortDesc]);

  function resetFilters() {
    setQuery("");
    setCategory("Tous");
    setDepartement("");
    setDateLimite("");
    setProcedure("");
    router.replace("/marches-publics");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="MARCHÉS/DIRECT"
        backHref="/"
        actions={
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            aria-pressed={showAdvanced}
            className={[
              "flex items-center gap-2 border px-3 py-2 text-[13px] font-medium transition-colors active:scale-95",
              showAdvanced ? "border-brand bg-brand text-canvas" : "border-ink text-ink",
            ].join(" ")}
          >
            Filtres
            <SlidersHorizontal size={16} />
          </button>
        }
      />

      <main className="flex-1 px-5 pb-10 pt-6">
        <SectionEyebrow>SECTEUR PUBLIC · 02</SectionEyebrow>
        <h1 className="mt-2 font-display text-[38px] font-600 uppercase leading-[0.95] tracking-tight text-ink">
          Marchés publics
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-ink/80">
          Les consultations publiées par les collectivités et organismes
          publics.
        </p>

        <div className="mt-5">
          <SearchBar
            placeholder="Objet, acheteur ou référence"
            value={query}
            onChange={setQuery}
            onSubmit={setQuery}
          />
        </div>

        {showAdvanced ? (
          <div className="mt-3 flex items-center justify-between gap-2 border border-border bg-card p-3">
            <span className="text-[13px] text-muted">
              {[query, category !== "Tous" ? category : "", departement, dateLimite, procedure]
                .filter(Boolean).length}{" "}
              filtre(s) actif(s)
            </span>
            <button
              type="button"
              onClick={resetFilters}
              className="border border-ink px-4 py-2 text-[13px] font-medium text-ink transition-colors active:scale-95 hover:bg-ink hover:text-canvas"
            >
              Réinitialiser tout
            </button>
          </div>
        ) : null}

        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <FilterTab key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
          ))}
        </div>

        <div className="mt-2 grid grid-cols-3 gap-2">
          <FilterDropdown
            label="Département"
            options={departements}
            value={departement}
            onSelect={setDepartement}
          />
          <FilterDropdown
            label="Date limite"
            options={dateLimiteOptions}
            value={dateLimite}
            onSelect={setDateLimite}
          />
          <FilterDropdown
            label="Procédure"
            options={procedures}
            value={procedure}
            onSelect={setProcedure}
          />
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span>
            <span className="font-display text-[22px] font-500 text-lime-dark">
              {filtered.length}
            </span>{" "}
            <span className="text-[14px] text-ink">
              {filtered.length > 1 ? "consultations affichées" : "consultation affichée"}
            </span>
          </span>
          <button
            type="button"
            onClick={() => setSortDesc((v) => !v)}
            className="flex items-center gap-1.5 text-[13px] text-muted transition-opacity active:opacity-60"
          >
            Trier par{" "}
            <span className="font-medium text-ink">
              Date limite {sortDesc ? "↓" : "↑"}
            </span>
            <ArrowUpDown size={13} />
          </button>
        </div>

        <div className="mt-4 space-y-4">
          {filtered.length > 0 ? (
            filtered.map((listing) => <ListingCard key={listing.id} listing={listing} />)
          ) : (
            <div className="border border-dashed border-border py-10 text-center">
              <p className="text-[14px] text-ink">Aucun résultat pour ces filtres.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-2 text-[13px] font-medium text-ink underline underline-offset-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>

      <BottomNav active="search" variant="alerts" />
    </div>
  );
}
