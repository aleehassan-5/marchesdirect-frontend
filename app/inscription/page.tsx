"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useTranslation } from "@/lib/i18n";

const TOTAL_STEPS = 3;

export default function SignupPage() {
  const t = useTranslation();
  const [step, setStep] = useState(0);

  const stepLabels = [t("onboarding_step_company"), t("onboarding_step_location"), t("onboarding_step_account")];

  const next = () => setStep((s) => Math.min(TOTAL_STEPS - 1, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  return (
    <>
      <Header />
      <div className="max-w-[460px] mx-auto px-5 py-10 md:py-16">
        <div className="eyebrow mb-4">{t("signup_eyebrow")}</div>
        <h1 className="font-display font-extrabold text-[26px] md:text-[28px] tracking-tight mb-2">{t("signup_title")}</h1>
        <p className="text-ink-soft text-[14.5px] mb-6">{t("signup_sub")}</p>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-1.5">
          {stepLabels.map((label, i) => (
            <div key={label} className="flex-1 h-1.5 rounded-full overflow-hidden bg-border-soft">
              <div
                className="h-full bg-gold transition-all"
                style={{ width: i <= step ? "100%" : "0%" }}
              />
            </div>
          ))}
        </div>
        <p className="text-ink-faint text-[12px] font-mono mb-6">
          {t("onboarding_step_of", { step: step + 1, total: TOTAL_STEPS })} &middot; {stepLabels[step]}
        </p>

        <form
          className="card p-6 flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (step < TOTAL_STEPS - 1) next();
          }}
        >
          {step === 0 && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_company")}</label>
                <input
                  type="text"
                  required
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_trade")}</label>
                <select className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold">
                  <option>Gros oeuvre</option>
                  <option>Electricite</option>
                  <option>Plomberie / CVC</option>
                  <option>Peinture / Finitions</option>
                </select>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-ink-soft text-[13px] -mt-1 mb-1">{t("onboarding_location_sub")}</p>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("onboarding_location")}</label>
                <input
                  type="text"
                  required
                  placeholder={t("onboarding_location_placeholder")}
                  className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("onboarding_radius")}</label>
                <div className="grid grid-cols-2 gap-2">
                  {(["onboarding_radius_25", "onboarding_radius_50", "onboarding_radius_100", "onboarding_radius_national"] as const).map(
                    (key, i) => (
                      <label
                        key={key}
                        className="flex items-center gap-2 border border-border rounded-[10px] px-3.5 py-2.5 text-[14px] cursor-pointer has-[:checked]:border-gold has-[:checked]:text-gold"
                      >
                        <input type="radio" name="radius" defaultChecked={i === 1} className="accent-[var(--gold)]" />
                        {t(key)}
                      </label>
                    )
                  )}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_email")}</label>
                <input type="email" required className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold">{t("signup_password")}</label>
                <input type="password" required className="bg-transparent border border-border rounded-[10px] px-3.5 py-2.5 text-[14.5px] outline-none focus:border-gold" />
              </div>
            </>
          )}

          <div className="flex gap-2.5 mt-2">
            {step > 0 && (
              <button type="button" onClick={back} className="btn btn-ghost flex-1">
                {t("onboarding_back")}
              </button>
            )}
            <button type="submit" className="btn btn-gold flex-1">
              {step < TOTAL_STEPS - 1 ? t("onboarding_continue") : t("signup_submit")}
            </button>
          </div>
        </form>

        <p className="text-[13.5px] text-ink-soft mt-5 text-center">
          {t("signup_have_account")} <Link href="/connexion" className="text-gold font-semibold">{t("nav_login")}</Link>
        </p>
      </div>
      <Footer />
    </>
  );
}
