"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

export function CTA() {
  const t = useTranslation();

  return (
    <div className="card p-10 text-center relative overflow-hidden my-10">
      <div
        className="pointer-events-none absolute -top-[40%] -left-[10%] -right-[10%] h-[220px]"
        style={{ background: "radial-gradient(ellipse at center, color-mix(in srgb, var(--gold) 22%, transparent), transparent 70%)" }}
      />
      <h3 className="font-display font-extrabold text-[clamp(20px,3.4vw,28px)] max-w-[24ch] mx-auto mb-3 relative">
        {t("cta_title")}
      </h3>
      <p className="text-ink-soft text-[14.5px] mb-6 relative">{t("cta_sub")}</p>
      <div className="flex gap-2.5 justify-center flex-wrap relative">
        <Link href="/inscription" className="btn btn-gold">{t("cta_try")}</Link>
        <Link href="#" className="btn btn-ghost">{t("cta_callback")}</Link>
      </div>
    </div>
  );
}
