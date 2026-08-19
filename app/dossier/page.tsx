"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Bookmark, Eye, ClipboardList, CalendarClock, BrainCircuit, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { StatCard } from "@/components/Misc";
import { DocumentFileRow } from "@/components/DocumentRow";
import { useSaved } from "@/lib/useSaved";
import { useToast } from "@/components/Toast";

const LISTING_ID = "mp-2026-184";

const consultationDocs = [
  { name: "Règlement de consultation", format: "PDF", size: "1,2 Mo" },
  { name: "Acte d'engagement", format: "DOCX", size: "680 Ko" },
  { name: "CCAP", format: "PDF", size: "2,1 Mo" },
];

const lotDocs = [
  { name: "CCTP — Lot 01", format: "PDF", size: "4,8 Mo" },
  { name: "DPGF — Lot 01", format: "XLSX", size: "860 Ko" },
  { name: "Plans architecte", format: "ZIP", size: "18,4 Mo" },
];

const allDocs = [...consultationDocs, ...lotDocs];

export default function DossierPage() {
  const { showToast } = useToast();
  const [saved, toggleSaved] = useSaved(LISTING_ID);
  const [checked, setChecked] = useState<string[]>([
    "Règlement de consultation",
    "Acte d'engagement",
  ]);

  const allSelected = checked.length === allDocs.length;

  function toggleDoc(name: string) {
    setChecked((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }

  function toggleAll() {
    setChecked(allSelected ? [] : allDocs.map((d) => d.name));
  }

  function handleDownloadSelected() {
    if (checked.length === 0) {
      showToast("Sélectionnez au moins un document");
      return;
    }
    showToast(`Téléchargement de ${checked.length} document${checked.length > 1 ? "s" : ""}…`);
  }

  const consultedCount = useMemo(() => Math.min(3 + checked.length - 2, 8), [checked.length]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="DOSSIER DE CONSULTATION"
        backHref="/marche"
        actions={
          <button
            aria-label={saved ? "Retirer des enregistrements" : "Enregistrer"}
            aria-pressed={saved}
            onClick={toggleSaved}
            className="text-ink transition-transform active:scale-90"
          >
            <Bookmark size={20} strokeWidth={1.75} fill={saved ? "#C4E725" : "none"} />
          </button>
        }
      />

      <main className="flex-1 px-5 pb-10 pt-5">
        <div className="border-l-4 border-lime bg-card border border-border p-4">
          <h1 className="font-display text-[20px] font-500 leading-tight text-ink">
            Extension et restructuration d&rsquo;un groupe scolaire
          </h1>
          <p className="mt-1 font-mono text-[12px] text-muted">
            Ville de Montpellier · REF.MP-2026-184
          </p>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] font-medium text-brand">
            <span className="h-2 w-2 rounded-full bg-lime-dark" />
            OUVERT · 12 JOURS RESTANTS
          </div>
        </div>

        <StepIndicator
          steps={[
            { label: "Dossier", status: "active" },
            { label: "Analyse", status: "upcoming" },
            { label: "Réponse", status: "upcoming" },
            { label: "Envoi", status: "upcoming" },
          ]}
        />

        <h2 className="font-display text-[26px] font-500 uppercase text-ink">
          Documents du marché
        </h2>
        <p className="mt-1 text-[13px] text-muted">
          8 documents · dernière mise à jour le{" "}
          <span className="text-ink">05 AOÛT 2026</span>
        </p>

        <div className="mt-4">
          <span className="font-mono text-[12px] tracking-label text-muted">
            CONSULTATION
          </span>
          <div className="mt-2 border border-border bg-card px-4">
            {consultationDocs.map((doc) => (
              <DocumentFileRow
                key={doc.name}
                {...doc}
                checked={checked.includes(doc.name)}
                onToggle={() => toggleDoc(doc.name)}
              />
            ))}
          </div>
        </div>

        <div className="mt-5">
          <span className="font-mono text-[12px] tracking-label text-muted">
            LOT 01 · GROS ŒUVRE
          </span>
          <div className="mt-2 border border-border bg-card px-4">
            {lotDocs.map((doc) => (
              <DocumentFileRow
                key={doc.name}
                {...doc}
                checked={checked.includes(doc.name)}
                onToggle={() => toggleDoc(doc.name)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[13px] text-ink">
            {checked.length} document{checked.length !== 1 ? "s" : ""} sélectionné
            {checked.length !== 1 ? "s" : ""}
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleAll}
              className="text-[13px] font-medium text-ink underline underline-offset-4"
            >
              {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
            </button>
            <button
              onClick={handleDownloadSelected}
              className="flex items-center gap-2 border border-ink bg-lime px-4 py-2.5 text-[14px] font-semibold text-ink transition-transform active:scale-95"
            >
              Télécharger
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <h2 className="mt-9 font-display text-[24px] font-500 uppercase text-ink">
          Votre préparation
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2">
          <StatCard
            icon={<Eye size={14} />}
            label="Documents consultés"
            value={`${consultedCount} / 8`}
            sub={
              <div className="mt-1 h-1.5 w-full bg-border">
                <div
                  className="h-1.5 bg-lime transition-all"
                  style={{ width: `${(consultedCount / 8) * 100}%` }}
                />
              </div>
            }
          />
          <StatCard icon={<ClipboardList size={14} />} label="Éléments à compléter" value="4" />
          <StatCard icon={<CalendarClock size={14} />} label="Échéance" value="27 AOÛT · 12H00" />
        </div>

        <div className="mt-6 flex items-center gap-4 border border-brand bg-brand p-5 text-canvas">
          <BrainCircuit size={30} className="shrink-0 text-lime" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-[18px] font-500 uppercase text-canvas">
              Analyse assistée
            </h3>
            <p className="mt-1 text-[13px] leading-snug text-canvas/75">
              Repérez les exigences, les dates et les pièces demandées.
            </p>
            <span className="mt-2 inline-block border border-lime/50 px-2 py-1 font-mono text-[10px] tracking-label text-lime">
              BIENTÔT DISPONIBLE
            </span>
          </div>
        </div>
      </main>

      <div className="flex items-center gap-3 border-t border-border px-5 py-4">
        <Link
          href="/marche"
          className="flex flex-1 items-center justify-center border border-ink py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          Retour au marché
        </Link>
        <Link
          href="/reponse"
          className="flex flex-1 items-center justify-center gap-2 border border-ink bg-lime py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          Préparer ma réponse
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
