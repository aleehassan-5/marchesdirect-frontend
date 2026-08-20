"use client";

import { notFound } from "next/navigation";
import { listingById } from "@/lib/data";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ResponseWizard } from "@/components/ResponseWizard";
import { StepIndicator } from "@/components/StepIndicator";
import { useTranslation } from "@/lib/i18n";

export default function RespondPage({ params }: { params: { id: string } }) {
  const t = useTranslation();
  const listing = listingById(params.id);
  if (!listing) return notFound();

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="mb-7 md:mb-9">
          <StepIndicator
            steps={[t("detail_step_dossier"), t("detail_step_analysis"), t("detail_step_response"), t("detail_step_sending")]}
            current={2}
          />
        </div>
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
