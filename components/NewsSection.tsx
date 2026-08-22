"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

const items = [
  {
    catKey: "home_news_cat_reg",
    titleKey: "home_news_title_reg",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 3v14a2 2 0 0 0 2 2h8" />
        <path d="M6 3h8l3 3v11" />
        <path d="M9 8h5M9 11h5" />
        <path d="M4 17l2-4 2 4M2 17h4" />
      </svg>
    ),
  },
  {
    catKey: "home_news_cat_trend",
    titleKey: "home_news_title_trend",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 20V10M10 20V6M16 20v-8" />
        <path d="M4 12l6-5 6 4 6-8" />
        <path d="M18 5h4v4" />
      </svg>
    ),
  },
  {
    catKey: "home_news_cat_opp",
    titleKey: "home_news_title_opp",
    icon: (
      <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" />
        <circle cx="12" cy="9" r="2.4" />
      </svg>
    ),
  },
];

export function NewsSection() {
  const t = useTranslation();

  return (
    <section className="pt-10 pb-6 md:pt-14">
      <div className="max-w-[1180px] mx-auto px-5">
        <div className="eyebrow mb-3">{t("home_news_eyebrow")}</div>
        <h2 className="font-display font-extrabold text-[clamp(22px,4.4vw,32px)] tracking-tight max-w-[16ch]">
          {t("home_news_title")}
        </h2>
        <p className="text-ink-soft text-[13.5px] md:text-[15px] mt-3 max-w-[42ch]">{t("home_news_sub")}</p>

        <div className="flex flex-col gap-4 mt-6">
          {items.map((item) => (
            <Link key={item.titleKey} href="/blog" className="card p-5 flex items-center gap-5 hover:border-gold/50 transition-colors group">
              <span className="shrink-0 w-[70px] h-[70px] rounded-full border-2 border-gold text-gold flex items-center justify-center">
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="eyebrow mb-1.5">{t(item.catKey)}</div>
                <h3 className="font-display font-bold text-[17px] md:text-[18px] leading-snug">{t(item.titleKey)}</h3>
                <span className="inline-flex items-center gap-1.5 text-ink-faint text-[13px] font-semibold mt-2 group-hover:text-gold transition-colors">
                  {t("home_news_read")}
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/blog" className="btn btn-ghost w-full justify-center mt-5 gap-2">
          {t("home_news_see_all")}
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
