"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, ChevronDown, ChevronUp, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import StepIndicator from "@/components/StepIndicator";
import { DocumentChecklistRow, UploadDropzone } from "@/components/DocumentRow";
import { useSaved } from "@/lib/useSaved";
import { useToast } from "@/components/Toast";

const LISTING_ID = "mp-2026-184";

type Piece = { label: string; filename?: string; complete: boolean };

const initialPieces: Piece[] = [
  { label: "DC1 — Lettre de candidature", filename: "dc1_durand.pdf", complete: true },
  { label: "DC2 — Déclaration du candidat", filename: "dc2_durand.pdf", complete: true },
  { label: "Attestation d'assurance", filename: "assurance_2026.pdf", complete: true },
  { label: "Références similaires", complete: false },
  { label: "Attestation fiscale", complete: false },
];

const TOTAL_ELEMENTS = 8; // informations entreprise + lot + 5 pièces + offre technique + offre financière... (weighted below)

export default function ReponsePage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [saved, toggleSaved] = useSaved(LISTING_ID);
  const [expanded, setExpanded] = useState<Set<string>>(new Set(["03"]));
  const [pieces, setPieces] = useState<Piece[]>(initialPieces);
  const piecesRef = useRef<HTMLDivElement>(null);

  const completePieces = pieces.filter((p) => p.complete).length;
  // 2 always-complete sections (Informations entreprise, Lot sélectionné) + pieces done,
  // out of 8 total elements (2 + 5 pièces + offre technique) to mirror the design's "5 / 8".
  const totalComplete = Math.min(2 + completePieces, TOTAL_ELEMENTS);
  const percent = Math.round((totalComplete / TOTAL_ELEMENTS) * 100);

  function toggleSection(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addPiece(index: number, filename: string) {
    setPieces((prev) =>
      prev.map((p, i) => (i === index ? { ...p, complete: true, filename } : p))
    );
    showToast(`${filename} ajouté`);
  }

  function handleDropzoneFile(filename: string) {
    const nextIncompleteIndex = pieces.findIndex((p) => !p.complete);
    if (nextIncompleteIndex === -1) {
      showToast("Toutes les pièces sont déjà fournies");
      return;
    }
    addPiece(nextIncompleteIndex, filename);
  }

  function handleShowMissing() {
    setExpanded((prev) => new Set(prev).add("03"));
    piecesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleSaveDraft() {
    const time = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    showToast(`Brouillon enregistré à ${time}`);
  }

  function handleContinue() {
    if (percent < 100) {
      showToast("Complétez les éléments restants avant l'envoi");
      handleShowMissing();
      return;
    }
    showToast("Étape Envoi — bientôt disponible");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        title="PRÉPARER MA RÉPONSE"
        backHref="/dossier"
        actions={
          <button
            onClick={toggleSaved}
            aria-pressed={saved}
            className="flex items-center gap-1.5 text-[13px] font-medium text-ink transition-transform active:scale-95"
          >
            <Bookmark size={17} strokeWidth={1.75} fill={saved ? "#C4E725" : "none"} />
            {saved ? "Enregistré" : "Enregistrer"}
          </button>
        }
      />

      <main className="flex-1 px-5 pb-10 pt-5">
        <div className="border-l-4 border-lime bg-card border border-border p-4">
          <h1 className="font-display text-[19px] font-500 leading-tight text-ink">
            Extension et restructuration d&rsquo;un groupe scolaire
          </h1>
          <div className="mt-1.5 flex flex-wrap items-center justify-between gap-1 font-mono text-[12px] text-muted">
            <span>LOT 01 · GROS ŒUVRE</span>
            <span>Échéance 27 AOÛT 2026 · 12H00</span>
          </div>
        </div>

        <StepIndicator
          steps={[
            { label: "Dossier", status: "done" },
            { label: "Analyse", status: "done" },
            { label: "Réponse", status: "active" },
            { label: "Envoi", status: "upcoming" },
          ]}
        />

        <h2 className="font-display text-[30px] font-600 uppercase text-ink">
          Votre candidature
        </h2>
        <p className="mt-1 text-[14px] text-ink/80">
          Complétez les éléments requis avant l&rsquo;envoi.
        </p>

        <div className="mt-4 border border-border bg-card p-4">
          <div className="flex items-end justify-between">
            <span className="font-display text-[34px] font-600 leading-none text-brand">
              {percent} %
            </span>
            <span className="text-right text-[13px] text-ink">
              {totalComplete} éléments complétés sur {TOTAL_ELEMENTS}
            </span>
          </div>
          <div className="mt-3 h-2 w-full bg-border">
            <div className="h-2 bg-lime transition-all" style={{ width: `${percent}%` }} />
          </div>
          <span className="mt-2 block text-[12px] text-muted">
            Brouillon enregistré à 10H42
          </span>
        </div>

        <div className="mt-5 divide-y divide-border border border-border">
          <AccordionHeader
            n="01"
            title="Informations entreprise"
            status="COMPLET"
            summary="Bâtiment Durand SAS · SIRET 452 118 904 00027"
            expanded={expanded.has("01")}
            onToggle={() => toggleSection("01")}
          >
            <button
              onClick={() => showToast("Modification bientôt disponible")}
              className="mt-3 text-[13px] font-medium text-ink underline underline-offset-4"
            >
              Modifier
            </button>
          </AccordionHeader>

          <AccordionHeader
            n="02"
            title="Lot sélectionné"
            status="COMPLET"
            summary="LOT 01 — Gros œuvre · Démolition"
            expanded={expanded.has("02")}
            onToggle={() => toggleSection("02")}
          >
            <button
              onClick={() => router.push("/marche")}
              className="mt-3 border border-ink px-4 py-2 text-[13px] font-medium text-ink transition-colors active:scale-95 hover:bg-ink hover:text-canvas"
            >
              Changer de lot
            </button>
          </AccordionHeader>

          <div ref={piecesRef}>
            <AccordionHeader
              n="03"
              title="Pièces de candidature"
              status={`${completePieces} / 5 AJOUTÉES`}
              expanded={expanded.has("03")}
              onToggle={() => toggleSection("03")}
            >
              <div className="mt-2">
                {pieces.map((piece, i) => (
                  <DocumentChecklistRow
                    key={piece.label}
                    label={piece.label}
                    filename={piece.filename}
                    complete={piece.complete}
                    onAdd={() => addPiece(i, `${piece.label.split(" ")[0].toLowerCase()}_durand.pdf`)}
                  />
                ))}
              </div>
              <div className="mt-4">
                <UploadDropzone onFileAdded={handleDropzoneFile} />
              </div>
            </AccordionHeader>
          </div>

          <AccordionHeader
            n="04"
            title="Offre technique"
            status="À COMPLÉTER"
            summary="Mémoire technique · Planning prévisionnel"
            expanded={expanded.has("04")}
            onToggle={() => toggleSection("04")}
          >
            <button
              onClick={() => showToast("Offre technique — bientôt disponible")}
              className="mt-3 border border-ink px-4 py-2 text-[13px] font-medium text-ink transition-colors active:scale-95 hover:bg-ink hover:text-canvas"
            >
              Compléter
            </button>
          </AccordionHeader>

          <AccordionHeader
            n="05"
            title="Offre financière"
            status="À COMPLÉTER"
            summary="DPGF · Acte d'engagement"
            expanded={expanded.has("05")}
            onToggle={() => toggleSection("05")}
          >
            <button
              onClick={() => showToast("Offre financière — bientôt disponible")}
              className="mt-3 border border-ink px-4 py-2 text-[13px] font-medium text-ink transition-colors active:scale-95 hover:bg-ink hover:text-canvas"
            >
              Compléter
            </button>
          </AccordionHeader>
        </div>

        {percent < 100 ? (
          <div className="mt-4 flex items-start gap-3 border-l-4 border-lime-dark bg-card border border-border p-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-lime-dark" />
            <div>
              <p className="text-[14px] text-ink">
                {TOTAL_ELEMENTS - totalComplete} élément
                {TOTAL_ELEMENTS - totalComplete !== 1 ? "s" : ""} obligatoire
                {TOTAL_ELEMENTS - totalComplete !== 1 ? "s" : ""} encore manquant
                {TOTAL_ELEMENTS - totalComplete !== 1 ? "s" : ""}.
              </p>
              <button
                onClick={handleShowMissing}
                className="mt-0.5 inline-block text-[13px] font-medium text-ink underline underline-offset-4"
              >
                Voir les éléments
              </button>
            </div>
          </div>
        ) : null}
      </main>

      <div className="flex items-center gap-3 border-t border-border px-5 py-4">
        <button
          onClick={handleSaveDraft}
          className="flex flex-1 items-center justify-center border border-ink py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          Enregistrer le brouillon
        </button>
        <button
          onClick={handleContinue}
          className="flex flex-1 items-center justify-center gap-2 border border-ink bg-lime py-3.5 text-[15px] font-semibold text-ink transition-transform active:scale-[0.98]"
        >
          Continuer
          <ChevronDown size={16} className="-rotate-90" />
        </button>
      </div>
    </div>
  );
}

function AccordionHeader({
  n,
  title,
  status,
  summary,
  expanded,
  onToggle,
  children,
}: {
  n: string;
  title: string;
  status: string;
  summary?: string;
  expanded: boolean;
  onToggle: () => void;
  children?: React.ReactNode;
}) {
  const complete = status === "COMPLET";
  return (
    <div className="bg-card">
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
      >
        <span
          className={[
            "flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px]",
            complete ? "bg-brand text-lime" : "border border-border text-muted",
          ].join(" ")}
        >
          {complete ? "✓" : n}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium text-ink">
            {n} · {title}
          </span>
          {summary ? (
            <span className="mt-0.5 block truncate text-[12px] text-muted">{summary}</span>
          ) : null}
        </span>
        <span
          className={[
            "shrink-0 font-mono text-[11px] tracking-label",
            complete ? "text-muted" : "text-lime-dark",
          ].join(" ")}
        >
          {status}
        </span>
        {expanded ? (
          <ChevronUp size={18} className="shrink-0 text-ink" />
        ) : (
          <ChevronDown size={18} className="shrink-0 text-muted" />
        )}
      </button>
      {expanded && children ? <div className="px-4 pb-5">{children}</div> : null}
    </div>
  );
}
