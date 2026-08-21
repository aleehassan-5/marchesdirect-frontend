import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingDetailContent } from "@/components/ListingDetailContent";
import { SousTraitanceDetailContent } from "@/components/SousTraitanceDetailContent";
import { journeys, type JourneyKey } from "@/lib/data";
import { fetchOpportunityById } from "@/lib/api";

export default async function ListingDetailPage({
  params,
}: {
  params: { journey: string; slug: string };
}) {
  const journey = journeys[params.journey as JourneyKey];
  if (!journey) return notFound();

  const listing = await fetchOpportunityById(params.slug).catch(() => null);
  if (!listing || listing.journey !== params.journey) return notFound();

  return (
    <>
      <Header />
      {params.journey === "sous-traitance" ? (
        <SousTraitanceDetailContent listing={listing} />
      ) : (
        <ListingDetailContent listing={listing} journeyKey={params.journey as JourneyKey} />
      )}
      <Footer />
    </>
  );
}
