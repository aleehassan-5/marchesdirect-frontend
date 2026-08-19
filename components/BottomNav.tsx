"use client";

import Link from "next/link";
import { Home, Search, Bell, MessageSquare, User, LucideIcon } from "lucide-react";
import { useToast } from "@/components/Toast";

type Item = {
  key: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

const iconMap: Record<string, LucideIcon> = {
  home: Home,
  search: Search,
  bell: Bell,
  message: MessageSquare,
  user: User,
};

export default function BottomNav({
  active,
  variant = "alerts",
}: {
  active: "home" | "search" | "third" | "profile";
  variant?: "alerts" | "messages";
}) {
  const { showToast } = useToast();

  const items: Item[] = [
    { key: "home", label: "Accueil", href: "/", icon: iconMap.home },
    { key: "search", label: "Recherche", href: "/marches-publics", icon: iconMap.search },
    variant === "alerts"
      ? { key: "third", label: "Alertes", href: "", icon: iconMap.bell }
      : { key: "third", label: "Messages", href: "", icon: iconMap.message },
    { key: "profile", label: "Profil", href: "", icon: iconMap.user },
  ];

  return (
    <nav className="sticky bottom-0 z-30 flex border-t border-border bg-canvas">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        const classes = [
          "flex flex-1 flex-col items-center gap-1 py-3 text-[11px] tracking-label transition-transform active:scale-95",
          isActive ? "text-brand" : "text-muted",
        ].join(" ");

        const content = (
          <>
            <Icon
              size={22}
              strokeWidth={isActive ? 2.25 : 1.75}
              className={isActive ? "text-lime-dark" : ""}
              fill="none"
            />
            {item.label.toUpperCase()}
          </>
        );

        if (!item.href) {
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => showToast(`${item.label} — bientôt disponible`)}
              className={classes}
            >
              {content}
            </button>
          );
        }

        return (
          <Link key={item.key} href={item.href} className={classes}>
            {content}
          </Link>
        );
      })}
    </nav>
  );
}
