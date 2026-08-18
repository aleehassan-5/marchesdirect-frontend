"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation, useLanguage } from "@/lib/i18n";

const sources = [
  { name: "BOAMP", ok: true, lastRunMin: 34, nextRunMin: 86 },
  { name: "PLACE", ok: true, lastRunMin: 62, nextRunMin: 58 },
  { name: "TED / JOUE", ok: true, lastRunMin: 131, nextRunMin: 229 },
  { name: "Buyer profiles regionaux", ok: false, lastRunMin: 580, nextRunMin: null },
];

const brandsByLang = {
  fr: [
    { name: "MarchesDirect", visitors: "8 240 / mois", subs: 142 },
    { name: "Deuxieme marque (a configurer)", visitors: "-", subs: 0 },
  ],
  en: [
    { name: "MarchesDirect", visitors: "8,240 / mo", subs: 142 },
    { name: "Second brand (to configure)", visitors: "-", subs: 0 },
  ],
};

export default function AdminPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const brands = brandsByLang[lang];
  const isEn = lang === "en";

  const fmtAgo = (min: number) => (isEn ? `${Math.floor(min / 60) ? Math.floor(min / 60) + "h " : ""}${min % 60}min ago` : `il y a ${Math.floor(min / 60) ? Math.floor(min / 60) + "h" : ""}${min % 60}min`);
  const fmtIn = (min: number | null) => (min === null ? (isEn ? "check required" : "verification requise") : isEn ? `in ${Math.floor(min / 60) ? Math.floor(min / 60) + "h " : ""}${min % 60}min` : `dans ${Math.floor(min / 60) ? Math.floor(min / 60) + "h" : ""}${min % 60}min`);

  return (
    <>
      <Header />
      <div className="max-w-[1100px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("admin_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">{t("admin_title")}</h1>

        <div className="mt-8 card p-5">
          <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_sources_title")}</h3>
          <div className="flex flex-col gap-2.5">
            {sources.map((s) => (
              <div key={s.name} className="flex items-center justify-between flex-wrap gap-2 border-b border-border-soft pb-2.5">
                <span className="text-[14px] font-medium">{s.name}</span>
                <div className="flex items-center gap-4 text-[12.5px] font-mono text-ink-soft">
                  <span>{t("admin_last_run")} : {fmtAgo(s.lastRunMin)}</span>
                  <span>{t("admin_next_run")} : {fmtIn(s.nextRunMin)}</span>
                  <span className={`font-semibold px-2 py-0.5 rounded-full ${s.ok ? "bg-gold/15 text-gold" : "bg-red-500/15 text-red-400"}`}>
                    {s.ok ? "OK" : isEn ? "Delayed" : "En retard"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_analytics_title")}</h3>
            <div className="flex flex-col gap-3">
              {brands.map((b) => (
                <div key={b.name} className="flex items-center justify-between text-[14px]">
                  <span>{b.name}</span>
                  <span className="font-mono text-ink-soft text-[13px]">{b.visitors} &middot; {b.subs} {t("admin_subs_count")}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_backups_title")}</h3>
            <div className="flex items-center justify-between text-[14px]">
              <span>{t("admin_last_backup")}</span>
              <span className="font-mono text-gold text-[13px]">
                {isEn ? "Restoration OK \u00b7 yesterday 05:00" : "Restauration OK \u00b7 hier 05:00"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 card p-5">
          <h3 className="font-display font-bold text-[15.5px] mb-2">{t("admin_manage_title")}</h3>
          <div className="flex gap-3 flex-wrap mt-2">
            <button className="btn btn-ghost">{t("admin_manage_listings")}</button>
            <button className="btn btn-ghost">{t("admin_manage_accounts")}</button>
            <button className="btn btn-ghost">{t("admin_manage_subs")}</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
