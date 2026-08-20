"use client";

import { useTranslation } from "@/lib/i18n";

export function LoadingState({ rows = 3 }: { rows?: number }) {
  const t = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center" role="status" aria-live="polite">
      <span className="w-8 h-8 rounded-full border-2 border-border-soft border-t-gold animate-spin" />
      <p className="text-ink-soft text-[13.5px] font-mono">{t("state_loading")}</p>
      <div className="w-full max-w-[560px] flex flex-col gap-3 mt-2">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="card h-[92px] animate-pulse bg-bg-elevated-2 border-border-soft" />
        ))}
      </div>
    </div>
  );
}

export function EmptyState({
  onReset,
  title,
  subtitle,
}: {
  onReset?: () => void;
  title?: string;
  subtitle?: string;
}) {
  const t = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-5 text-center card border-dashed">
      <div className="w-12 h-12 rounded-full bg-bg-elevated-2 flex items-center justify-center text-ink-faint">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-[16px]">{title ?? t("state_empty_title")}</h3>
      <p className="text-ink-soft text-[13.5px] max-w-[42ch]">{subtitle ?? t("state_empty_sub")}</p>
      {onReset && (
        <button onClick={onReset} className="btn btn-ghost mt-1">
          {t("state_empty_reset")}
        </button>
      )}
    </div>
  );
}

export function ErrorState({ onRetry, message }: { onRetry?: () => void; message?: string }) {
  const t = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 px-5 text-center card border-dashed">
      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 9v4M12 17h.01M10.3 3.9L2.7 17.1A1.8 1.8 0 004.3 20h15.4a1.8 1.8 0 001.6-2.9L13.7 3.9a1.8 1.8 0 00-3.4 0z" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-[16px]">{t("state_error_title")}</h3>
      <p className="text-ink-soft text-[13.5px] max-w-[42ch]">{message ?? t("state_error_sub")}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-gold mt-1">
          {t("state_retry")}
        </button>
      )}
    </div>
  );
}
