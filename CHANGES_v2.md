# MarchesDirect frontend — round 2 changes

Applied on top of the existing Next.js/Tailwind frontend. Run `npm install` then `npm run dev`.

1. **Mobile simplified (J360-style)** — header shrunk on mobile (56px), nav links moved out of
   the header since the bottom nav now covers them; less vertical padding; bigger tap targets.
2. **Homepage 3 choices more prominent** — `JourneyCard` moved right under the search bar with
   almost no scroll gap; on mobile cards render as a bold horizontal row (icon + title + arrow)
   instead of a dense paragraph-heavy card.
3. **Search bar = main focus** — bigger, gold-accented border, full width, larger tap targets on
   mobile, `SearchBar` now accepts a `compact` prop for reuse elsewhere later.
4. **Listing cards compact** — tighter padding, truncated buyer line, title clamps to 2 lines,
   CPV code hidden on very small screens to cut clutter.
5. **Signup onboarding** — `/inscription` is now a 3-step wizard: (1) company + trade,
   (2) working location + working radius, (3) email + password, with a progress bar.
6. **Browser language detection + saved preference** — `lib/i18n.tsx` now detects
   `navigator.languages` on first visit (fr/en), then remembers the user's choice in
   `localStorage` (`md-lang`) exactly as before; a saved preference always wins over detection.
7. **Dashboard "what do I need to do today"** — new `components/TodayActions.tsx` on
   `/dashboard`: surfaces upcoming deadlines, expiring documents, AI drafts awaiting review, and
   incomplete profile sections, each linking straight to where it's fixed.
8. **Company document expiry alerts** — `/profil-entreprise` now shows a validity date and a
   color-coded badge (up to date / expiring soon / expired) for insurance and certifications,
   plus a summary banner when anything expires within 60 days.
9. **AI draft vs. human review, made explicit** — new `.ai-badge` style (black/gold, not
   purple/blue) used in the response wizard (criteria extraction, technical memo, pricing) and
   on the listing AI summary, each paired with an explicit "human review required" line.
10. **Loading / empty / error states** — new `components/States.tsx`
    (`LoadingState`, `EmptyState`, `ErrorState`); wired into the journey listing page for the
    zero-results case, ready to reuse anywhere data is fetched for real.
11. **Mobile bottom navigation** — new `components/MobileBottomNav.tsx`
    (Home / Search / Dashboard / Profile), fixed at the bottom on mobile only; body gets bottom
    padding so content never sits underneath it; the chatbot bubble was moved up to clear it.
12. **Colors** — confirmed black/gold only (no purple/blue "AI" look); added `--warning` /
    `--danger` accent variables (warm tones consistent with the existing palette) used only for
    expiry badges.
13. No code change — informational reference notes (J360 = mobile UX benchmark, France Marchés =
    SEO structure only, Klekoon = reusable-document logic only, rebuilt simple).

## Not built yet (needs backend / real data — flagged, not faked)
- Real BOAMP/PLACE/JOUE connectors, dedup, AI classification, chatbot answers, Stripe, CRM.
- Real auth, real company-document uploads/expiry dates, real deadline data.
- Everything above is currently backed by the same mock data (`lib/data.ts`) already in the
  project; the UI is ready to swap in live data.
