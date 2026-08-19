"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { FileStack, Landmark, Network } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import SearchBar from "@/components/SearchBar";
import { FilterDropdown } from "@/components/FilterPill";
import ListingCard from "@/components/ListingCard";
import { Listing } from "@/components/ListingCard";
import MobileMenu from "@/components/MobileMenu";
import { useToast } from "@/components/Toast";

const featured: Listing = {
  id: "mp-2026-184",
  kind: "PUBLIC · NOUVEAU",
  title: "Construction d'un groupe scolaire et d'un gymnase",
  buyer: "Collectivité",
  location: "Montpellier (34)",
  deadlineDay: "27",
  deadlineMonth: "MAI",
  deadlineTime: "12h00",
  tags: ["GROS ŒUVRE"],
  procedure: "Dans 18 jours",
  ref: "MP-2026-184",
  href: "/marche",
};

const entries: {
  n: string;
  title: string;
  kicker: string;
  href: string;
  icon: typeof FileStack;
}[] = [
  {
    n: "01",
    title: "Appels\nd'offres",
    kicker: "PRIVÉ",
    href: "",
    icon: FileStack,
  },
  {
    n: "02",
    title: "Marchés\npublics",
    kicker: "PUBLIC",
    href: "/marches-publics",
    icon: Landmark,
  },
  {
    n: "03",
    title: "Sous-\ntraitance",
    kicker: "RÉSEAU",
    href: "/sous-traitance",
    icon: Network,
  },
];

const metierOptions = ["Gros œuvre", "Électricité", "Plomberie", "Peinture", "Charpente"];
const proximiteOptions = ["Ma ville", "Mon département", "Ma région", "Toute la France"];
const periodeOptions = ["Aujourd'hui", "Cette semaine", "Ce mois-ci"];

