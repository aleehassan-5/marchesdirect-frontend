"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, ShieldCheck, Calendar, Clock, ArrowRight, LocateFixed } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { FilterTab, FilterDropdown } from "@/components/FilterPill";
import BottomNav from "@/components/BottomNav";
import { SectionEyebrow } from "@/components/Misc";
import { useToast } from "@/components/Toast";

const needs = [
  {
    id: "st-1",
    initials: "BD",
    title: "Recherche équipe pour lot carrelage — 62 logements",
    location: "Bordeaux (33)",
    trade: "Carrelage",
    start: "09 SEPT.",
    duration: "6 semaines",
    deadline: "05 SEPT.",
  },
  {
    id: "st-2",
    initials: "GC",
    title: "Sous-traitant plomberie pour programme neuf",
    location: "Marseille (13)",
    trade: "Plomberie",
    start: "Immédiat",
    duration: "4 mois",
    deadline: "31 AOÛT",
  },
  {
    id: "st-3",
    initials: "NB",
    title: "Renfort équipe peinture intérieure",
    location: "Rouen (76)",
    trade: "Peinture",
    start: "16 SEPT.",
    duration: "3 semaines",
    deadline: "06 SEPT.",
  },
];

const categories = ["Tous", "Urgent", "Cette semaine"];
const sortOptions = ["Démarrage", "Réponse avant"];

