"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { JourneyCard } from "@/components/JourneyCard";
import { StatsStrip } from "@/components/StatsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { journeys } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

export default function HomePage() {
  const t = useTranslation();

  return (
    <>
      <Header />

      <section className="pt-8 pb-6 md:pt-16 md:pb-10">
        <div className="max-w-[1180px] mx-auto px-5">
          <h1 className="font-display font-extrabold text-[clamp(24px,6vw,38px)] leading-[1.12] tracking-tight max-w-[15ch]">
            {t("home_title_1")}
            <br />
            <span className="text-gold">{t("home_title_2")}</span>
          </h1>
        </div>
      </section>

      {/* The 3 entry points are the core decision on this page, so they sit right under
          the hero with minimal scroll, and get the largest, boldest cards on mobile. */}
      <section className="pt-2 pb-8 md:py-10" id="journeys">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="grid grid-cols-3 gap-2.5 md:gap-3.5">
            {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
              <JourneyCard key={key} slug={key} {...journeys[key]} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-10 md:pb-14">
        <div className="max-w-[1180px] mx-auto px-5">
          <SearchBar />
        </div>
      </section>

      <StatsStrip />

      <HowItWorks />

      <div className="max-w-[1180px] mx-auto px-5">
        <CTA />
      </div>

      <Footer />
    </>
  );
}
