import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeHeroCard } from "@/components/HomeHeroCard";
import { RegionsBrowser } from "@/components/RegionsBrowser";
import { SectorsGrid } from "@/components/SectorsGrid";
import { NewsSection } from "@/components/NewsSection";
import { CTA } from "@/components/CTA";

// Homepage rebuilt to match the client's full reference mockup exactly (all 5
// mobile screenshots of the scroll, sent as one set): hero card (title, 3
// journey rows, RDV/Etre rappele) + "Qui sommes-nous" card, then the France
// regions/departments/cities browser, the sectors grid, the market-news
// section, and the closing "Besoin d'aide" advisor CTA before the footer.
// The previous StatsStrip and HowItWorks sections did not appear anywhere in
// this reference set, so they've been removed rather than kept alongside it -
// this is meant to be an exact match, not an addition to the old layout.
export default function HomePage() {
  return (
    <>
      <Header />
      <HomeHeroCard />
      <RegionsBrowser />
      <SectorsGrid />
      <NewsSection />
      <div className="max-w-[1180px] mx-auto px-5 py-6 md:py-10">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
