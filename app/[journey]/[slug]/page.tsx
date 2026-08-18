import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ListingDetailContent } from "@/components/ListingDetailContent";
import { listingById, journeys, type JourneyKey } from "@/lib/data";

export default function ListingDetailPage({
  params,
}: {
  params: { journey: string; slug: string };
}) {
  const listing = listingById(params.slug);
  const journey = journeys[params.journey as JourneyKey];
  if (!listing || !journey || listing.journey !== params.journey) return notFound();

  return (
    <>
      <Header />
      <ListingDetailContent listing={listing} journeyKey={params.journey as JourneyKey} />
      <Footer />
    </>
  );
}
