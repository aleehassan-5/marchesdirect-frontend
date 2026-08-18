"use client";

import { notFound } from "next/navigation";
import { listingById } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResponseWizard } from "@/components/ResponseWizard";
import { useTranslation } from "@/lib/i18n";

export default function RespondPage({ params }: { params: { id: string } }) {
  const t = useTranslation();
  const listing = listingById(params.id);
  if (!listing) return notFound();

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("wiz_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[28ch]">
          {listing.title}
        </h1>
        <p className="text-ink-soft mt-2">{listing.buyer} &middot; {t("listing_deadline")} {listing.deadline}</p>

        <ResponseWizard />
      </div>
      <Footer />
    </>
  );
}
