"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useTranslation } from "@/lib/i18n";
import { getSession, clearSession, type Session } from "@/lib/authClient";

export function Header() {
  const t = useTranslation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // Read the session client-side only (localStorage isn't available during SSR,
  // and reading it on every render would cause a hydration mismatch).
  useEffect(() => {
    setSession(getSession());
  }, []);

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setOpen(false);
    router.push("/");
  };

  const links = [
    { href: "/appels-doffres", label: t("nav_tenders") },
    { href: "/marches-publics", label: t("nav_public") },
    { href: "/sous-traitance", label: t("nav_subcontract") },
    { href: "/tarifs", label: t("nav_pricing") },
    { href: "/comment-ca-marche", label: t("nav_how_it_works") },
  ];

  // On mobile, the primary destinations (home/search/dashboard/profile) live in the
  // bottom navigation, so the header stays minimal: logo, language, theme, menu.
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b border-border-soft bg-bg/90">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-5 h-[56px] md:h-[68px] flex items-center justify-between gap-4 lg:gap-6">
        <Link href="/" className="shrink-0 font-display font-extrabold text-[15.5px] sm:text-[17px] md:text-[19px] tracking-tight flex items-center gap-1">
          Marches<span className="text-gold">Direct</span>
        </Link>

        <nav className="hidden xl:flex gap-6 xl:gap-8 text-[14.5px] font-medium text-ink-soft">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-ink whitespace-nowrap">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-2.5 shrink-0">
          {/* Mobile keeps only the logo and the hamburger menu - language and theme
              controls move inside the menu drawer instead of crowding the header bar. */}
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 md:gap-2.5">
            <LanguageToggle />
            <ThemeToggle />
          </div>
          {session ? (
            <>
              <Link href="/dashboard" className="hidden xl:inline-flex btn btn-ghost">
                {t("nav_dashboard")}
              </Link>
              <button onClick={handleLogout} className="hidden xl:inline-flex btn btn-ghost">
                {t("nav_logout")}
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" className="hidden xl:inline-flex btn btn-ghost">
                {t("nav_login")}
              </Link>
              <Link href="/inscription" className="hidden xl:inline-flex btn btn-gold">
                {t("nav_trial")}
              </Link>
            </>
          )}

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("nav_menu_close") : t("nav_menu_open")}
            className="xl:hidden w-[34px] h-[34px] rounded-lg border border-border bg-bg-elevated flex items-center justify-center text-ink-soft hover:border-gold hover:text-gold transition-colors"
          >
            {open ? (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden border-t border-border-soft bg-bg px-5 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-[15px] font-medium text-ink-soft hover:text-ink border-b border-border-soft last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2.5 mt-4">
            {session ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn btn-ghost flex-1">
                  {t("nav_dashboard")}
                </Link>
                <button onClick={handleLogout} className="btn btn-ghost flex-1">
                  {t("nav_logout")}
                </button>
              </>
            ) : (
              <>
                <Link href="/connexion" onClick={() => setOpen(false)} className="btn btn-ghost flex-1">
                  {t("nav_login")}
                </Link>
                <Link href="/inscription" onClick={() => setOpen(false)} className="btn btn-gold flex-1">
                  {t("nav_trial")}
                </Link>
              </>
            )}
          </div>
          <div className="flex sm:hidden items-center gap-2.5 mt-3">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
