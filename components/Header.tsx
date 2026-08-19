"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";

export default function Header({
  title,
  backHref,
  actions,
}: {
  title: string;
  backHref?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
      <div className="flex items-center gap-4 min-w-0">
        {backHref ? (
          <Link
            href={backHref}
            aria-label="Retour"
            className="shrink-0 text-ink transition-opacity hover:opacity-60"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </Link>
        ) : null}
        <h1 className="truncate font-display text-[22px] font-600 uppercase tracking-tight text-ink">
          {title}
        </h1>
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-3">{actions}</div> : null}
    </header>
  );
}
