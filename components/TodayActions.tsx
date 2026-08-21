"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

type Action = {
  key: string;
  labelKey: "today_deadline_soon" | "today_profile_incomplete" | "today_draft_ready" | "today_docs_expiring";
  actionKey: "today_deadline_action" | "today_profile_action" | "today_draft_action" | "today_docs_action";
  vars?: Record<string, string | number>;
  href: string;
  priority: "high" | "medium";
};

/**
 * Small rule-based "what do I need to do today" list. This is computed from
 * real values passed in by the caller - no more hardcoded demo numbers here.
 * Until a backend endpoint exists for deadlines/profile%/drafts/doc-expiry,
 * callers should pass 0 (shows the honest "all done" state) rather than a
 * made-up number.
 */
export function TodayActions({
  deadlinesSoon = 0,
  profilePct = 0,
  draftsReady = 0,
  docsExpiring = 0,
}: {
  deadlinesSoon?: number;
  profilePct?: number;
  draftsReady?: number;
  docsExpiring?: number;
}) {
  const t = useTranslation();

  const actions: Action[] = [];
  if (deadlinesSoon > 0) {
    actions.push({
      key: "deadline",
      labelKey: "today_deadline_soon",
      actionKey: "today_deadline_action",
      vars: { count: deadlinesSoon },
      href: "/mes-reponses",
      priority: "high",
    });
  }
  if (docsExpiring > 0) {
    actions.push({
      key: "docs",
      labelKey: "today_docs_expiring",
      actionKey: "today_docs_action",
      vars: { count: docsExpiring },
      href: "/profil-entreprise",
      priority: "high",
    });
  }
  if (draftsReady > 0) {
    actions.push({
      key: "drafts",
      labelKey: "today_draft_ready",
      actionKey: "today_draft_action",
      vars: { count: draftsReady },
      href: "/mes-reponses",
      priority: "medium",
    });
  }
  if (profilePct > 0 && profilePct < 100) {
    actions.push({
      key: "profile",
      labelKey: "today_profile_incomplete",
      actionKey: "today_profile_action",
      vars: { pct: profilePct },
      href: "/profil-entreprise",
      priority: "medium",
    });
  }

  return (
    <div className="panel-dark p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-display font-bold text-[16px]">{t("today_title")}</h2>
      </div>
      <p className="text-[13px] mb-4 opacity-75">{t("today_sub")}</p>

      {actions.length === 0 ? (
        <p className="text-[13.5px] opacity-75">{t("today_all_done")}</p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {actions.map((a) => (
            <Link
              key={a.key}
              href={a.href}
              className="flex items-center justify-between gap-3 border border-brand-dark-ink/20 rounded-[10px] px-4 py-3 hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`shrink-0 w-2 h-2 rounded-full ${a.priority === "high" ? "bg-gold" : "bg-brand-dark-ink/40"}`}
                  aria-hidden
                />
                <span className="text-[13.5px] truncate">{t(a.labelKey, a.vars)}</span>
              </div>
              <span className="shrink-0 text-[12.5px] font-semibold text-gold whitespace-nowrap">
                {t(a.actionKey)} &rarr;
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
