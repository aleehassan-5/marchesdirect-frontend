"use client";

import { useState } from "react";

export function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
      >
        <span className="font-display font-bold text-[14.5px] md:text-[15.5px]">{question}</span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border border-gold text-gold flex items-center justify-center text-[16px] leading-none transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && <p className="px-5 pb-4 text-[13.5px] leading-relaxed text-ink-soft">{answer}</p>}
    </div>
  );
}
