import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JourneyPageContent } from "@/components/JourneyPageContent";
import { journeys, listingsFor, type JourneyKey } from "@/lib/data";

export function generateStaticParams() {
  return Object.keys(journeys).map((journey) => ({ journey }));
}

export default function JourneyPage({ params }: { params: { journey: string } }) {
  const key = params.journey as JourneyKey;
  const journey = journeys[key];
  if (!journey) return notFound();

  const results = listingsFor(key);

  return (
    <>
      <Header />
      <JourneyPageContent journeyKey={key} results={results} />
      <Footer />
    </>
  );
}
