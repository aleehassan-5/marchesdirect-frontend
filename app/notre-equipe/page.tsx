"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { AdvisorButtons } from "@/components/AdvisorButtons";
import { useTranslation, useLanguage, teamMembers } from "@/lib/i18n";

export default function NotreEquipePage() {
  const t = useTranslation();
  const { lang } = useLanguage();

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-10 md:py-14">
        <div className="mb-10">
          <span className="eyebrow inline-block mb-3">{t("team_eyebrow")}</span>
          <h1 className="font-display font-extrabold text-[clamp(24px,4vw,36px)] tracking-tight">
            {t("team_page_title")}
          </h1>
          <p className="text-ink-soft mt-3 max-w-[56ch]">{t("team_page_sub")}</p>
        </div>

        {/* Clicking a photo opens the AI intro video inline (no navigation). photo/videoUrl
            are empty placeholders until the client supplies real headshots and videos. */}
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

        <div className="flex gap-4 justify-center mt-6 text-[13px] font-semibold flex-wrap">
          <a href="/a-propos" className="text-gold hover:underline underline-offset-4">{t("nav_about")} &rarr;</a>
          <a href="/comment-ca-marche" className="text-gold hover:underline underline-offset-4">{t("nav_how_it_works")} &rarr;</a>
          <a href="/faq" className="text-gold hover:underline underline-offset-4">{t("faq_page_title")} &rarr;</a>
        </div>
      </div>

      <Footer />
    </>
  );
}
