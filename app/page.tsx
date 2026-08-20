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

      <section className="pt-8 pb-8 md:pt-16 md:pb-10">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="eyebrow mb-4 md:mb-5" dangerouslySetInnerHTML={{ __html: t("home_eyebrow") }} />
          <h1 className="font-display font-extrabold text-[clamp(28px,7vw,52px)] leading-[1.12] tracking-tight max-w-[15ch]">
            {t("home_title_1")}
            <br />
            <span className="text-gold">{t("home_title_2")}</span>
          </h1>
          <p
            className="mt-4 md:mt-5 text-[15px] md:text-[clamp(15px,2vw,18px)] text-ink-soft max-w-[46ch] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("home_subtitle") }}
          />
        </div>
      </section>

      {/* The 3 entry points are the core decision on this page, so they sit right under
          the hero with minimal scroll, and get the largest, boldest cards on mobile. */}
      <section className="pt-2 pb-10 md:py-14" id="journeys">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
            {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
              <JourneyCard key={key} slug={key} {...journeys[key]} />
            ))}
          </div>
          <div className="mt-8 md:mt-10">
            <SearchBar />
          </div>
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
