"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";
import { getSession, getAlerts, markAlertRead, markAllAlertsRead, type Alert } from "@/lib/authClient";

export default function AlertsPage() {
  const t = useTranslation();
  const router = useRouter();
  const [alerts, setAlerts] = useState<Alert[] | null>(null);

  useEffect(() => {
    if (!getSession()) {
      router.replace("/connexion");
      return;
    }
    getAlerts()
      .then(setAlerts)
      .catch(() => router.replace("/connexion"));
  }, [router]);

  const handleMarkRead = async (id: string) => {
    setAlerts((prev) => prev?.map((a) => (a.id === id ? { ...a, is_read: true } : a)) ?? prev);
    try {
      await markAlertRead(id);
    } catch {
      // Non-critical - the alert will just show as unread again on next load.
    }
  };

  const handleMarkAllRead = async () => {
    setAlerts((prev) => prev?.map((a) => ({ ...a, is_read: true })) ?? prev);
    try {
      await markAllAlertsRead();
    } catch {
      // Non-critical.
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-[720px] mx-auto px-5 py-10">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-2">
          <div>
            <h1 className="font-display font-extrabold text-[clamp(22px,4vw,30px)] tracking-tight">
              {t("alerts_title")}
            </h1>
            <p className="text-ink-soft text-[14px] mt-1.5">{t("alerts_sub")}</p>
          </div>
          {alerts && alerts.some((a) => !a.is_read) && (
            <button onClick={handleMarkAllRead} className="btn btn-ghost">
              {t("alerts_mark_all_read")}
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          {alerts === null ? (
            <p className="text-ink-soft text-[14px]">{t("state_loading")}</p>
          ) : alerts.length === 0 ? (
            <p className="text-ink-soft text-[14px] card p-6 text-center">{t("alerts_empty")}</p>
          ) : (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className={`card p-4 flex items-start justify-between gap-3 ${!alert.is_read ? "border-gold/40" : ""}`}
              >
                <div className="flex items-start gap-3">
                  {!alert.is_read && <span className="w-2 h-2 rounded-full bg-gold mt-1.5 shrink-0" aria-hidden />}
                  <div>
                    <p className="font-semibold text-[14px]">{alert.title}</p>
                    <p className="text-ink-soft text-[13px] mt-0.5">{alert.message}</p>
                    <p className="text-ink-faint text-[11.5px] font-mono mt-1">
                      {new Date(alert.created_at).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  </div>
                </div>
                {!alert.is_read && (
                  <button
                    onClick={() => handleMarkRead(alert.id)}
                    className="text-[12.5px] font-semibold text-gold shrink-0 hover:underline underline-offset-4"
                  >
                    {t("alerts_mark_read")}
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
