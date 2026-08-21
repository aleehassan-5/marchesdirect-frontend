"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { useTranslation } from "@/lib/i18n";

const shieldIcon = (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 3v6c0 5-3.4 8.4-8 11-4.6-2.6-8-6-8-11V5l8-3z" />
  </svg>
);

const checkIcon = (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="var(--gold-ink)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l5 5L19 7" />
  </svg>
);

const sourcesIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" />
    <path d="M12 8v4M12 12l-4 4M12 12l4 4" />
  </svg>
);

const clockIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" />
  </svg>
);

const targetIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M12 2v3M22 12h-3" />
  </svg>
);

const dbIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" />
  </svg>
);

export default function AProposPage() {
  const t = useTranslation();

  const bullets = [
    ["intro_bullet_1_bold", "intro_bullet_1_rest"],
    ["intro_bullet_2_bold", "intro_bullet_2_rest"],
    ["intro_bullet_3_bold", "intro_bullet_3_rest"],
    ["intro_bullet_4_bold", "intro_bullet_4_rest"],
  ] as const;

  const stats = [
    { icon: sourcesIcon, val: "intro_stat_sources_val", label: "intro_stat_sources_label" },
    { icon: clockIcon, val: "intro_stat_freq_val", label: "intro_stat_freq_label" },
    { icon: targetIcon, val: "intro_stat_accuracy_val", label: "intro_stat_accuracy_label" },
    { icon: dbIcon, val: "intro_stat_invented_val", label: "intro_stat_invented_label" },
  ] as const;

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="card p-5 flex items-start gap-3 mb-8">
          <span className="w-8 h-8 rounded-md border border-gold text-gold flex items-center justify-center shrink-0">{shieldIcon}</span>
          <div>
            <p className="font-display font-bold text-[14.5px] mb-2">{t("intro_eligibility_title")}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[t("intro_eligibility_1"), t("intro_eligibility_2")].map((label) => (
                <span key={label} className="flex items-center gap-2 text-[13.5px]">
                  <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shrink-0">{checkIcon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="eyebrow mb-3">{t("intro_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(26px,4.4vw,42px)] leading-[1.12] tracking-tight max-w-[20ch]">
          {t("intro_title_1")}
          <br />
          <span className="text-gold">{t("intro_title_2")}</span>
        </h1>
        <p className="text-ink-soft mt-4 max-w-[58ch]">{t("intro_sub")}</p>

        <div className="mt-6 flex flex-col gap-2.5">
          {bullets.map(([bold, rest]) => (
            <span key={bold} className="flex items-center gap-2.5 text-[14.5px]">
              <span className="w-5 h-5 rounded-full bg-gold flex items-center justify-center shrink-0">{checkIcon}</span>
              <span><strong className="font-bold">{t(bold)}</strong> {t(rest)}</span>
            </span>
          ))}
        </div>

        <div className="mt-6">
          <AdvisorButtons />
        </div>

        {/* Real team group photo pending client's asset - honest placeholder rather than
            a broken/fake image. */}
        <div className="mt-8 rounded-xl border border-border-soft bg-bg-elevated aspect-[16/9] flex items-center justify-center">
          <span className="text-ink-faint text-[13px]">{t("intro_team_photo_note")}</span>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="card p-4 text-center">
              <span className="text-gold inline-flex mb-2">{s.icon}</span>
              <div className="font-display font-extrabold text-[22px] text-gold">{t(s.val)}</div>
              <p className="text-[11.5px] text-ink-soft mt-1 leading-snug">{t(s.label)}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-4 justify-center mt-8 text-[13px] font-semibold flex-wrap">
          <a href="/comment-ca-marche" className="text-gold hover:underline underline-offset-4">{t("nav_how_it_works")} &rarr;</a>
          <a href="/notre-equipe" className="text-gold hover:underline underline-offset-4">{t("nav_team")} &rarr;</a>
          <a href="/faq" className="text-gold hover:underline underline-offset-4">{t("faq_page_title")} &rarr;</a>
        </div>
      </div>

      <Footer />
    </>
  );
}
