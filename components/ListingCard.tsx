"use client";

import Link from "next/link";
import { Bookmark, Building2, MapPin, ArrowRight } from "lucide-react";
import { useSaved } from "@/lib/useSaved";

export type Listing = {
  id: string;
  kind: string;
  title: string;
  buyer: string;
  location: string;
  deadlineDay: string;
  deadlineMonth: string;
  deadlineTime: string;
  tags: string[];
  procedure: string;
  ref: string;
  href: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  const [saved, toggleSaved] = useSaved(listing.id);

  return (
    <article className="border border-border bg-card">
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="min-w-0">
          <span className="font-mono text-[11px] font-medium tracking-label text-muted">
            {listing.kind}
          </span>
          <Link href={listing.href} className="group block">
            <h3 className="mt-1 font-display text-[19px] font-500 leading-tight text-ink group-hover:underline">
              {listing.title}
            </h3>
          </Link>
          <div className="mt-2 flex items-center gap-1.5 text-[13px] text-ink">
            <Building2 size={14} className="shrink-0 text-muted" />
            <span className="truncate">{listing.buyer}</span>
          </div>
          <div className="mt-1 flex items-center gap-1.5 text-[13px] text-muted">
            <MapPin size={14} className="shrink-0" />
            <span>{listing.location}</span>
          </div>
        </div>
        <button
          type="button"
          aria-label={saved ? "Retirer des enregistrements" : "Enregistrer"}
          aria-pressed={saved}
          onClick={toggleSaved}
          className="shrink-0 text-ink transition-transform active:scale-90 hover:opacity-60"
        >
          <Bookmark size={18} strokeWidth={1.75} fill={saved ? "#C4E725" : "none"} />
        </button>
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted">
          <span>{listing.tags.join(" · ")}</span>
          <span className="text-border">|</span>
          <span>{listing.procedure}</span>
          <span className="text-border">|</span>
          <span>REF.{listing.ref}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border px-4 py-3">
        <div>
          <span className="block font-mono text-[10px] uppercase tracking-label text-muted">
            Remise
          </span>
          <span className="font-display text-[17px] font-500 uppercase text-ink">
            {listing.deadlineDay} {listing.deadlineMonth}
          </span>
          <span className="ml-1.5 text-[13px] text-muted">à {listing.deadlineTime}</span>
        </div>
        <Link
          href={listing.href}
          aria-label="Voir la consultation"
          className="flex h-10 w-10 items-center justify-center border border-ink bg-lime text-ink transition-colors active:scale-95 hover:bg-lime-dark"
        >
          <ArrowRight size={18} />
        </Link>
      </div>
    </article>
  );
}
