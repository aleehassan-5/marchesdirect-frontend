# MarchesDirect — Frontend

Next.js 14 (App Router) + TypeScript + Tailwind CSS frontend for the public
procurement opportunities platform. Design system: dark green + lime-gold accent
(see [Design tokens](#design-tokens)), working dark/light toggle, mobile-first
(J360-inspired), FR/EN language toggle.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

To hit a real local backend instead of an unreachable one, create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

(See the [`marchesdirect-backend`](https://github.com/aleehassan-5/marchesdirect-backend)
README for how to get that running.) Without it, pages that call the API
(`/[journey]`, `/[journey]/[id]`) will show an explicit error state rather than
silently falling back to fake data — that's intentional, not a bug.

## What's real vs. mock data right now

| Wired to the real backend API (`lib/api.ts` → `/api/...`) | Still on mock data (`lib/data.ts`) |
| --- | --- |
| `/[journey]` — listing pages (search, trade filter) | `/` — homepage journey cards (labels/icons only, not listings) |
| `/[journey]/[slug]` — listing detail | `/dashboard`, `/mes-reponses`, `/repondre/[id]` |
| | `/opportunites/[trade]/[city]` — SEO landing pages |

As the backend milestones (auth, dashboard, tender-response module) land, swap
the mock imports in the pages above for `lib/api.ts` calls the same way the
journey listing pages already do.

## Pages

- `/` — homepage with the 3-way entry point (Tenders / Public procurement / Subcontracting)
- `/appels-doffres`, `/marches-publics`, `/sous-traitance` — listing pages per journey
- `/[journey]/[slug]` — listing detail page (AI summary + documents shell)
- `/repondre/[id]` — tender-response wizard: DCE analysis, admin docs, technical memo,
  pricing schedule (BPU), final assembly checklist (payment terms milestone 9)
- `/mes-reponses` — bid tracking (to prepare / in progress / submitted / awarded / lost)
- `/dashboard` — tabbed dashboard shell with profile-completion nudge
- `/connexion`, `/inscription` — auth pages (UI only, not wired to `authService` yet)
- `/profil-entreprise` — reusable company document vault shell, with expiry badges
- `/tarifs` — subscription plans (Stripe-style, milestone 8)
- `/opportunites/[trade]/[city]` — SEO landing page pattern, one route generates every
  trade × city combination (milestone 11)
- `/blog`, `/blog/[slug]` — CMS/editorial shell
- `/admin` — admin panel shell: source connector health, per-brand analytics, backup status
- Site-wide AI chatbot widget (bottom-right, every page) — UI only; answers are not
  wired to the real `/api/chatbot` endpoint yet

## Design tokens

All colors live as CSS variables in `app/globals.css`, switched via
`data-theme="dark|light"` on `<html>` (see `components/ThemeProvider.tsx`) — this is
a custom attribute-based system, not Tailwind's built-in `dark:` variant, so don't
add `dark:` classes expecting them to work; use the `bg`, `ink`, `gold`, etc. color
tokens from `tailwind.config.ts` instead. Palette is black/dark-green + lime-gold
only, deliberately not the purple/blue "AI product" look — see `.ai-badge` in
`globals.css` for the one AI-specific accent, used consistently everywhere an
AI-generated draft needs a "human review required" flag.

Fonts: Archivo Black (display), Inter (body), IBM Plex Mono (data/labels — CPV
codes, deadlines, statuses) — loaded via `next/font/google` at build time, which
needs network access to `fonts.googleapis.com`; this is normal for `next build`/
`next dev` and works fine on Vercel or any environment with internet access.

## Not included yet (backend-dependent, out of frontend scope)

- Real auth (login/signup pages are UI-only), Stripe billing, CRM integration
- Dashboard, bid tracking, and tender-response wizard still read `lib/data.ts` —
  ready to be pointed at real endpoints once those backend milestones land
- Second brand's actual theme/copy (the architecture supports it: duplicate the
  CSS variable block in `globals.css` and the copy in `lib/data.ts`/pages under a
  brand config)
- Electronic invoicing — explicitly non-critical for MVP per the spec

## Next suggested steps

1. Wire `/dashboard`, `/mes-reponses`, `/repondre/[id]` to real endpoints once the
   corresponding backend milestones (8, 9) are live-tested
2. Wire `/connexion` and `/inscription` to `authService` in the backend
3. Second brand config (milestone 10) — extract brand name/colors/copy into a
   config file
