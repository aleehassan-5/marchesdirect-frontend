import { redirect } from "next/navigation";

// The wizard now lives across 4 dedicated pages (Opportunite = the listing
// detail page itself, then /analyse, /preparation, /validation). Anyone
// landing on the bare /repondre/[id] URL is sent straight into the flow.
export default function RespondPage({ params }: { params: { id: string } }) {
  redirect(`/repondre/${params.id}/analyse`);
}
