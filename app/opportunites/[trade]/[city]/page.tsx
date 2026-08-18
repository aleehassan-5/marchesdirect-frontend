"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingCard } from "@/components/ListingCard";
import { listings } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

// SEO page pattern: one page per (trade x city x opportunity type), generated at scale
// at build/deploy time from the source database - see Technical Requirements section 10.
// This route demonstrates the pattern; production generation is a backend/build-pipeline task.

function titleCase(s: string) {
  return decodeURIComponent(s).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SeoLandingPage({ params }: { params: { trade: string; city: string } }) {
  const t = useTranslation();
  const trade = titleCase(params.trade);
  const city = titleCase(params.city);
  const results = listings.slice(0, 3);

  return (
    <>
      <Header />
      <div className="max-w-[1100px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4" dangerouslySetInnerHTML={{ __html: t("seo_eyebrow") }} />
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,36px)] tracking-tight max-w-[24ch]">
          {t("seo_title", { trade, city })}
        </h1>
        <p
          className="text-ink-soft mt-3 max-w-[60ch]"
          dangerouslySetInnerHTML={{ __html: t("seo_sub", { trade: trade.toLowerCase(), city }) }}
        />

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {results.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        <div
          className="mt-10 card p-5 text-[13px] text-ink-faint font-mono"
          dangerouslySetInnerHTML={{ __html: t("seo_pattern") }}
        />
      </div>
      <Footer />
    </>
  );
}
