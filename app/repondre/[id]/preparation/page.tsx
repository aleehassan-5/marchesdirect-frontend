"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Listing } from "@/lib/data";
import { fetchOpportunityById } from "@/lib/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WizardStepper } from "@/components/WizardStepper";
import { useTranslation } from "@/lib/i18n";

type TaskState = "done" | "ready" | "progress" | "waiting" | "upcoming";

export default function PreparationPage({ params }: { params: { id: string } }) {
  const t = useTranslation();
  const [listing, setListing] = useState<Listing | null | undefined>(undefined);

  useEffect(() => {
    fetchOpportunityById(params.id).then(setListing).catch(() => setListing(null));
  }, [params.id]);

  if (listing === undefined) {
    return (
      <>
        <Header />
        <div className="max-w-[900px] mx-auto px-5 py-16 text-ink-soft text-[14px]">{t("state_loading")}</div>
        <Footer />
      </>
    );
  }
  if (listing === null) return notFound();

  const isPublic = listing.journey === "marches-publics";
  const progress = 60;

  const tasks: { key: string; state: TaskState }[] = isPublic
    ? [
        { key: "wiz3_task_1_public", state: "done" },
        { key: "wiz3_task_2_public", state: "ready" },
        { key: "wiz3_task_3_public", state: "progress" },
        { key: "wiz3_task_4_public", state: "waiting" },
        { key: "wiz3_task_5_public", state: "upcoming" },
      ]
    : [
        { key: "wiz3_task_1_private", state: "done" },
        { key: "wiz3_task_2_private", state: "ready" },
        { key: "wiz3_task_3_private", state: "progress" },
        { key: "wiz3_task_4_private", state: "waiting" },
        { key: "wiz3_task_5_private", state: "upcoming" },
      ];

  const statusLabel = (state: TaskState) => {
    if (state === "done") return t(isPublic ? "wiz3_status_done_public" : "wiz3_status_done_private");
    if (state === "ready") return t(isPublic ? "wiz3_status_ready_public" : "wiz3_status_ready_private");
    if (state === "progress") return t(isPublic ? "wiz3_status_progress_public" : "wiz3_status_progress_private");
    if (state === "waiting") return t(isPublic ? "wiz3_status_waiting_public" : "wiz3_status_waiting_private");
    return t("wiz3_status_upcoming");
  };

  return (
    <>
      <Header />
      <div className="max-w-[900px] mx-auto px-5 py-8 md:py-10">
        <div className="mb-7 md:mb-9">
          <WizardStepper
            steps={[t("wiz_step_opportunity"), t("wiz_step_analysis"), t("wiz_step_preparation"), t("wiz_step_validation")]}
            current={2}
          />
        </div>

        <div className="eyebrow mb-4">{isPublic ? t("wiz3_eyebrow_public") : t("wiz3_eyebrow_private")}</div>
        <h1 className="font-display font-extrabold text-[clamp(22px,3.6vw,32px)] tracking-tight max-w-[26ch]">
          {isPublic ? t("wiz3_title_public") : t("wiz3_title_private")}
        </h1>
        <p className="text-ink-soft mt-2 max-w-[52ch]">{isPublic ? t("wiz3_sub_public") : t("wiz3_sub_private")}</p>

        <div className="mt-6 card p-6">
          <div className="flex flex-col gap-1">
            {tasks.map((task, i) => (
              <div key={task.key} className="flex items-center gap-3 py-3 border-b border-border-soft last:border-b-0">
                {task.state === "done" || task.state === "ready" ? (
                  <span className="w-6 h-6 rounded-full bg-success/15 text-success flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l5 5L19 7" />
                    </svg>
                  </span>
                ) : task.state === "progress" ? (
                  <span className="w-6 h-6 rounded-full border-2 border-dashed border-gold text-gold flex items-center justify-center shrink-0 animate-spin" style={{ animationDuration: "3s" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                  </span>
                ) : (
                  <span className="w-6 h-6 rounded-full border-2 border-border text-ink-faint flex items-center justify-center shrink-0">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </span>
                )}
                <span className="flex-1 text-[14.5px]">{i + 1}. {t(task.key as any)}</span>
                <span
                  className={`text-[12px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    task.state === "done" || task.state === "ready"
                      ? "badge-success"
                      : task.state === "progress"
                      ? "badge-warning"
                      : "badge-valid"
                  }`}
                >
                  {statusLabel(task.state)}
                </span>
              </div>
            ))}
          </div>

          <div className="h-1.5 rounded-full bg-border-soft overflow-hidden mt-5">
            <div className="h-full bg-gold rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-[13.5px] text-ink-soft mt-2.5">
            {isPublic ? t("wiz3_progress_public") : t("wiz3_progress_private")} <span className="text-gold font-bold">{progress} %</span>
          </p>
        </div>

        <div className="mt-6 rounded-[20px] border-2 border-gold bg-gold/10 p-6">
          <div className="flex items-start gap-3.5">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 8h.01M11 12h1v5h1" />
            </svg>
            <div className="flex-1">
              <h3 className="font-display font-bold text-[15.5px] mb-1">{t("wiz3_action_title")}</h3>
              <p className="text-ink-soft text-[13.5px] leading-relaxed mb-4">
                {isPublic ? t("wiz3_action_body_public") : t("wiz3_action_body_private")}
              </p>
              <Link href={`/contact?ref=${listing.id}`} className="btn btn-gold">
                {isPublic ? t("wiz3_action_cta_public") : t("wiz3_action_cta_private")}
              </Link>
              <p className="text-ink-faint text-[12.5px] mt-3 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
                {t("wiz3_action_time")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 card p-5 flex items-center gap-4">
          <div className="w-[52px] h-[52px] rounded-full bg-bg-elevated-2 shrink-0 overflow-hidden relative flex items-center justify-center text-ink-faint">
            <Image src="/images/team-circle.webp" alt="" fill sizes="52px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[11px] uppercase text-ink-faint font-semibold">
              {isPublic ? t("wiz3_advisor_label_public") : t("wiz3_advisor_label_private")}
            </span>
            <h3 className="font-display font-bold text-[15px]">Sophie Martin</h3>
            <p className="text-ink-soft text-[12.5px]">{isPublic ? t("wiz3_advisor_role_public") : t("wiz3_advisor_role_private")}</p>
          </div>
          <Link href={`/contact?ref=${listing.id}`} className="btn btn-ghost shrink-0">
            {t("wiz3_advisor_cta")}
          </Link>
        </div>

        <p className="text-ink-faint text-[12.5px] mt-5 flex items-center gap-2">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {isPublic ? t("wiz3_footer_public") : t("wiz3_footer_private")}
        </p>
      </div>
      <Footer />
    </>
  );
}
