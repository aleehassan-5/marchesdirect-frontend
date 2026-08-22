"use client";

import Link from "next/link";
import Image from "next/image";
import type { JourneyKey } from "@/lib/data";
import { useTranslation } from "@/lib/i18n";

const rowIcons: Record<JourneyKey, JSX.Element> = {
  "marches-publics": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10l9-6 9 6" />
      <path d="M4 10v9M8 10v9M12 10v9M16 10v9M20 10v9" />
      <path d="M2.5 19.5h19" />
    </svg>
  ),
  "appels-doffres": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="10" width="7" height="10" />
      <rect x="12" y="4" width="9" height="16" />
      <path d="M5.5 13h2M5.5 16h2M14.5 7h4M14.5 10h4M14.5 13h4M14.5 16h4" />
    </svg>
  ),
  "sous-traitance": (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12l4-3 3.5 2.5L14 8l4 3" />
      <path d="M6 9l3 3-1.5 1.5a1.6 1.6 0 0 1-2.3 0 1.6 1.6 0 0 1 0-2.3L9 7.5" />
      <path d="M18 9l-3 3 1.5 1.5a1.6 1.6 0 0 0 2.3 0 1.6 1.6 0 0 0 0-2.3L15 7.5" />
    </svg>
  ),
};

const labelKey: Record<JourneyKey, "nav_public" | "nav_tenders" | "nav_subcontract"> = {
  "marches-publics": "nav_public",
  "appels-doffres": "nav_tenders",
  "sous-traitance": "nav_subcontract",
};

const order: JourneyKey[] = ["marches-publics", "appels-doffres", "sous-traitance"];

