# MarchesDirect - Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS frontend for the public procurement
opportunities platform. Design system: black + light gold, working dark/light toggle,
mobile-first (J360-inspired simplicity), FR/EN language toggle.

## Update log (this pass)

- Added a working mobile navigation menu (hamburger) to the header - the nav links were
  previously only reachable on desktop, which didn't match the J360-style mobile-first goal.
- Added a French/English language toggle (`lib/i18n.tsx`) covering all interface chrome:
  navigation, buttons, page titles/subtitles, form labels, status badges, table headers,
  wizard steps, chatbot, admin panel, pricing plans, etc. Listing/tender source data
  (titles, buyer names, trade names as scraped from BOAMP/PLACE/JOUE) stays in French in
  both modes, since that reflects the real official source documents - only the interface
  itself is translated. Language preference is stored in `localStorage`, same pattern as
  the theme toggle.
- Filled in the four footer links that pointed to `#` (`/mentions-legales`,
  `/confidentialite`, `/cgu`, `/contact`) with placeholder bilingual pages so there are no
  dead links, ready to be replaced with real legal copy before launch.
- Bumped `next` from 14.2.5 to 14.2.35 to pick up published security patches.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## What's included (frontend only, mock data - no backend wired up)

- `/` - Homepage with the 3-way entry point (Tenders / Public procurement / Subcontracting)
- `/appels-doffres`, `/marches-publics`, `/sous-traitance` - listing pages per journey
- `/[journey]/[id]` - listing detail page (AI summary + documents shell)
- `/repondre/[id]` - tender-response wizard: DCE analysis, admin docs, technical memo,
  pricing schedule (BPU), final assembly checklist (section 6 of the spec, the main
  differentiator)
- `/mes-reponses` - bid tracking (to prepare / in progress / submitted / awarded / lost)
- `/dashboard` - tabbed dashboard shell with profile-completion nudge
- `/connexion`, `/inscription` - auth pages
- `/profil-entreprise` - reusable company document vault shell (section 6.2)
- `/tarifs` - subscription plans (Stripe-style, section 9)
- `/opportunites/[trade]/[city]` - SEO landing page pattern, one route generates every
  trade x city combination (section 10, France Marches-style structure)
- `/blog`, `/blog/[slug]` - CMS/editorial shell (section 11)
- `/admin` - admin panel shell: source connector health, per-brand analytics, backup status
  (section 11)
- Site-wide AI chatbot widget (bottom-right, every page) - answers only from what it's
  given and says so when information is missing, per section 5's no-hallucination rule

## Design tokens

All colors live as CSS variables in `app/globals.css`, switched via `data-theme="dark|light"`
on `<html>`. Fonts: Libre Franklin (display), Inter (body), IBM Plex Mono (data/labels -
CPV codes, deadlines, statuses) - loaded via `next/font/google`, self-hosted at build time.

## Not included yet (backend-dependent, out of frontend scope)

- Real data connectors, authentication, Stripe billing, CRM integration
- Actual AI classification/matching/document-generation logic - the UI shells above are
  ready to be wired to real endpoints
- Second brand's actual theme/copy (the architecture supports it: duplicate the CSS
  variable block in `globals.css` and the copy in `lib/data.ts`/pages under a brand config)
- Electronic invoicing - explicitly non-critical for MVP per the spec

## Next suggested steps

1. Wire listing/detail pages to a real API once milestones 2-3 (data connectors) land
2. Connect the response wizard's AI steps to a real DCE-analysis endpoint
3. Second brand config (milestone 10) - extract brand name/colors/copy into a config file
