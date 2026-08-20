"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingCard } from "@/components/ListingCard";
import { EmptyState } from "@/components/States";
import { useSavedListings } from "@/lib/useSavedListings";
import { useTranslation } from "@/lib/i18n";
import { fetchOpportunityById } from "@/lib/api";
import type { Listing } from "@/lib/data";

export default function SavedPage() {
  const t = useTranslation();
  const { ids, ready } = useSavedListings();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (ids.length === 0) {
      setListings([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all(ids.map((id) => fetchOpportunityById(id).catch(() => null))).then((results) => {
      setListings(results.filter((l): l is Listing => l !== null));
      setLoading(false);
    });
  }, [ready, ids]);

  return (
    <>
      <Header />
      <div className="max-w-[1180px] mx-auto px-5 py-8 md:py-10">
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight">
          {t("nav_saved")}
        </h1>

        {ready && !loading && listings.length === 0 && (
          <div className="mt-6">
            <EmptyState />
          </div>
        )}

        {listings.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
