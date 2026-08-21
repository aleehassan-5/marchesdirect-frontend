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
        <div className="max-w-[1180px] mx-auto px-5 flex items-center gap-4 sm:gap-6 md:gap-10">
          <div className="flex-1 min-w-0">
            <h1 className="font-display font-extrabold text-[clamp(22px,6vw,38px)] leading-[1.15] tracking-tight">
              {t("home_title_1")}
              <br />
              <span className="text-gold">{t("home_title_2")}</span>
            </h1>
          </div>

          {/* Realistic-shaded cloche illustration (gradients + shadow layers instead of flat
              shapes) matching the client's reference: a serving dome lifted at an angle to
              reveal a matched opportunity document underneath — "we bring it to you". */}
          <div className="shrink-0 w-[92px] sm:w-[150px] md:w-[230px]" aria-hidden="true">
            <svg viewBox="0 0 200 200" className="w-full h-auto">
              <defs>
                <radialGradient id="domeGrad" cx="35%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#3a4a5e" />
                  <stop offset="55%" stopColor="#16233a" />
                  <stop offset="100%" stopColor="#0a1220" />
                </radialGradient>
                <linearGradient id="domeHighlight" x1="20%" y1="0%" x2="70%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                  <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="plateGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#26364d" />
                  <stop offset="100%" stopColor="#0c1929" />
                </linearGradient>
                <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Ambient shadow under everything */}
              <ellipse cx="100" cy="182" rx="82" ry="12" fill="url(#shadowGrad)" />

              {/* Base plate */}
              <ellipse cx="100" cy="168" rx="80" ry="11" fill="url(#plateGrad)" />
              <ellipse cx="100" cy="164" rx="80" ry="11" fill="#1c2c40" opacity="0.6" />

              {/* Document peeking out */}
              <g transform="translate(63 108)">
                <rect x="2" y="3" width="74" height="52" rx="6" fill="#0a1220" opacity="0.4" />
                <rect x="0" y="0" width="74" height="52" rx="6" fill="#eef1f5" stroke="#c7cdd6" strokeWidth="1" />
                <rect x="10" y="12" width="40" height="4" rx="2" fill="#8491a2" />
                <rect x="10" y="21" width="54" height="4" rx="2" fill="#8491a2" />
                <rect x="10" y="30" width="30" height="4" rx="2" fill="#8491a2" />
              </g>
              <circle cx="140" cy="150" r="15" fill="var(--gold)" />
              <path d="M133 150l5 5 9-10" fill="none" stroke="var(--gold-ink)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Dome, lifted and tilted, with realistic radial shading + specular highlight */}
              <g transform="rotate(-7 100 95)">
                <ellipse cx="100" cy="122" rx="86" ry="13" fill="url(#plateGrad)" />
                <path d="M14 122c0-48 38-88 86-88s86 40 86 88H14z" fill="url(#domeGrad)" />
                <path d="M14 122c0-48 38-88 86-88s86 40 86 88H14z" fill="url(#domeHighlight)" />
                <path
                  d="M14 122c0-48 38-88 86-88s86 40 86 88"
                  fill="none"
                  stroke="#4a5b70"
                  strokeWidth="1.5"
                  opacity="0.5"
                />
                {/* Knob */}
                <rect x="95" y="14" width="10" height="18" rx="5" fill="#1c2c40" />
                <circle cx="100" cy="10" r="9" fill="#2a3c52" />
                <circle cx="97" cy="7" r="3" fill="#ffffff" opacity="0.4" />
              </g>
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
