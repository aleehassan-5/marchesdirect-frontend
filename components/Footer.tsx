"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const t = useTranslation();

  return (
    <footer className="border-t border-border-soft py-9 mt-10">
      <div className="max-w-[1180px] mx-auto px-5 flex flex-col md:flex-row gap-4 md:items-center md:justify-between text-[13px] text-ink-faint">
        <div className="font-display font-extrabold text-[16px] text-ink">
          Marches<span className="text-gold">Direct</span>
        </div>
        <div className="flex gap-5 flex-wrap">
          <Link href="/mentions-legales" className="hover:text-ink">{t("footer_legal")}</Link>
          <Link href="/confidentialite" className="hover:text-ink">{t("footer_privacy")}</Link>
          <Link href="/cgu" className="hover:text-ink">{t("footer_terms")}</Link>
          <Link href="/contact" className="hover:text-ink">{t("footer_contact")}</Link>
        </div>
        <div>&copy; 2026 MarchesDirect</div>
      </div>
    </footer>
  );
}
