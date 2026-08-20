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
          <h1 className="font-display font-extrabold text-[clamp(28px,7vw,62px)] leading-[1.06] tracking-tight max-w-[15ch]">
            {t("home_title_1")} <span className="text-gold">{t("home_title_gold")}</span> {t("home_title_2")}
          </h1>
          <p
            className="mt-4 md:mt-5 text-[15px] md:text-[clamp(15px,2vw,18px)] text-ink-soft max-w-[46ch] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: t("home_subtitle") }}
          />
          <SearchBar />
        </div>
      </section>

      {/* The 3 entry points are the core decision on this page, so they sit right under
          the search bar with minimal scroll, and get the largest, boldest cards on mobile. */}
      <section className="pt-2 pb-10 md:py-14" id="journeys">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="mb-5 md:mb-7">
            <h2 className="font-display font-extrabold text-[22px] md:text-[clamp(22px,3.4vw,30px)] tracking-tight">{t("home_choose_title")}</h2>
            <p className="text-ink-soft mt-2 text-[14px] md:text-[15px] max-w-[52ch]">{t("home_choose_sub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-3.5">
            {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
              <JourneyCard key={key} slug={key} {...journeys[key]} />
            ))}
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