export default function HomePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [metier, setMetier] = useState("");
  const [ville, setVille] = useState("");
  const [btp, setBtp] = useState("");
  const [proximite, setProximite] = useState("");
  const [periode, setPeriode] = useState("");

  function runSearch(overrides?: { metier?: string; ville?: string }) {
    const q = overrides?.metier ?? metier;
    const loc = overrides?.ville ?? ville;
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (loc) params.set("loc", loc);
    router.push(`/marches-publics${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <main className="relative">
      {/* Nav */}
      <header className="flex items-center justify-between border-b border-border px-5 py-4">
        <Wordmark />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => showToast("Connexion — bientôt disponible")}
            className="text-[14px] font-medium text-ink"
          >
            Connexion
          </button>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-transform active:scale-95"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Hero */}
      <section className="relative overflow-hidden px-5 pb-10 pt-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 h-64 w-64 opacity-[0.35]"
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
            <circle cx="120" cy="20" r="18" fill="none" stroke="#C4E725" strokeWidth="1.5" />
            <circle cx="120" cy="20" r="8" fill="none" stroke="#C4E725" strokeWidth="1.5" />
            <circle cx="120" cy="20" r="3" fill="#C4E725" />
          </svg>
        </div>

        <span className="font-mono text-[12px] font-medium tracking-label text-brand">
          VEILLE BTP · FRANCE
        </span>
        <h1 className="mt-3 font-display text-[46px] font-600 uppercase leading-[0.95] tracking-tight text-ink">
          Les marchés
          <br />
          viennent à vous.
        </h1>
        <p className="mt-4 max-w-[85%] text-[15px] leading-relaxed text-ink/80">
          Public, privé et sous-traitance — sélectionnés selon votre métier
          et votre zone.
        </p>
        <div className="mt-6 flex items-center gap-6">
          <Link
            href="/marches-publics"
            className="flex items-center gap-2 border border-ink bg-lime px-5 py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98] hover:bg-lime-dark"
          >
            Créer mon alerte
            <ArrowRight size={16} />
          </Link>
        </div>
        <Link
          href="#opportunites"
          className="mt-4 inline-block text-[14px] text-ink underline underline-offset-4"
        >
          Découvrir la plateforme
        </Link>
      </section>

      {/* Search block */}
      <section id="opportunites" className="bg-brand px-5 py-8 text-canvas">
        <h2 className="font-display text-[26px] font-500 uppercase text-canvas">
          Trouvez une opportunité
        </h2>
        <div className="mt-5 space-y-3">
          <div>
            <span className="font-mono text-[11px] tracking-label text-canvas/60">
              MÉTIER OU MOT-CLÉ
            </span>
            <div className="mt-1.5">
              <SearchBar
                placeholder="Ex. : Gros œuvre, électricité…"
                dark
                value={metier}
                onChange={setMetier}
                onSubmit={(v) => runSearch({ metier: v })}
              />
            </div>
          </div>
          <div>
            <span className="font-mono text-[11px] tracking-label text-canvas/60">
              VILLE OU DÉPARTEMENT
            </span>
            <div className="mt-1.5">
              <SearchBar
                placeholder="Ex. : Lyon, 69, Occitanie"
                dark
                value={ville}
                onChange={setVille}
                onSubmit={(v) => runSearch({ ville: v })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-canvas/15 pt-5">
          <span>
            <span className="font-display text-[22px] font-500 text-lime">12 486</span>{" "}
            <span className="text-[14px] text-canvas/80">opportunités actives</span>
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <FilterDropdown label="BTP" options={metierOptions} value={btp} onSelect={setBtp} />
          <FilterDropdown
            label="À proximité"
            options={proximiteOptions}
            value={proximite}
            onSelect={setProximite}
          />
          <FilterDropdown
            label="Cette semaine"
            options={periodeOptions}
            value={periode}
            onSelect={setPeriode}
          />
        </div>
        <button
          type="button"
          onClick={() => runSearch()}
          className="mt-3 flex w-full items-center justify-center gap-2 border border-lime bg-lime py-3 text-[14px] font-semibold text-ink transition-transform active:scale-[0.98] hover:bg-lime-dark"
        >
          Voir les opportunités
          <ArrowRight size={15} />
        </button>
      </section>

      {/* Three-way entry point */}
      <section className="grid grid-cols-3 border-b border-border">
        {entries.map((entry, i) => {
          const Icon = entry.icon;
          const inner = (
            <>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[13px] text-canvas/60">{entry.n} /</span>
                <Icon size={18} className="text-lime" />
              </div>
              <div>
                <h3 className="whitespace-pre-line font-display text-[22px] font-500 uppercase leading-[0.95] text-canvas">
                  {entry.title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-label text-lime">
                    {entry.kicker}
                  </span>
                  <ArrowRight
                    size={16}
                    className="text-canvas transition-transform group-hover:translate-x-1"
                  />
                </div>
              </div>
            </>
          );
          const classes = [
            "group flex flex-col justify-between gap-6 border-r border-brand/20 px-4 py-8 last:border-r-0 text-left transition-transform active:scale-[0.98]",
            i === 2 ? "bg-ink text-canvas" : "bg-brand text-canvas",
          ].join(" ");

          if (!entry.href) {
            return (
              <button
                key={entry.n}
                type="button"
                onClick={() => showToast("Appels d'offres privés — bientôt disponible")}
                className={classes}
              >
                {inner}
              </button>
            );
          }

          return (
            <Link key={entry.n} href={entry.href} className={classes}>
              {inner}
            </Link>
          );
        })}
      </section>

      {/* Selection of the day */}
      <section className="px-5 py-8">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-mono text-[11px] tracking-label text-muted">
              SÉLECTION DU JOUR
            </span>
            <h2 className="mt-1 font-display text-[24px] font-500 uppercase leading-tight text-ink">
              Des marchés concrets,
              <br />
              maintenant.
            </h2>
          </div>
        </div>
        <Link
          href="/marches-publics"
          className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-ink underline underline-offset-4"
        >
          Voir toutes les opportunités
          <ArrowRight size={14} />
        </Link>
        <div className="mt-5">
          <ListingCard listing={featured} />
        </div>
      </section>
    </main>
  );
}