export function HomeHeroCard() {
  const t = useTranslation();

  return (
    <section className="pt-4 pb-4 md:pt-14 md:pb-10">
      <div className="max-w-[1280px] mx-auto px-3 md:px-5">
        {/* Card with orange/yellow border matching button colors */}
        <div className="card border-orange-500/60 p-4 md:p-9 relative overflow-hidden">
          <svg
            viewBox="0 0 200 140"
            className="pointer-events-none absolute right-0 top-0 w-[55%] max-w-[220px] h-auto"
            preserveAspectRatio="xMaxYMin meet"
            fill="none"
          >
            <defs>
              {/* Blue gradient background matching the card */}
              <linearGradient id="blueBg" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#0B1A33" stopOpacity="0" />
                <stop offset="20%" stopColor="#0B1A33" stopOpacity="0.04" />
                <stop offset="50%" stopColor="#132A4F" stopOpacity="0.1" />
                <stop offset="75%" stopColor="#1A3A6B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1E4D8C" stopOpacity="0.3" />
              </linearGradient>

              {/* Neon red glow - diffused and soft */}
              <radialGradient id="neonGlow" cx="85%" cy="15%" r="55%">
                <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0.75" />
                <stop offset="15%" stopColor="#E60000" stopOpacity="0.45" />
                <stop offset="35%" stopColor="#CC0000" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#B30000" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#990000" stopOpacity="0" />
              </radialGradient>

              {/* Brighter core near the tip */}
              <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF3333" stopOpacity="0.7" />
                <stop offset="40%" stopColor="#FF1A1A" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#E60000" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#CC0000" stopOpacity="0" />
              </radialGradient>

              {/* Soft glow filter for the neon effect */}
              <filter id="neonFilter" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feColorMatrix
                  in="blur"
                  type="matrix"
                  values="1.2 0 0 0 0.15
                          0.2 0.8 0 0 0.05
                          0 0.1 0.6 0 0
                          0 0 0 0.6 0"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Red outline - fades at the tail */}
              <linearGradient id="redOutline" x1="0%" y1="0%" x2="100%" y2="15%">
                <stop offset="0%" stopColor="#FF1A1A" stopOpacity="0" />
                <stop offset="10%" stopColor="#FF1A1A" stopOpacity="0.03" />
                <stop offset="25%" stopColor="#E60000" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#E60000" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#CC0000" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF1A1A" stopOpacity="1" />
              </linearGradient>

              {/* Yellow fill - fades at the tail */}
              <linearGradient id="yellowFill" x1="0%" y1="0%" x2="100%" y2="15%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
                <stop offset="10%" stopColor="#FFD700" stopOpacity="0.03" />
                <stop offset="25%" stopColor="#FFC200" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#FFB300" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#FFA500" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Blue gradient background */}
            <rect x="0" y="0" width="200" height="140" fill="url(#blueBg)" rx="12" />

            {/* Neon glow behind the entire arrow */}
            <circle cx="175" cy="20" r="48" fill="url(#neonGlow)" opacity="0.65" />
            <circle cx="175" cy="20" r="20" fill="url(#coreGlow)" opacity="0.5" />
            <circle cx="175" cy="20" r="10" fill="url(#coreGlow)" opacity="0.4" />

            {/* Main arrow with ROUNDED CORNERS using Quadratic Beziers (Q) */}
            <path
              d="M 15 115
                 Q 30 106 45 98
                 Q 58 103 70 107
                 Q 82 91 100 72
                 Q 115 78 125 82
                 Q 150 50 175 20"
              stroke="url(#redOutline)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonFilter)"
              opacity="0.95"
            />

            {/* Yellow fill inside - same rounded path */}
            <path
              d="M 15 115
                 Q 30 106 45 98
                 Q 58 103 70 107
                 Q 82 91 100 72
                 Q 115 78 125 82
                 Q 150 50 175 20"
              stroke="url(#yellowFill)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Arrowhead - straight lines forming a V */}
            <path
              d="M 175 20 L 158 26 M 175 20 L 172 35"
              stroke="url(#redOutline)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#neonFilter)"
              opacity="0.95"
            />
            
            <path
              d="M 175 20 L 158 26 M 175 20 L 172 35"
              stroke="url(#yellowFill)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Bright tip - subtle glow */}
            <circle cx="175" cy="20" r="1.5" fill="#FF3333" opacity="0.7" />
            <circle cx="175" cy="20" r="0.8" fill="#FFD700" opacity="0.6" />
          </svg>

          <h1 className="font-display font-extrabold text-[clamp(24px,6vw,40px)] leading-[1.12] tracking-tight max-w-[16ch] relative">
            {t("home_title_1")} <span className="text-gold">{t("home_title_2")}</span>
          </h1>
          <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch] relative">{t("home_hero_sub")}</p>

          {/* Journey options - icons now thinner (strokeWidth 1.2) */}
          <div className="mt-6 flex flex-col gap-2.5">
            {order.map((key) => (
              <Link
                key={key}
                href={`/${key}`}
                className="card flex items-center gap-3.5 px-4 py-3.5 md:py-4 group hover:border-orange-500/60 transition-colors"
              >
                <span className="text-orange-500 shrink-0">{rowIcons[key]}</span>
                <span className="font-display font-bold text-[15.5px] md:text-[17px] flex-1">{t(labelKey[key])}</span>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" className="shrink-0 group-hover:translate-x-1 transition-transform">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Buttons - horizontal row, slightly reduced padding */}
          <div className="mt-5 flex flex-row gap-2 md:gap-3 flex-wrap">
            {/* First button - Orange background, white text */}
            <Link
              href="/prendre-rendez-vous"
              className="inline-flex items-center justify-center px-5 py-3 md:px-8 md:py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors text-xs md:text-base whitespace-nowrap"
            >
              {t("Book Appointment") || "Prendre rendez-vous"}
            </Link>
            
            {/* Second button - Dark blue background (matching card), orange text and border */}
            <Link
              href="/etre-rappele"
              className="inline-flex items-center justify-center px-5 py-3 md:px-8 md:py-4 bg-[#0B1A33] hover:bg-[#132A4F] text-orange-400 border border-orange-500/60 font-semibold rounded-lg transition-colors text-xs md:text-base whitespace-nowrap"
            >
              {t("Get Called Back") || "Être rappelé"}
            </Link>
          </div>
        </div>

        {/* Team Card */}
        <Link
          href="/notre-equipe"
          className="card mt-4 p-4 md:p-5 flex items-start gap-4 group hover:border-orange-500/40 transition-colors relative"
        >
          <div className="w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-full shrink-0 overflow-hidden relative">
            <Image
              src="/images/team-circle.webp"
              alt=""
              fill
              sizes="76px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 pb-6 md:pb-7">
            <h3 className="font-display font-bold text-[15px] md:text-[16.5px]">{t("home_who_title")}</h3>
            <p className="text-ink-soft text-[12.5px] md:text-[13.5px] mt-0.5">{t("home_who_body")}</p>
          </div>
          {/* Discover link positioned at bottom right with space above */}
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 text-orange-500 text-[11px] md:text-[12px] font-semibold group-hover:gap-2.5 transition-all">
            {t("home_who_discover")}
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </Link>
      </div>
    </section>
  );
}