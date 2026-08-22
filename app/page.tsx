import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HomeHeroCard } from "@/components/HomeHeroCard";
import { StatsStrip } from "@/components/StatsStrip";
import { HowItWorks } from "@/components/HowItWorks";
import { CTA } from "@/components/CTA";

// Homepage rebuilt to match the client's latest reference mockup exactly:
// one bordered hero card (title, 3 stacked journey rows with arrows, RDV/
// Etre rappele buttons) followed by a separate "Qui sommes-nous" card - this
// replaced the previous grid-of-3-cards + separate search bar + duplicated
// advisor-CTA layout entirely, not just visually tweaked it.
//
// Not yet built (separate, larger pieces of the same reference set, tracked
// as follow-up): the "Des opportunites partout en France" region/department/
// city map browser, the "Des opportunites pour tous les metiers" sector grid,
// and the "L'actualite des marches" news section that sit between this hero
// and the final CTA in the client's full reference.
export default function HomePage() {
  return (
    <>
      <Header />
      <HomeHeroCard />
      <StatsStrip />
      <HowItWorks />
      <div className="max-w-[1180px] mx-auto px-5">
        <CTA />
      </div>
      <Footer />
    </>
  );
}
