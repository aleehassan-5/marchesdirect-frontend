"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n";

export function MobileBottomNav() {
  const t = useTranslation();
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: t("bottomnav_home"),
      match: (p: string) => p === "/",
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11l9-7 9 7M5 10v10h5v-6h4v6h5V10" />
        </svg>
      ),
    },
    {
      href: "/marches-publics",
      label: t("bottomnav_search"),
      match: (p: string) => p.includes("marches-publics") || p.includes("appels-doffres") || p.includes("sous-traitance"),
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      ),
    },
    {
      href: "/dashboard",
      label: t("bottomnav_dashboard"),
      match: (p: string) => p === "/dashboard" || p === "/mes-reponses",
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        </svg>
      ),
    },
    {
      href: "/profil-entreprise",
      label: t("bottomnav_profile"),
      match: (p: string) => p === "/profil-entreprise" || p === "/connexion",
      icon: (
        <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c1.6-3.6 5-5.5 8-5.5s6.4 1.9 8 5.5" />
        </svg>
      ),
    },
  ];

  return (
    <nav
      className="md:hidden fixed bottom-0 inset-x-0 z-50 border-t border-border-soft bg-bg/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
      aria-label="Mobile navigation"
    >
      <div className="grid grid-cols-4">
        {items.map((item) => {
          const active = item.match(pathname ?? "");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 py-2.5 text-[10.5px] font-semibold ${
                active ? "text-gold" : "text-ink-faint"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
