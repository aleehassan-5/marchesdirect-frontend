"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EmptyState, ErrorState } from "@/components/States";
import { useTranslation, useLanguage } from "@/lib/i18n";
import { getSession, authFetch } from "@/lib/authClient";

type DataSource = {
  code: string;
  name: string;
  active: boolean;
  last_run: string | null;
  next_run: string | null;
};

export default function AdminPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const router = useRouter();
  const isEn = lang === "en";

  const [sources, setSources] = useState<DataSource[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
      return;
    }
    authFetch<{ sources: DataSource[] }>("/api/admin/data-sources")
      .then((res) => setSources(res.sources))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [router]);

  const fmtDate = (iso: string | null) => {
    if (!iso) return isEn ? "never run" : "jamais lance";
    return new Date(iso).toLocaleString(isEn ? "en-GB" : "fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <Header />
      <div className="max-w-[1100px] mx-auto px-5 py-10">
        <div className="eyebrow mb-4">{t("admin_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[clamp(24px,4vw,34px)] tracking-tight">{t("admin_title")}</h1>

        <div className="mt-8 card p-5">
          <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_sources_title")}</h3>

          {loading && <p className="text-ink-soft text-[14px]">{t("state_loading")}</p>}
          {!loading && error && <ErrorState />}
          {!loading && !error && sources && sources.length === 0 && <EmptyState />}
          {!loading && !error && sources && sources.length > 0 && (
            <div className="flex flex-col gap-2.5">
              {sources.map((s) => (
                <div key={s.code} className="flex items-center justify-between flex-wrap gap-2 border-b border-border-soft pb-2.5 last:border-b-0">
                  <span className="text-[14px] font-medium">{s.name}</span>
                  <div className="flex items-center gap-4 text-[12.5px] font-mono text-ink-soft">
                    <span>{t("admin_last_run")} : {fmtDate(s.last_run)}</span>
                    <span>{t("admin_next_run")} : {fmtDate(s.next_run)}</span>
                    <span
                      className="font-semibold px-2 py-0.5 rounded-full"
                      style={
                        s.active
                          ? { background: "color-mix(in srgb, var(--gold) 15%, transparent)", color: "var(--gold)" }
                          : { background: "color-mix(in srgb, var(--danger) 15%, transparent)", color: "var(--danger)" }
                      }
                    >
                      {s.active ? "OK" : isEn ? "Inactive" : "Inactif"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand visitor/subscriber analytics and backup-status widgets need a real
            analytics + backup-monitoring integration - not wired yet, so this shows
            an honest "not available" state rather than made-up numbers. */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_analytics_title")}</h3>
            <p className="text-ink-faint text-[13.5px]">{t("admin_not_available")}</p>
          </div>

          <div className="card p-5">
            <h3 className="font-display font-bold text-[15.5px] mb-4">{t("admin_backups_title")}</h3>
            <p className="text-ink-faint text-[13.5px]">{t("admin_not_available")}</p>
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
