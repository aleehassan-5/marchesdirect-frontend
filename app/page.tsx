"use client";

import Image from "next/image";
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
        <div className="max-w-[1180px] mx-auto px-5 flex items-center gap-4 sm:gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-extrabold text-[clamp(22px,6vw,38px)] leading-[1.15] tracking-tight">
              {t("home_title_1")}
              <br />
              <span className="text-gold">{t("home_title_2")}</span>
            </h1>
          </div>

          {/* Client-provided cloche illustration (custom asset, checkmark badge added
              server-side) — matches their reference exactly: a serving dome lifted to
              reveal a matched opportunity document underneath, "we bring it to you". */}
          <div className="shrink-0 w-[92px] sm:w-[150px] md:w-[230px]">
            <Image
              src="/images/hero-cloche.webp"
              alt=""
              width={800}
              height={715}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* The 3 entry points are the core decision on this page, so they sit right under
          the hero with minimal scroll, and get the largest, boldest cards on mobile. */}
      <section className="pt-2 pb-3 md:py-10" id="journeys">
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
