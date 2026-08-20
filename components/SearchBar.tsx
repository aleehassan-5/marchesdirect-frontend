"use client";

import { useTranslation } from "@/lib/i18n";

export function SearchBar({ compact = false }: { compact?: boolean }) {
  const t = useTranslation();

  return (
    <div
      className={`${
        compact ? "mt-0" : "mt-3 md:mt-9"
      } card shadow-xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-1.5 sm:gap-2 w-full max-w-[700px] border-2 border-gold/25`}
    >
      <div className="flex-1 px-3.5 py-2.5 sm:py-2 flex flex-col gap-0.5 border-b sm:border-b-0 sm:border-r border-border-soft">
        <label className="text-[11px] uppercase tracking-wide text-ink-faint font-semibold">{t("search_trade")}</label>
        <select className="bg-transparent outline-none text-[15px] sm:text-[14.5px] font-medium w-full">
          <option>{t("search_trade_all")}</option>
          <option>Gros oeuvre</option>
          <option>Electricite</option>
          <option>Plomberie / CVC</option>
          <option>Peinture / Finitions</option>
        </select>
      </div>
      <div className="flex-1 px-3.5 py-2.5 sm:py-2 flex flex-col gap-0.5 border-b sm:border-b-0 sm:border-r border-border-soft">
        <label className="text-[11px] uppercase tracking-wide text-ink-faint font-semibold">{t("search_location")}</label>
        <input placeholder={t("search_location_placeholder")} className="bg-transparent outline-none text-[15px] sm:text-[14.5px] font-medium w-full" />
      </div>
      <div className="flex-1 px-3.5 py-2.5 sm:py-2 flex flex-col gap-0.5">
        <label className="text-[11px] uppercase tracking-wide text-ink-faint font-semibold">{t("search_radius")}</label>
        <select className="bg-transparent outline-none text-[15px] sm:text-[14.5px] font-medium w-full">
          <option>50 km</option>
          <option>100 km</option>
          <option>{t("search_radius_national")}</option>
        </select>
      </div>
      <button className="btn btn-gold m-0.5 sm:m-1 px-6 py-3 sm:py-2.5 text-[15px] sm:text-[14px]">{t("search_submit")}</button>
    </div>
  );
}
