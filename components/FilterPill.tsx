"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { LucideIcon } from "lucide-react";

export function FilterTab({
  label,
  active = false,
  icon: Icon,
  onClick,
}: {
  label: string;
  active?: boolean;
  icon?: LucideIcon;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex items-center gap-1.5 whitespace-nowrap border px-4 py-2.5 text-[14px] font-medium transition-colors active:scale-95",
        active
          ? "border-brand bg-brand text-canvas"
          : "border-ink bg-transparent text-ink hover:bg-ink/5",
      ].join(" ")}
    >
      {Icon ? <Icon size={15} /> : null}
      {label}
    </button>
  );
}

export function FilterDropdown({
  label,
  options,
  value,
  onSelect,
}: {
  label: string;
  options?: string[];
  value?: string;
  onSelect?: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const hasOptions = options && options.length > 0;

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => hasOptions && setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={[
          "flex w-full items-center justify-between gap-2 border px-4 py-2.5 text-[14px] transition-colors",
          value ? "border-brand text-brand bg-card" : "border-border bg-card text-ink",
        ].join(" ")}
      >
        <span className="truncate">{value || label}</span>
        <ChevronDown
          size={16}
          className={["shrink-0 text-muted transition-transform", open ? "rotate-180" : ""].join(" ")}
        />
      </button>
      {open && hasOptions ? (
        <ul
          role="listbox"
          className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full min-w-[160px] overflow-y-auto border border-ink bg-card shadow-lg"
        >
          {value ? (
            <li>
              <button
                type="button"
                onClick={() => {
                  onSelect?.("");
                  setOpen(false);
                }}
                className="block w-full px-4 py-2.5 text-left text-[13px] text-muted hover:bg-ink/5"
              >
                Réinitialiser
              </button>
            </li>
          ) : null}
          {options!.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onSelect?.(opt);
                  setOpen(false);
                }}
                className={[
                  "block w-full px-4 py-2.5 text-left text-[14px] hover:bg-lime/30",
                  value === opt ? "bg-lime/40 font-medium text-ink" : "text-ink",
                ].join(" ")}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
