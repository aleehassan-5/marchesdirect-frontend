"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FaqItem } from "@/components/FaqItem";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { useTranslation, useLanguage, teamMembers, faqItems } from "@/lib/i18n";

export default function AboutPage() {
  const t = useTranslation();
  const { lang } = useLanguage();

  return (
    <>
      <Header />

      <div className="max-w-[900px] mx-auto px-5 py-10 md:py-14">
        <div className="text-center mb-10">
          <span className="eyebrow inline-block mb-3">{t("about_eyebrow")}</span>
          <h1 className="font-display font-extrabold text-[clamp(24px,4vw,36px)] tracking-tight">
            {t("about_title")}
          </h1>
        </div>

        <div className="card p-6 md:p-8 mb-12">
          <h2 className="font-display font-bold text-[19px] mb-3">{t("about_who_title")}</h2>
          <p className="text-[14.5px] leading-relaxed text-ink-soft">{t("about_who_body")}</p>
        </div>

        {/* Team - clicking a photo opens the AI intro video inline (no navigation), per
            client's requirement. photo/videoUrl are empty placeholders until the client
            supplies real headshots and generated videos for each member. */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 mb-14">
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

        <h2 className="font-display font-bold text-[20px] mb-5 text-center">{t("about_faq_title")}</h2>
        <div className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <FaqItem key={item.q.fr} question={item.q[lang]} answer={item.a[lang]} />
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
