"use client";

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-start w-full overflow-x-auto pb-1" role="list" aria-label="Progression">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center flex-1 min-w-[64px] last:flex-none last:min-w-0" role="listitem">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={`w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center font-mono text-[13px] font-bold border-2 shrink-0 transition-colors ${
                  done
                    ? "bg-brand-dark border-brand-dark text-brand-dark-ink"
                    : active
                    ? "bg-gold border-gold text-gold-ink"
                    : "bg-transparent border-border text-ink-faint"
                }`}
                aria-current={active ? "step" : undefined}
              >
                {done ? (
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l5 5L19 7" />
                  </svg>
                ) : (
                  String(i + 1).padStart(2, "0")
                )}
              </div>
              <span className={`text-[11px] md:text-[12.5px] font-semibold whitespace-nowrap ${active ? "text-ink" : done ? "text-ink-soft" : "text-ink-faint"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-[1.5px] mx-1.5 md:mx-2.5 mb-5 min-w-[16px] ${done ? "bg-brand-dark" : "bg-border-soft"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
