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
        <div className="max-w-[1180px] mx-auto px-5 flex items-center gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-extrabold text-[clamp(24px,6vw,38px)] leading-[1.12] tracking-tight max-w-[22ch]">
              {t("home_title_1")}
              <br />
              <span className="text-gold">{t("home_title_2")}</span>
            </h1>
          </div>

          {/* Original illustration: a dome lifting to reveal a matched opportunity document,
              echoing "we bring it to you" — decorative, hidden on very small screens where
              there isn't room for it next to the headline. */}
          <div className="shrink-0 w-[78px] sm:w-[110px] md:w-[190px]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-auto">
              <ellipse cx="100" cy="168" rx="78" ry="10" fill="var(--bg-elevated)" />
              <rect x="30" y="150" width="140" height="14" rx="7" fill="var(--bg-elevated-2)" stroke="var(--border)" strokeWidth="1.5" />
              <g>
                <path
                  d="M38 118c0-38 27-64 62-64s62 26 62 64"
                  fill="none"
                  stroke="var(--ink-soft)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.35"
                />
                <path d="M28 118h144a6 6 0 0 1 0 12H28a6 6 0 0 1 0-12z" fill="var(--bg-elevated-2)" stroke="var(--border)" strokeWidth="1.5" />
                <circle cx="100" cy="44" r="7" fill="var(--ink-soft)" opacity="0.35" />
                <rect x="96" y="30" width="8" height="16" rx="4" fill="var(--ink-soft)" opacity="0.35" />
              </g>
              <g transform="translate(63 108)">
                <rect x="0" y="0" width="74" height="52" rx="6" fill="var(--bg-elevated)" stroke="var(--border)" strokeWidth="1.5" />
                <rect x="10" y="12" width="40" height="4" rx="2" fill="var(--ink-faint)" />
                <rect x="10" y="21" width="54" height="4" rx="2" fill="var(--ink-faint)" />
                <rect x="10" y="30" width="30" height="4" rx="2" fill="var(--ink-faint)" />
              </g>
              <circle cx="140" cy="150" r="15" fill="var(--gold)" />
              <path d="M133 150l5 5 9-10" fill="none" stroke="var(--gold-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
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
