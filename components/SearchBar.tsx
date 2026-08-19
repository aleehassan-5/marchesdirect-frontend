"use client";

import { Search } from "lucide-react";
import { KeyboardEvent } from "react";

export default function SearchBar({
  placeholder,
  dark = false,
  value,
  onChange,
  onSubmit,
  name,
}: {
  placeholder: string;
  dark?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  name?: string;
}) {
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.((e.target as HTMLInputElement).value);
    }
  };

  return (
    <div
      className={[
        "flex items-stretch border",
        dark ? "border-lime/40 bg-transparent" : "border-ink bg-card",
      ].join(" ")}
    >
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={handleKeyDown}
        className={[
          "min-w-0 flex-1 bg-transparent px-4 py-3.5 text-[15px] outline-none placeholder:text-muted",
          dark ? "text-canvas placeholder:text-canvas/50" : "text-ink",
        ].join(" ")}
      />
      <button
        type="button"
        aria-label="Rechercher"
        onClick={() => onSubmit?.(value ?? "")}
        className="flex w-14 shrink-0 items-center justify-center bg-lime text-ink transition-colors active:scale-95 hover:bg-lime-dark active:bg-lime-dark"
      >
        <Search size={20} />
      </button>
    </div>
  );
}
