import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JourneyPageContent } from "@/components/JourneyPageContent";
import { journeys, type JourneyKey } from "@/lib/data";
import { fetchOpportunities, fetchTrades, ApiError } from "@/lib/api";

export function generateStaticParams() {
  return Object.keys(journeys).map((journey) => ({ journey }));
}

export default async function JourneyPage({
  params,
  searchParams,
}: {
  params: { journey: string };
  searchParams: { trade?: string; q?: string };
}) {
  const key = params.journey as JourneyKey;
  const journey = journeys[key];
  if (!journey) return notFound();

  let results: Awaited<ReturnType<typeof fetchOpportunities>> = [];
  let trades: Awaited<ReturnType<typeof fetchTrades>> = [];
  let apiError: string | null = null;

  try {
    [results, trades] = await Promise.all([
      fetchOpportunities({
        journey: key,
        trade_id: searchParams.trade,
        q: searchParams.q,
        limit: 40,
      }),
      fetchTrades(),
    ]);
  } catch (err) {
    // Backend unreachable/down - show an explicit error state rather than silently
    // falling back to fake data, so a real outage is never hidden from the user.
    apiError = err instanceof ApiError ? err.message : "Erreur de chargement des annonces.";
  }

  return (
    <>
      <Header />
      <JourneyPageContent
        journeyKey={key}
        results={results}
        error={apiError}
        trades={trades}
        activeTradeId={searchParams.trade}
        activeQuery={searchParams.q}
      />
      <Footer />
    </>
  );
}
