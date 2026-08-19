"use client";

import { CheckCircle2, AlertTriangle, Download, FileText, UploadCloud } from "lucide-react";
import { useToast } from "@/components/Toast";

export function DocumentChecklistRow({
  label,
  filename,
  complete,
  onAdd,
}: {
  label: string;
  filename?: string;
  complete: boolean;
  onAdd?: () => void;
}) {
  const { showToast } = useToast();

  return (
    <div className="flex items-center justify-between gap-3 border-t border-border/70 py-3.5 first:border-t-0">
      <div className="flex min-w-0 items-center gap-3">
        {complete ? (
          <CheckCircle2 size={20} className="shrink-0 text-brand" fill="#C4E725" />
        ) : (
          <AlertTriangle size={20} className="shrink-0 text-lime-dark" />
        )}
        <span className="truncate text-[15px] text-ink">{label}</span>
      </div>
      {complete && filename ? (
        <button
          type="button"
          onClick={() => showToast(`Téléchargement de ${filename}…`)}
          aria-label={`Télécharger ${filename}`}
          className="flex shrink-0 items-center gap-2 font-mono text-[12px] text-muted transition-opacity active:opacity-60"
        >
          <span className="max-w-[120px] truncate">{filename}</span>
          <Download size={16} className="text-ink" />
        </button>
      ) : (
        <button
          type="button"
          onClick={onAdd}
          className="shrink-0 border border-ink px-4 py-1.5 text-[13px] font-medium text-ink transition-colors active:scale-95 hover:bg-ink hover:text-canvas"
        >
          Ajouter
        </button>
      )}
    </div>
  );
}

export function DocumentFileRow({
  name,
  format,
  size,
  checked,
  onToggle,
}: {
  name: string;
  format: string;
  size: string;
  checked: boolean;
  onToggle?: () => void;
}) {
  const { showToast } = useToast();

  return (
    <div className="flex items-center gap-3 border-b border-border/70 py-3.5 last:border-b-0">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        aria-label={checked ? `Désélectionner ${name}` : `Sélectionner ${name}`}
        onClick={onToggle}
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-ink bg-lime" : "border-border bg-transparent",
        ].join(" ")}
      >
        {checked ? <div className="h-2.5 w-2.5 bg-ink" /> : null}
      </button>
      <FileText size={18} className="shrink-0 text-muted" />
      <span className="flex-1 truncate text-[15px] text-ink">{name}</span>
      <span className="shrink-0 font-mono text-[12px] text-muted">
        {format} · {size}
      </span>
      <button
        type="button"
        aria-label={`Télécharger ${name}`}
        onClick={() => showToast(`Téléchargement de ${name}…`)}
        className="shrink-0 text-ink transition-opacity active:opacity-60"
      >
        <Download size={16} />
      </button>
    </div>
  );
}

export function UploadDropzone({ onFileAdded }: { onFileAdded?: (filename: string) => void }) {
  return (
    <label className="flex cursor-pointer flex-col items-center gap-2 border border-dashed border-border py-8 text-center transition-colors hover:border-ink hover:bg-ink/5">
      <UploadCloud size={22} className="text-muted" />
      <span className="text-[14px] text-ink">Déposer un document</span>
      <span className="font-mono text-[11px] text-muted">PDF, DOCX ou XLSX · 20 Mo maximum</span>
      <input
        type="file"
        accept=".pdf,.docx,.xlsx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileAdded?.(file.name);
          e.target.value = "";
        }}
      />
    </label>
  );
}
