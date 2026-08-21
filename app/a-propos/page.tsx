import { redirect } from "next/navigation";

// /a-propos is kept as a redirect to /comment-ca-marche so any existing links
// (internal or already indexed by search engines) don't break, now that the
// client wants this content under the "Comment ca marche" nav tab.
export default function AProposRedirect() {
  redirect("/comment-ca-marche");
}
