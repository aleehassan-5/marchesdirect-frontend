"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { useTranslation, useLanguage, teamMembers } from "@/lib/i18n";

const shieldIcon = (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l8 3v6c0 5-3.4 8.4-8 11-4.6-2.6-8-6-8-11V5l8-3z" />
    <circle cx="12" cy="10" r="2.2" />
    <path d="M8.2 15c.6-1.8 2-2.6 3.8-2.6s3.2.8 3.8 2.6" />
  </svg>
);

export function AboutPageContent() {
  const t = useTranslation();
  const { lang } = useLanguage();

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-10 md:py-14">
        <div className="mb-10">
          <span className="eyebrow inline-block mb-3">{t("about_eyebrow")}</span>
          <h1 className="font-display font-extrabold text-[clamp(24px,4vw,36px)] tracking-tight">
            {t("about_title")}
          </h1>
          <p className="text-ink-soft mt-3 max-w-[56ch]">{t("about_who_sub")}</p>
        </div>

        <div className="card p-6 md:p-7 mb-12 flex items-start gap-4">
          <div className="w-11 h-11 rounded-lg border border-gold text-gold flex items-center justify-center shrink-0">
            {shieldIcon}
          </div>
          <div>
            <h2 className="font-display font-bold text-[17px] mb-2">{t("about_who_title")}</h2>
            <p className="text-[14.5px] leading-relaxed text-ink-soft">{t("about_who_body")}</p>
          </div>
        </div>

        {/* Team - clicking a photo opens the AI intro video inline (no navigation), per
            client's requirement. photo/videoUrl are empty placeholders until the client
            supplies real headshots and generated videos for each member. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10 mb-12">
          {teamMembers.map((member) => (
            <TeamMemberCard
              key={member.name}
              name={member.name}
              role={member.role[lang]}
              photo={member.photo}
              videoUrl={member.videoUrl}
            />
          ))}
        </div>

        <div className="panel-dark p-6 md:p-7">
          <h3 className="font-display font-bold text-[18px] mb-4">{t("about_cta_title")}</h3>
          <AdvisorButtons />
        </div>

        <div className="text-center mt-6">
          <a href="/faq" className="text-[13px] font-semibold text-gold hover:underline underline-offset-4">
            {t("faq_page_title")} &rarr;
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
}