export default function SousTraitancePage() {
  const { showToast } = useToast();
  const [mode, setMode] = useState<"chantier" | "partenaire">("chantier");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Tous");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [sortBy, setSortBy] = useState("");

  const filtered = useMemo(() => {
    let result = needs.filter((n) => {
      const haystack = `${n.title} ${n.trade} ${n.location}`.toLowerCase();
      const matchesQuery = query.trim() === "" || haystack.includes(query.trim().toLowerCase());
      const matchesCategory =
        category === "Tous" ||
        (category === "Urgent" && n.start === "Immédiat") ||
        (category === "Cette semaine" && n.deadline.includes("AOÛT"));
      return matchesQuery && matchesCategory;
    });

    if (sortBy === "Réponse avant") {
      result = [...result].sort((a, b) => a.deadline.localeCompare(b.deadline));
    } else if (sortBy === "Démarrage") {
      result = [...result].sort((a, b) => {
        if (a.start === "Immédiat") return -1;
        if (b.start === "Immédiat") return 1;
        return a.start.localeCompare(b.start);
      });
    }

    return result;
  }, [query, category, sortBy]);

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

      <main className="flex-1 pb-10">
        <div className="relative overflow-hidden bg-canvas px-5 pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-2 h-40 w-40 opacity-[0.4]"
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <polyline
                points="10,190 60,150 60,110 120,60 120,20 190,20"
                fill="none"
                stroke="#0B281E"
                strokeWidth="1.5"
              />
              <circle cx="60" cy="110" r="3" fill="#0B281E" />
              <circle cx="120" cy="60" r="3" fill="#0B281E" />
              <circle cx="120" cy="20" r="16" fill="none" stroke="#C4E725" strokeWidth="1.5" />
              <circle cx="120" cy="20" r="3" fill="#C4E725" />
            </svg>
          </div>
          <SectionEyebrow>RÉSEAU ENTREPRISES · 03</SectionEyebrow>
          <h1 className="mt-2 font-display text-[38px] font-600 uppercase leading-[0.95] tracking-tight text-ink">
            Sous-traitance
          </h1>
          <p className="mt-3 max-w-[90%] text-[15px] leading-relaxed text-ink/80">
            Trouvez des lots à réaliser et les bons partenaires pour vos
            chantiers.
          </p>
        </div>

        <div className="px-5 pt-6">
          <div className="flex border border-ink">
            <button
              type="button"
              onClick={() => setMode("chantier")}
              aria-pressed={mode === "chantier"}
              className={[
                "flex-1 py-3 text-[14px] font-semibold transition-colors active:scale-[0.98]",
                mode === "chantier" ? "bg-brand text-canvas" : "bg-transparent text-ink",
              ].join(" ")}
            >
              Je cherche un chantier
            </button>
            <button
              type="button"
              onClick={() => setMode("partenaire")}
              aria-pressed={mode === "partenaire"}
              className={[
                "flex-1 py-3 text-[14px] font-medium transition-colors active:scale-[0.98]",
                mode === "partenaire" ? "bg-brand text-canvas" : "bg-transparent text-ink",
              ].join(" ")}
            >
              Je cherche un partenaire
            </button>
          </div>

          <div className="mt-4">
            <SearchBar
              placeholder="Métier, lot ou localisation"
              value={query}
              onChange={setQuery}
              onSubmit={setQuery}
            />
          </div>

          {showAdvanced ? (
            <div className="mt-3 flex gap-2 border border-border bg-card p-3">
              <FilterDropdown label="Trier par" options={sortOptions} value={sortBy} onSelect={setSortBy} />
              <button
                type="button"
                onClick={() => {
                  showToast("Active la localisation pour cette fonctionnalité");
                }}
                className="flex flex-1 items-center justify-center gap-2 border border-border bg-card px-4 py-2.5 text-[14px] text-ink transition-colors active:scale-95 hover:border-ink"
              >
                <LocateFixed size={15} />
                Autour de moi
              </button>
            </div>
          ) : null}

          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <FilterTab key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
            ))}
          </div>

          <div className="mt-6">
            <span className="font-display text-[22px] font-500 text-lime-dark">
              {filtered.length}
            </span>{" "}
            <span className="text-[14px] text-ink">
              {mode === "chantier" ? "besoins publiés" : "partenaires disponibles"}
            </span>
          </div>

          {filtered.length === 0 ? (
            <div className="mt-4 border border-dashed border-border py-10 text-center">
              <p className="text-[14px] text-ink">Aucun résultat pour ces filtres.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setCategory("Tous");
                }}
                className="mt-2 text-[13px] font-medium text-ink underline underline-offset-4"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div className="mt-4 space-y-4">
              {filtered.map((need) => (
                <article key={need.id} className="border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-mono text-[13px] font-medium text-lime">
                        {need.initials}
                      </div>
                      <div className="min-w-0">
                        <span className="font-mono text-[11px] tracking-label text-muted">
                          {mode === "chantier" ? "SOUS-TRAITANCE" : "PARTENAIRE"}
                        </span>
                        <h3 className="mt-0.5 font-display text-[18px] font-500 leading-tight text-ink">
                          {need.title}
                        </h3>
                        <p className="mt-1 text-[13px] text-muted">{need.location}</p>
                        <span className="mt-1 inline-block font-mono text-[11px] text-brand">
                          {need.trade}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Voir le détail"
                      onClick={() => showToast("Détail du besoin — bientôt disponible")}
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink text-ink transition-transform active:scale-90"
                    >
                      <ArrowRight size={16} />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium text-brand">
                    <ShieldCheck size={14} />
                    VÉRIFIÉ
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 font-mono text-[12px]">
                    <div>
                      <span className="flex items-center gap-1 text-muted">
                        <Calendar size={12} /> Démarrage
                      </span>
                      <span className="mt-0.5 block text-ink">{need.start}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 text-muted">
                        <Clock size={12} /> Durée
                      </span>
                      <span className="mt-0.5 block text-ink">{need.duration}</span>
                    </div>
                    <div>
                      <span className="flex items-center gap-1 text-muted">
                        <Clock size={12} /> Réponse avant
                      </span>
                      <span className="mt-0.5 block text-ink">{need.deadline}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => showToast("Formulaire de publication — bientôt disponible")}
            className="mt-6 flex w-full items-center justify-center gap-2 border border-brand bg-transparent py-3.5 text-[15px] font-semibold text-brand transition-transform active:scale-[0.98]"
          >
            Publier un besoin
            <ArrowRight size={16} />
          </button>
        </div>
      </main>

      <BottomNav active="third" variant="messages" />
    </div>
  );
}
