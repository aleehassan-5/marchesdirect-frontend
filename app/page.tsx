"use client";

import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/SearchBar";
import { JourneyCard } from "@/components/JourneyCard";
import { StatsStrip } from "@/components/StatsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { journeys } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

export default function HomePage() {
  const t = useTranslation();

  return (
    <>
      <Header />

      <section className="pt-4 pb-3 md:pt-16 md:pb-10">
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

      {/* Advisor CTA - sits directly above the 3 entry-point cards, per the client's
          annotated reference (blue circle links these buttons to the cards row
          right below them, not further down the page). */}
      <section className="pb-1.5 md:pb-6">
        <div className="max-w-[1180px] mx-auto px-5 flex gap-1.5 sm:gap-2.5 flex-wrap">
          <Link href="/contact" className="btn btn-gold flex-1 sm:flex-none justify-center gap-2">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t("home_advisor_book")}
          </Link>
          <Link href="/contact" className="btn btn-ghost flex-1 sm:flex-none justify-center gap-2">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {t("cta_callback")}
          </Link>
        </div>
      </section>

      {/* The 3 entry points are the core decision on this page, so they sit right under
          the hero with minimal scroll, and get the largest, boldest cards on mobile. */}
      <section className="pt-0.5 pb-1.5 md:py-10" id="journeys">
        <div className="max-w-[1180px] mx-auto px-5">
          <div className="grid grid-cols-3 gap-2.5 md:gap-3.5">
            {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
              <JourneyCard key={key} slug={key} {...journeys[key]} />
            ))}
          </div>
        </div>
      </section>

      <section className="pb-3 md:pb-14">
        <div className="max-w-[1180px] mx-auto px-5">
          <SearchBar />
        </div>
      </section>

      {/* Support/advisor CTA, then "who we are" — in that order, matching the client's
          reference screenshot exactly (support card sits directly under the search box,
          the who-we-are card comes after it, not before). */}
      <section className="pb-8 md:pb-12">
        <div className="max-w-[1180px] mx-auto px-5 flex flex-col gap-4">
          <div className="card p-5 md:p-6">
            <h3 className="font-display font-bold text-[16px] md:text-[17px]">{t("home_advisor_title")}</h3>
            <p className="text-ink-soft text-[13.5px] mt-1 mb-4">{t("home_advisor_sub")}</p>
            <div className="flex gap-2.5 flex-wrap">
              <Link href="/contact" className="btn btn-gold flex-1 sm:flex-none justify-center gap-2">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t("home_advisor_book")}
              </Link>
              <Link href="/contact" className="btn btn-ghost flex-1 sm:flex-none justify-center gap-2">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {t("cta_callback")}
              </Link>
            </div>
          </div>

          <div className="card p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="flex-1">
              <h3 className="font-display font-bold text-[16px] md:text-[17px]">{t("home_who_title")}</h3>
              <p className="text-ink-soft text-[13.5px] mt-1 max-w-[52ch]">{t("home_who_body")}</p>
            </div>
            {/* Team photo placeholder: no real headshot has been uploaded yet, so this
                stays a neutral icon block rather than a stock photo standing in for
                the actual team. Swap for a real group photo once the client provides one. */}
            <div className="w-full sm:w-[180px] h-[110px] rounded-[14px] bg-bg-elevated-2 border border-border-soft shrink-0 flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5">
                <circle cx="8" cy="8" r="3" />
                <circle cx="16" cy="8" r="3" />
                <path d="M2 20c1-4 4-6 6-6s5 2 6 6M14 14c2 0 5 2 6 6" />
              </svg>
            </div>
          </div>

          <AdvisorButtons />
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
