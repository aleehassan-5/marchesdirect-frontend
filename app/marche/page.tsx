"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bookmark, Share2, ArrowRight, Database, Clock, CalendarDays, Eye, Building2 } from "lucide-react";
import Header from "@/components/Header";
import { StatCard } from "@/components/Misc";
import { useSaved } from "@/lib/useSaved";
import { useToast } from "@/components/Toast";

const LISTING_ID = "mp-2026-184";

const lots = [
  { n: "LOT 01", label: "Gros œuvre · Démolition" },
  { n: "LOT 02", label: "Charpente · Couverture" },
  { n: "LOT 03", label: "Électricité · CVC" },
];

const documents = [
  { name: "Règlement de consultation", format: "PDF", size: "1,2 Mo" },
  { name: "CCTP — Lot 01", format: "PDF", size: "4,8 Mo" },
  { name: "DPGF", format: "XLSX", size: "860 Ko" },
];

export default function MarcheDetailPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [saved, toggleSaved] = useSaved(LISTING_ID);
  const [alertCreated, setAlertCreated] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "MARCHÉS/DIRECT", url });
      } catch {
        // user cancelled the native share sheet — nothing to do
      }
      return;
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(url);
      showToast("Lien copié dans le presse-papiers");
    }
  }

  function handleCreateAlert() {
    setAlertCreated(true);
    showToast("Alerte créée pour ce type de marché");
  }

  function handleLotClick(label: string) {
    showToast(`${label} sélectionné`);
    router.push("/dossier");
  }

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header
        title="MARCHÉS/DIRECT"
        backHref="/marches-publics"
        actions={
          <>
            <button aria-label="Partager" onClick={handleShare} className="text-ink transition-transform active:scale-90">
              <Share2 size={20} strokeWidth={1.75} />
            </button>
            <button
              aria-label={saved ? "Retirer des enregistrements" : "Enregistrer"}
              aria-pressed={saved}
              onClick={toggleSaved}
              className="text-ink transition-transform active:scale-90"
            >
              <Bookmark size={20} strokeWidth={1.75} fill={saved ? "#C4E725" : "none"} />
            </button>
          </>
        }
      />

      <main className="flex-1 px-5 py-6">
        <span className="font-mono text-[11px] tracking-label text-muted">
          MARCHÉS PUBLICS / TRAVAUX / MP-2026-184
        </span>

        <div className="mt-3 flex items-center justify-between bg-brand px-4 py-2.5 text-canvas">
          <span className="flex items-center gap-2 text-[13px] font-medium">
            <span className="h-2 w-2 rounded-full bg-lime" />
            CONSULTATION OUVERTE
          </span>
          <span className="font-mono text-[12px] text-lime">12 JOURS RESTANTS</span>
        </div>

        <h1 className="mt-4 font-display text-[30px] font-600 uppercase leading-[0.98] tracking-tight text-ink">
          Extension et restructuration d&rsquo;un groupe scolaire
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-ink">
          <span className="flex items-center gap-1.5">
            <Building2 size={15} className="text-muted" /> Ville de Montpellier
          </span>
          <span className="text-muted">Montpellier (34)</span>
        </div>
        <div className="mt-1 font-mono text-[12px] text-muted">
          MAPA · Travaux · REF.MP-2026-184
        </div>

        <div className="mt-5 border-l-4 border-lime bg-card border border-border p-4">
          <span className="font-mono text-[11px] tracking-label text-muted">
            DATE LIMITE
          </span>
          <div className="mt-1 font-display text-[28px] font-600 uppercase text-ink">
            27 AOÛT 2026 · 12H00
          </div>
          <span className="text-[13px] text-muted">Remise électronique obligatoire</span>
        </div>

        <Link
          href="/dossier"
          className="mt-4 flex items-center justify-center gap-2 border border-ink bg-lime py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98] hover:bg-lime-dark"
        >
          Consulter le dossier
          <ArrowRight size={16} />
        </Link>
        <button
          onClick={handleCreateAlert}
          disabled={alertCreated}
          className={[
            "mt-2.5 flex w-full items-center justify-center gap-2 border border-ink py-3.5 text-[15px] font-semibold transition-transform active:scale-[0.98]",
            alertCreated ? "bg-ink text-canvas" : "text-ink",
          ].join(" ")}
        >
          {alertCreated ? "Alerte créée ✓" : "Créer une alerte similaire"}
          {!alertCreated ? <ArrowRight size={16} /> : null}
        </button>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <StatCard icon={<Database size={14} />} label="Budget estimé" value="2,4 M€" />
          <StatCard icon={<Clock size={14} />} label="Durée du marché" value="18 mois" />
          <StatCard icon={<CalendarDays size={14} />} label="Publication" value="05 AOÛT 2026" />
          <StatCard icon={<Eye size={14} />} label="Visite obligatoire" value="Non" />
        </div>

        <div className="mt-8">
          <SectionLabel>OBJET DU MARCHÉ</SectionLabel>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/90">
            Extension de l&rsquo;école existante, restructuration des espaces
            pédagogiques et construction d&rsquo;un gymnase. Travaux réalisés en
            site partiellement occupé.
          </p>
        </div>

        <div className="mt-7">
          <SectionLabel>LOTS CONCERNÉS</SectionLabel>
          <div className="mt-2 divide-y divide-border border border-border bg-card">
            {lots.map((lot) => (
              <button
                key={lot.n}
                onClick={() => handleLotClick(`${lot.n} — ${lot.label}`)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-ink/5"
              >
                <span>
                  <span className="font-mono text-[12px] text-muted">{lot.n}</span>
                  <span className="ml-2 text-[14px] text-ink">{lot.label}</span>
                </span>
                <ArrowRight size={16} className="text-muted" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <SectionLabel>DOCUMENTS DISPONIBLES</SectionLabel>
          <div className="mt-2 divide-y divide-border border border-border bg-card">
            {documents.map((doc) => (
              <button
                key={doc.name}
                onClick={() => showToast(`Téléchargement de ${doc.name}…`)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left transition-colors active:bg-ink/5"
              >
                <span className="text-[14px] text-ink">{doc.name}</span>
                <span className="font-mono text-[12px] text-muted">
                  {doc.format} · {doc.size}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7">
          <SectionLabel>ACHETEUR PUBLIC</SectionLabel>
          <div className="mt-2 border border-border bg-card p-4">
            <div className="flex items-center gap-2 text-[15px] font-medium text-ink">
              <Building2 size={16} className="text-muted" />
              Ville de Montpellier
            </div>
            <p className="mt-1 text-[13px] text-muted">
              Service de la commande publique
            </p>
            <button
              onClick={() => showToast("Profil acheteur — bientôt disponible")}
              className="mt-2 inline-block text-[13px] font-medium text-ink underline underline-offset-4"
            >
              Voir le profil acheteur
            </button>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 mx-auto flex w-full max-w-[520px] items-center gap-3 border-t border-border bg-brand px-5 py-4">
        <Link
          href="/dossier"
          className="flex flex-1 items-center justify-center gap-2 bg-lime py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          Accéder au DCE
          <ArrowRight size={16} />
        </Link>
        <button
          onClick={toggleSaved}
          aria-pressed={saved}
          className={[
            "flex items-center gap-2 border px-4 py-3.5 text-[14px] font-medium transition-transform active:scale-95",
            saved ? "border-lime bg-lime/10 text-lime" : "border-lime/50 text-canvas",
          ].join(" ")}
        >
          <Bookmark size={16} fill={saved ? "#C4E725" : "none"} />
          {saved ? "Enregistré" : "Enregistrer"}
        </button>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[12px] font-medium tracking-label text-muted">
      {children}
    </span>
  );
}
