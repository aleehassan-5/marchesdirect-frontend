"use client";

import Link from "next/link";
import { X, FileStack, Landmark, Network, LogIn } from "lucide-react";
import { useToast } from "@/components/Toast";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { showToast } = useToast();

  if (!open) return null;

  const links = [
    { label: "Marchés publics", href: "/marches-publics", icon: Landmark },
    { label: "Sous-traitance", href: "/sous-traitance", icon: Network },
    { label: "Appels d'offres privés", href: "", icon: FileStack },
  ];

  return (
    <div className="absolute inset-0 z-50">
      <button
        aria-label="Fermer le menu"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50"
      />
      <div className="absolute inset-x-0 top-0 border-b border-border bg-canvas p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="font-display text-[18px] font-600 uppercase tracking-tight text-ink">
            Menu
          </span>
          <button
            type="button"
            aria-label="Fermer"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-transform active:scale-95"
          >
            <X size={18} />
          </button>
        </div>
        <nav className="mt-5 flex flex-col divide-y divide-border border border-border bg-card">
          {links.map((link) => {
            const Icon = link.icon;
            if (!link.href) {
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => {
                    onClose();
                    showToast(`${link.label} — bientôt disponible`);
                  }}
                  className="flex items-center gap-3 px-4 py-4 text-left text-[15px] font-medium text-ink transition-colors active:bg-ink/5"
                >
                  <Icon size={18} className="text-brand" />
                  {link.label}
                </button>
              );
            }
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-4 text-[15px] font-medium text-ink transition-colors active:bg-ink/5"
              >
                <Icon size={18} className="text-brand" />
                {link.label}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              onClose();
              showToast("Connexion — bientôt disponible");
            }}
            className="flex items-center gap-3 px-4 py-4 text-left text-[15px] font-medium text-ink transition-colors active:bg-ink/5"
          >
            <LogIn size={18} className="text-brand" />
            Connexion
          </button>
        </nav>
      </div>
    </div>
  );
}
